#!/usr/bin/env node
// Copies the design system's skills (.claude/skills/designsystem-*) into the project it is run in, so Claude Code sessions in the
// project follow the same UX, UI, accessibility and content rules as the design system.
//
//   npx designsystem-skills            (from a project that has @lmfaole/designsystem installed)
//   npx designsystem-skills --check    (exit 1 if the project's copies are not the design system's)
//
// Only `designsystem-*` folders are written, so the project's own skills are never touched. Commit the result.

import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync } from "node:fs"
import { dirname, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const source = resolve(dirname(fileURLToPath(import.meta.url)), "..", ".claude", "skills")
const target = resolve(process.cwd(), ".claude", "skills")
const check = process.argv.includes("--check")

if (!existsSync(source)) {
  console.error(`No skills found at ${source}`)
  process.exit(1)
}
if (source === target) {
  console.log("These are the design system's own skills; nothing to install here.")
  process.exit(0)
}

const names = readdirSync(source, { withFileTypes: true }).filter((entry) => entry.isDirectory() && entry.name.startsWith("designsystem-")).map((entry) => entry.name)
const read = (directory) => (existsSync(join(directory, "SKILL.md")) ? readFileSync(join(directory, "SKILL.md"), "utf8") : null)

const stale = names.filter((name) => read(join(source, name)) !== read(join(target, name)))
if (check) {
  if (stale.length > 0) {
    console.error(`Out of date: ${stale.join(", ")}. Run: npx designsystem-skills`)
    process.exit(1)
  }
  console.log(`${names.length} design system skills are up to date.`)
  process.exit(0)
}

mkdirSync(target, { recursive: true })
for (const name of names) {
  rmSync(join(target, name), { recursive: true, force: true })
  cpSync(join(source, name), join(target, name), { recursive: true })
}
console.log(`Installed ${names.length} design system skills into ${target}: ${names.join(", ")}`)
