import { strict as assert } from "node:assert"
import { test } from "node:test"

import { spacers } from "./virtual-spacers.ts"

// Rows 40 high with a gap of 8: row i starts at i * 48 and ends 40 below; 100 rows are 100 * 48 - 8 high.
const row = (index: number, margin = 0) => ({ start: margin + index * 48, end: margin + index * 48 + 40 })

test("the spacers hold the height of the rows not drawn, less the gap the table adds beside each", () => {
  assert.deepEqual(spacers(row(10), row(20), 4792, 0, 8), { top: 10 * 48 - 8, bottom: 79 * 48 - 8 })
})

test("nothing is added at an end where every row is drawn", () => {
  assert.deepEqual(spacers(row(0), row(99), 4792, 0, 8), { top: 0, bottom: 0 })
})

test("a list that begins below the top of the scroll area is counted from where it begins", () => {
  assert.deepEqual(spacers(row(10, 300), row(20, 300), 4792, 300, 8), { top: 10 * 48 - 8, bottom: 79 * 48 - 8 })
})

test("no drawn rows, no spacers", () => {
  assert.deepEqual(spacers(undefined, undefined, 0, 0, 8), { top: 0, bottom: 0 })
})
