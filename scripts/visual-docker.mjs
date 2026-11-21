#!/usr/bin/env node
/**
 * The visual test (`npm run test:visual`) on this machine, in the same Linux and Chromium as CI (`.github/workflows/visual.yml`): Playwright's
 * own image at the version in the lockfile, so the pictures are drawn the way CI draws them and a difference shows before a push, not after.
 *
 *   npm run test:visual:docker               compare every story with its reference
 *   npm run test:visual:docker -- --update   make new references from this working tree (commit them with the change)
 *   npm run test:visual:docker -- stories/components/navigation   only the stories under a path
 *
 * The repository is mounted as it is; `node_modules` is the container's own (a volume), since the one on the Mac is built for macOS.
 * Needs Docker (Docker Desktop, or `colima start`). On a Mac behind a network that inspects TLS, the system keychain's certificates
 * are given to npm in the container (`NODE_EXTRA_CA_CERTS`), so it trusts what the Mac trusts. `VISUAL_PLATFORM=linux/arm64` runs natively on Apple silicon, faster but drawn by
 * another CPU than CI's.
 */
import { spawnSync } from "node:child_process"
import { createHash } from "node:crypto"
import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { homedir } from "node:os"
import { join } from "node:path"
import { fileURLToPath } from "node:url"

const root = fileURLToPath(new URL("..", import.meta.url))
const lock = JSON.parse(readFileSync(new URL("../package-lock.json", import.meta.url), "utf8"))
const version = lock.packages["node_modules/playwright"]?.version
if (version === undefined) throw new Error("playwright is not in package-lock.json")

const platform = process.env.VISUAL_PLATFORM ?? "linux/amd64"
const image = `mcr.microsoft.com/playwright:v${version}-noble`
// A volume per lockfile and platform: a new lockfile installs again, the same one is reused.
const modules = `designsystem-visual-${platform.replace("/", "-")}-${createHash("sha256").update(readFileSync(new URL("../package-lock.json", import.meta.url))).digest("hex").slice(0, 12)}`

const docker = spawnSync("docker", ["info"], { stdio: "ignore" })
if (docker.status !== 0) {
  console.error("Docker svarer ikke. Start Docker Desktop eller `colima start`, og prøv igjen.")
  process.exit(1)
}

// The Mac's trusted certificates (a company's root among them, where the network inspects TLS), for npm in the container.
const certs = process.platform === "darwin" ? spawnSync("security", ["find-certificate", "-a", "-p", "/Library/Keychains/System.keychain"], { encoding: "utf8" }).stdout : ""
// Under the home folder: Colima shares only that with its machine, not the system's temporary folder.
const cacheDir = join(homedir(), ".cache", "designsystem-visual")
const certFile = join(cacheDir, "ca.pem")
if (certs !== "") {
  mkdirSync(cacheDir, { recursive: true })
  writeFileSync(certFile, certs)
}
const certMount = certs === "" ? [] : ["-v", `${certFile}:/etc/ssl/extra-ca.pem:ro`, "-e", "NODE_EXTRA_CA_CERTS=/etc/ssl/extra-ca.pem"]

const args = process.argv.slice(2).map((arg) => `'${arg.replaceAll("'", "'\\''")}'`).join(" ")
const script = [
  "set -e",
  // npm ci only when the volume is new: it holds the Linux node_modules for this lockfile.
  "if [ ! -f node_modules/.installed ]; then npm ci --no-audit --no-fund; touch node_modules/.installed; fi",
  `npx vitest run --project=visual ${args}`,
].join("\n")

const result = spawnSync(
  "docker",
  ["run", "--rm", "--init", "--ipc=host", "--platform", platform, "-v", `${root}:/work`, "-v", `${modules}:/work/node_modules`, "-v", "designsystem-visual-npm:/root/.npm", "-w", "/work", "-e", "CI=1", ...certMount, image, "bash", "-c", script],
  { stdio: "inherit" },
)
process.exit(result.status ?? 1)
