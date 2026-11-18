/**
 * One reading direction: down (README, rule 7). What is read (titles, lists, sections, text) stands in ONE column, under each
 * other, in the order it matters, at a width the eye can follow. A row of columns makes the reader read across and then down, so the
 * order is in doubt, what comes first is hidden and the eye has more to do. Columns are for what is LOOKED AT: pictures, charts,
 * cards of equal weight, a few figures. On a wide screen the rest of the width is margin.
 *
 * These tests pin the choices that make that so, so a later change cannot quietly bring back a list in columns or a row of sections.
 * `VISUAL` may only shrink: each entry is a component whose columns hold things that are looked at.
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

/** The `max-w-*` classes that are left in the components, per file: a measure for text, the size of a mark. (The reading column's is in `lib/page-width.ts` and is pinned above.) */
const ALLOWED_MAX_W: Readonly<Record<string, readonly string[]>> = {
  "components/error-page.tsx": ["max-w-prose"],
  "components/logos.tsx": ["max-w-36", "max-w-44"],
  "components/markdown.tsx": ["max-w-full"],
  "components/layout.tsx": ["max-w-prose"],
}

/** The components whose columns hold things that are looked at (pictures, charts, small cards, figures), not read. */
const VISUAL: readonly string[] = ["components/layout.tsx", "components/stacked-column-chart.tsx", "components/tiles.tsx"]

test("the page frame has no maximum width, and what is read stands in a reading column of 48rem, centred", () => {
  const widths = read("lib/page-width.ts")
  const frame = widths.match(/PAGE_COLUMN\s*=\s*"([^"]*)"/)?.[1]
  assert.ok(frame !== undefined, "PAGE_COLUMN is a string")
  assert.doesNotMatch(frame, /max-w|max-inline|container\b|\bmx-auto\b/, "the frame fills the page area; the measure is the reading column's")
  assert.match(frame, /\bw-full\b/)
  assert.match(widths, /READING_COLUMN\s*=\s*"[^"]*\bmax-w-3xl\b[^"]*\bmx-auto\b|READING_COLUMN\s*=\s*"[^"]*\bmx-auto\b[^"]*\bmax-w-3xl\b/, "READING_COLUMN is 48rem and centred")
  assert.match(read("components/page-layout.tsx"), /width = "reading"/, "a page is in the reading column unless it says it is wide")
  assert.match(read("components/layout.tsx"), /width = "reading"/, "PageColumn too")
})

test("a max-width in a component is only a measure for text or the size of a mark, and only where it is listed", () => {
  const found: Record<string, string[]> = {}
  for (const file of files(src)) {
    const classes = [...new Set(readFileSync(file, "utf8").match(/(?<![\w-])max-(?:w|inline)-[^\s"'`}]+/g) ?? [])].toSorted()
    if (classes.length > 0) found[relative(src, file)] = classes
  }
  assert.deepEqual(found, ALLOWED_MAX_W, "a layout got a max-width (the reading column is the one measure for a layout), or ALLOWED_MAX_W lists more than is left (lower it)")
})

test("every list of text is ONE column, under each other: no CSS columns, no grid of columns", () => {
  for (const file of ["rows", "picture-rows", "entity-rows", "headline-list", "story-list", "fold-list", "entry-list"]) {
    const source = read(`components/${file}.tsx`)
    assert.doesNotMatch(source, /(?<![\w-])(?:\w+:)?columns-\d/, `${file}: a list in CSS columns is read down and then across`)
    assert.doesNotMatch(source, /(?<![\w-])(?:\w+:)?grid-cols-\[repeat\(auto-/, `${file}: a list in a grid of columns is read across and then down`)
  }
  assert.doesNotMatch(read("lib/page-width.ts"), /LIST_COLUMNS/, "there is no longer a list in columns to ask for")
})

test("the sections of a page stand under each other: no side-by-side grid of sections, no group that spreads its parts", () => {
  const layout = read("components/layout.tsx")
  const columns = layout.match(/const COLUMNS = \{([\s\S]*?)\} as const/)?.[1] ?? ""
  assert.doesNotMatch(columns, /\bsections:/, "Grid has no `sections`: parts of a page are not placed side by side")
  const section = read("components/page-section.tsx")
  assert.match(section, /export function SectionGroup\b/)
  assert.doesNotMatch(section, /GROUP_WIDTHS|col-span-full|width\??:/, "SectionGroup has one layout: its subsections under each other")
})

test("columns are only for what is looked at: pictures, charts, small cards, figures", () => {
  const found = files(src)
    .filter((file) => /(?<![\w-])(?:\w+:)?grid-cols-\[repeat\(auto-/.test(readFileSync(file, "utf8")))
    .map((file) => relative(src, file))
    .toSorted()
  assert.deepEqual(found, [...VISUAL].toSorted(), "a component lays things out in columns: if they are read, stand them under each other; if they are looked at, list it in VISUAL")
})

test("a counted Grid keeps growing on a very wide screen, and fitting grids exist, for what is looked at", () => {
  const layout = read("components/layout.tsx")
  const columns = layout.match(/const COLUMNS = \{([\s\S]*?)\} as const/)?.[1] ?? ""
  for (const count of [2, 3, 4]) {
    assert.match(columns, new RegExp(`\\b${count}: "[^"]*2xl:grid-cols-\\d`), `Grid columns={${count}} has no step beyond lg`)
  }
  for (const name of ["tiles", "cards", "charts"]) assert.match(columns, new RegExp(`\\b${name}: "[^"]*auto-(?:fill|fit)`), `Grid columns="${name}" fits as many as there is room for`)
  assert.match(layout, /export function Split\b/, "Split: a rail of reference beside the content on a wide screen")
})

test("galleries fit by room, not by a fixed count", () => {
  assert.match(read("components/tiles.tsx"), /auto-fill/)
  assert.doesNotMatch(read("components/tiles.tsx"), /2xl:grid-cols-\d/, "a fixed count stops growing")
})
