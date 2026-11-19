import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { test } from "node:test"

import { LAYOUT_REM, PANE_COLUMN, READING_COLUMN, WIDTH_CLASSES } from "./page-width.ts"

const layout = readFileSync(new URL("../components/layout.tsx", import.meta.url), "utf8")

test("a pane page holds the reading column, the gap and the widest pane, and the split begins where the main content still has a reading width", () => {
  const { reading, gap, paneMin, paneMax, panePage, splitAt } = LAYOUT_REM
  assert.equal(reading + gap + paneMax, panePage)
  assert.ok(splitAt <= panePage, "the pane page must be wide enough for the split to begin")
  // At the first width the pane is beside, the main content has what is left: never under 30rem (about 60 characters).
  assert.ok(splitAt - gap - paneMax >= 30)
  assert.ok(splitAt - gap - paneMin <= reading)
})

test("the classes say the same numbers: Tailwind reads them as text, so they are written out and held here", () => {
  assert.ok(PANE_COLUMN.includes(`max-w-[${LAYOUT_REM.panePage}rem]`))
  assert.ok(READING_COLUMN.includes("max-w-3xl"), "max-w-3xl is 48rem")
  assert.ok(layout.includes(`minmax(${LAYOUT_REM.paneMin}rem,${LAYOUT_REM.paneMax}rem)`))
  assert.ok(layout.includes(`minmax(0,${LAYOUT_REM.reading}rem)`))
  // @4xl is a container of 56rem.
  assert.equal(LAYOUT_REM.splitAt, 56)
  assert.ok(layout.includes("@4xl:grid-cols-"))
})

test("the width classes rise, start at nothing and name the split", () => {
  const starts = WIDTH_CLASSES.map((one) => one.fromRem)
  assert.deepEqual(starts, [...starts].sort((a, b) => a - b))
  assert.equal(starts[0], 0)
  assert.equal(WIDTH_CLASSES.find((one) => one.name === "expanded")?.fromRem, LAYOUT_REM.splitAt)
})
