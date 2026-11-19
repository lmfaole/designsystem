import { strict as assert } from "node:assert"
import { test } from "node:test"

import { meterText, percentOf } from "./progress.ts"

test("a value is a whole percent of its range, kept inside it", () => {
  assert.equal(percentOf(93, 100), 93)
  assert.equal(percentOf(12, 40), 30)
  assert.equal(percentOf(-5, 40), 0)
  assert.equal(percentOf(80, 40), 100)
  assert.equal(percentOf(3, 0), 0)
})

test("a meter says its goal in words", () => {
  assert.equal(meterText(undefined, 12, 40, undefined), "30 %")
  assert.equal(meterText("12 av 40", 12, 40, 30), "12 av 40 · mål 30")
})
