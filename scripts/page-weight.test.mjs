import assert from "node:assert/strict"
import { test } from "node:test"

import { DEFAULT_BUDGET, gramsFor, overBudget, ratingOf, weigh } from "../scripts/page-weight.mjs"

test("a megabyte is about 0.15 g with SWDM v4 at the global grid, and the ratings follow its table", () => {
  assert.ok(Math.abs(gramsFor(1e6) - 0.1482) < 0.001)
  assert.equal(ratingOf(0.03), "A+")
  assert.equal(ratingOf(0.079), "A")
  assert.equal(ratingOf(0.2), "C")
  assert.equal(ratingOf(1), "F")
})

test("a page is weighed by kind, and only the kinds over their limit are named", () => {
  const weight = weigh([{ kind: "html", bytes: 3000 }, { kind: "css", bytes: 60 * 1024 }, { kind: "font", bytes: 70 * 1024 }])
  assert.equal(weight.total, 3000 + 130 * 1024)
  assert.deepEqual(overBudget(weight, DEFAULT_BUDGET), ["css: 60.0 KB over 50 KB"])
  assert.deepEqual(overBudget(weight, {}), [])
})
