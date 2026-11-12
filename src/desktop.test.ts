/**
 * Wide screens are used, not left empty (README rule 7). These tests pin the choices that make that so, so a later change
 * cannot quietly bring back a page cap, a list that is one thin column, or a grid that stops at four.
 *
 * `ALLOWED_MAX_W` may only shrink: a `max-w-*` is for a line of text (a measure) or for the size of a small picture, never for
 * a layout. A layout that is too wide is laid out in more columns (`Grid`, `Split`, `LIST_COLUMNS`) instead.
 */

import { strict as assert } from "node:assert"
import { readFileSync, readdirSync } from "node:fs"
import { join, relative } from "node:path"
import { test } from "node:test"

const src = import.meta.dirname

const files = (directory: string): string[] =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) return entry.name === "ui" ? [] : files(path)
    return /\.tsx$/.test(entry.name) ? [path] : []
  })

const read = (path: string): string => readFileSync(join(src, path), "utf8")

/** The `max-w-*` classes that are left, per file: a measure for text, the size of a mark. */
const ALLOWED_MAX_W: Readonly<Record<string, readonly string[]>> = {
  "components/cv-list.tsx": ["max-w-prose"],
  "components/error-page.tsx": ["max-w-prose"],
  "components/creator-marks.tsx": ["max-w-36", "max-w-44"],
  "components/layout.tsx": ["max-w-prose"],
  "components/page-header.tsx": ["max-w-2xl"],
}

test("the page column has no maximum width", () => {
  const column = read("lib/page-width.ts").match(/PAGE_COLUMN\s*=\s*"([^"]*)"/)?.[1]
  assert.ok(column !== undefined, "PAGE_COLUMN is a string")
  assert.doesNotMatch(column, /max-w|max-inline|container\b|\bmx-auto\b/, "the page column fills the page area; wide screens get more columns, not margins")
  assert.match(column, /\bw-full\b/)
})

test("a max-width is only a measure for text or the size of a mark, and only where it is listed", () => {
  const found: Record<string, string[]> = {}
  for (const file of files(src)) {
    const classes = [...new Set(readFileSync(file, "utf8").match(/(?<![\w-])max-(?:w|inline)-[^\s"'`}]+/g) ?? [])].toSorted()
    if (classes.length > 0) found[relative(src, file)] = classes
  }
  assert.deepEqual(found, ALLOWED_MAX_W, "a layout got a max-width (lay it out in more columns instead), or ALLOWED_MAX_W lists more than is left (lower it)")
})

test("every list of rows flows into as many columns as there is room for", () => {
  for (const file of ["rows", "media-rows", "track-rows", "entity-rows"]) {
    assert.match(read(`components/${file}.tsx`), /LIST_COLUMNS/, `${file}: the rows are one thin column with the count far from the name`)
  }
  assert.match(read("lib/page-width.ts"), /LIST_COLUMNS\s*=\s*"[^"]*auto-fill[^"]*"/)
})

test("a counted Grid keeps growing on a very wide screen, and fitting grids exist", () => {
  const layout = read("components/layout.tsx")
  const columns = layout.match(/const COLUMNS = \{([\s\S]*?)\} as const/)?.[1] ?? ""
  for (const count of [2, 3, 4]) {
    assert.match(columns, new RegExp(`\\b${count}: "[^"]*2xl:grid-cols-\\d`), `Grid columns={${count}} has no step beyond lg`)
  }
  for (const name of ["tiles", "cards", "sections", "charts"]) assert.match(columns, new RegExp(`\\b${name}: "[^"]*auto-(?:fill|fit)`), `Grid columns="${name}" fits as many as there is room for`)
  assert.match(layout, /export function Split\b/, "Split: a rail beside the content on a wide screen")
})

test("galleries and link grids fit by room, not by a fixed count", () => {
  assert.match(read("components/gallery.tsx"), /auto-fill/)
  assert.match(read("components/page-links.tsx"), /auto-fill/)
  assert.doesNotMatch(read("components/gallery.tsx"), /2xl:grid-cols-\d/, "a fixed count stops growing")
})
