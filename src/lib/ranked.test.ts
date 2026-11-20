import assert from "node:assert/strict"
import { test } from "node:test"

import { barPercents, changeWords } from "./ranked.ts"

test("a change is said in words, and a move of nothing is unchanged", () => {
  assert.equal(changeWords({ kind: "up", by: 3 }), "Opp 3")
  assert.equal(changeWords({ kind: "down", by: 1 }), "Ned 1")
  assert.equal(changeWords({ kind: "same" }), "Uendret")
  assert.equal(changeWords({ kind: "new" }), "Ny")
  assert.equal(changeWords({ kind: "up", by: 0 }), "Uendret")
  assert.equal(changeWords({ kind: "down", by: Number.NaN }), "Uendret")
})

test("bars are a share of the largest amount, and a row with no amount has none", () => {
  assert.deepEqual(barPercents([200, 100, undefined, 50]), [100, 50, null, 25])
  assert.deepEqual(barPercents([0, 0]), [0, 0])
  assert.deepEqual(barPercents([]), [])
})
