#!/usr/bin/env node
// Moves a project to a newer design system in one step: every `package.json` of the repository that pins `@lmfaole/designsystem` gets the
// same commit, the lockfile is brought in step, the skills are installed again and the result is checked.
//
//   npx designsystem-bump               (the latest commit of main on GitHub)
//   npx designsystem-bump <sha|tag>     (a commit or a tag)
//   npx designsystem-bump --dry-run     (say what would change)
//
// Why a script: the pin is a commit, a project may pin it in many places (a monorepo has one per package), and a bump that misses one, or
// leaves the skills of the old version behind, is a project that follows the old rules without anyone seeing it.

import { execFileSync } from "node:child_process"
import { readFileSync, writeFileSync } from "node:fs"

const dry = process.argv.includes("--dry-run")
const wanted = process.argv.slice(2).find((argument) => !argument.startsWith("--")) ?? "main"
const REPOSITORY = "https://github.com/lmfaole/designsystem.git"
const PIN = /(github:lmfaole\/designsystem#)([0-9a-f]{40}|v?\d[\w.-]*)/g

const run = (command, args, options = {}) => (execFileSync(command, args, { encoding: "utf8", stdio: ["ignore", "pipe", "inherit"], ...options }) ?? "").trim()

function resolveRef(ref) {
  if (/^[0-9a-f]{40}$/.test(ref)) return ref
  const lines = run("git", ["ls-remote", REPOSITORY, ref, `${ref}^{}`]).split("\n").filter(Boolean)
  // An annotated tag lists the tag object and then the commit it points at (`^{}`): the commit is what a pin means.
  const peeled = lines.find((line) => line.endsWith("^{}")) ?? lines[0]
  const sha = peeled?.split("\t")[0]
  if (sha === undefined || !/^[0-9a-f]{40}$/.test(sha)) throw new Error(`No such ref on ${REPOSITORY}: ${ref}`)
  return sha
}

const sha = resolveRef(wanted)
const files = run("git", ["ls-files", "--", "package.json", "**/package.json"]).split("\n").filter(Boolean)
let changed = 0
for (const file of files) {
  const before = readFileSync(file, "utf8")
  if (!PIN.test(before)) continue
  PIN.lastIndex = 0
  const after = before.replace(PIN, `$1${sha}`)
  if (after === before) continue
  changed += 1
  console.log(`${dry ? "would pin" : "pinned"} ${file}`)
  if (!dry) writeFileSync(file, after)
}
if (changed === 0) console.log(`Every pin is already ${sha}; the lockfile and the skills are still checked.`)
if (dry) process.exit(0)

run("npm", ["install", "--no-audit", "--no-fund"], { stdio: "inherit" })

// The lockfile's `version` of the package is what npm read when it was resolved; bring it to the one now installed.
const installed = JSON.parse(readFileSync("node_modules/@lmfaole/designsystem/package.json", "utf8")).version
const lock = JSON.parse(readFileSync("package-lock.json", "utf8"))
let touched = false
for (const [path, entry] of Object.entries(lock.packages ?? {})) {
  if (path.endsWith("node_modules/@lmfaole/designsystem") && entry.version !== installed) {
    entry.version = installed
    touched = true
  }
}
if (touched) writeFileSync("package-lock.json", `${JSON.stringify(lock, null, 2)}\n`)

run("npx", ["designsystem-skills"], { stdio: "inherit" })
run("npx", ["designsystem-skills", "--check"], { stdio: "inherit" })
console.log(`\nDesign system ${installed} (${sha.slice(0, 7)}) in ${changed} package.json file${changed === 1 ? "" : "s"}. Run the tests, then commit.`)
