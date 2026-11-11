import { strict as assert } from "node:assert"
import { test } from "node:test"

import { FIRST_ROWS, nextCount, ROWS_PER_STEP } from "./progressive-count.ts"

test("a short list is drawn whole at once", () => {
  assert.equal(nextCount(0, 12), 12)
  assert.equal(nextCount(FIRST_ROWS, FIRST_ROWS), FIRST_ROWS)
})

test("a long list starts with the first rows and grows by one step up to its length", () => {
  assert.equal(nextCount(0, 500), FIRST_ROWS)
  assert.equal(nextCount(FIRST_ROWS, 500), FIRST_ROWS + ROWS_PER_STEP)
  assert.equal(nextCount(490, 500), 500)
})
