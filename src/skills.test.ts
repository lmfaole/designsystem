/**
 * The skills (`.claude/skills/*`) are instructions for working with the design system, so they must not rot: each has a valid
 * header that says when to use it, and every component they name still exists. A skill that sends a reader to a component that has
 * been renamed is worse than none.
 */

import { strict as assert } from "node:assert"
import { readFileSync, readdirSync } from "node:fs"
import { join } from "node:path"
import { test } from "node:test"

const root = join(import.meta.dirname, "..")
const skillsDir = join(root, ".claude/skills")
const skills = readdirSync(skillsDir, { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => entry.name)

const files = (directory: string): string[] =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name)
    return entry.isDirectory() ? files(path) : /\.tsx?$/.test(entry.name) ? [path] : []
  })

/** Everything the components and the libraries export, by name. */
const exported = new Set(
  files(join(root, "src"))
    .filter((file) => !file.endsWith(".test.ts"))
    .flatMap((file) => {
      const source = readFileSync(file, "utf8")
      const direct = [...source.matchAll(/export (?:async )?(?:function|const|class|interface|type) ([A-Za-z0-9_]+)/g)].map((match) => match[1] ?? "")
      const listed = [...source.matchAll(/export \{([^}]*)\}/g)].flatMap((match) => (match[1] ?? "").split(",").map((name) => name.trim().split(/\s+as\s+/).pop() ?? ""))
      return [...direct, ...listed]
    }),
)

/** Words in backticks that look like a component but are not one of ours. */
const NOT_OURS = new Set(["Skeleton", "ComponentProps", "Intl"])

test("there are skills for ux, ui, accessibility, content, components and review", () => {
  assert.deepEqual(skills.toSorted(), ["designsystem-accessibility", "designsystem-components", "designsystem-content", "designsystem-review", "designsystem-ui", "designsystem-ux"])
})

test("each skill has a header with its name and a description that says when to use it", () => {
  for (const name of skills) {
    const text = readFileSync(join(skillsDir, name, "SKILL.md"), "utf8")
    const header = /^---\nname: (.+)\ndescription: (.+)\n---\n/.exec(text)
    assert.ok(header !== null, `${name}: a header with name and description`)
    assert.equal(header[1], name, `${name}: the name is the folder's`)
    const description = header[2] ?? ""
    assert.match(description, /^Use (?:when|after)\b/, `${name}: the description starts with when to use it`)
    assert.ok(description.length >= 60 && description.length <= 600, `${name}: a description of a sensible length (${description.length})`)
  }
})

test("every component a skill names exists in the design system", () => {
  const missing: string[] = []
  for (const name of skills) {
    const text = readFileSync(join(skillsDir, name, "SKILL.md"), "utf8")
    for (const match of text.matchAll(/`([A-Z][a-z][A-Za-z0-9]*)(?=[`\s<(])/g)) {
      const word = match[1] ?? ""
      if (!exported.has(word) && !NOT_OURS.has(word)) missing.push(`${name}: ${word}`)
    }
  }
  assert.deepEqual([...new Set(missing)].toSorted(), [], "a skill names a component that does not exist: rename it in the skill, or the component is gone")
})

test("each skill points to the others it relies on, and those exist", () => {
  for (const name of skills) {
    const text = readFileSync(join(skillsDir, name, "SKILL.md"), "utf8")
    for (const match of text.matchAll(/\*\*(designsystem-[a-z]+)\*\*/g)) assert.ok(skills.includes(match[1] ?? ""), `${name} points to ${match[1]}, which does not exist`)
  }
})
