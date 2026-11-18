import { strict as assert } from "node:assert"
import { readFileSync, readdirSync } from "node:fs"
import { join, relative } from "node:path"
import { test } from "node:test"

import { ICONS } from "./icons.ts"

const src = join(import.meta.dirname, "..")

const files = (directory: string): string[] =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name)
    return entry.isDirectory() ? files(path) : /\.tsx?$/.test(entry.name) ? [path] : []
  })

test("every icon is named for a meaning, in lower-case words joined by dashes", () => {
  for (const name of Object.keys(ICONS)) assert.match(name, /^[a-z]+(?:-[a-z]+)*$/, name)
})

test("every meaning is an icon component, and no two meanings share a glyph", () => {
  const glyphs = Object.values(ICONS)
  for (const [name, glyph] of Object.entries(ICONS)) assert.ok(glyph !== undefined && (typeof glyph === "function" || typeof glyph === "object"), `${name} is not a component`)
  assert.equal(new Set(glyphs).size, glyphs.length, "two meanings use the same glyph: one of them should have its own, or be the other")
})

test("a page imports icons from lib/icons.ts, never from lucide-react", () => {
  const direct = files(src)
    .filter((file) => !file.endsWith("lib/icons.ts") && !relative(src, file).startsWith("components/ui/"))
    .filter((file) => /from\s+["']lucide-react["']/.test(readFileSync(file, "utf8")))
    .map((file) => relative(src, file))
  assert.deepEqual(direct, [], "import from ../lib/icons (and add the meaning to ICONS) instead of lucide-react")
})

test("an icon is hidden from a screen reader unless it is given a label, and takes no class of its own", () => {
  const icon = readFileSync(join(src, "components/icon.tsx"), "utf8")
  assert.match(icon, /"aria-hidden": true/)
  assert.match(icon, /role: "img", "aria-label": label/)
  assert.doesNotMatch(icon, /className\?:|style\?:/)
})
