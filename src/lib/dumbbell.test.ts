import assert from "node:assert/strict"
import { test } from "node:test"

import { axisPosition, axisRange, sortByChange } from "./dumbbell.ts"

test("the biggest change, up or down, comes first and ties keep their order", () => {
  const rows = [{ label: "a", from: 1, to: 2 }, { label: "b", from: 9, to: 1 }, { label: "c", from: 1, to: 2 }]
  assert.deepEqual(sortByChange(rows).map((row) => row.label), ["b", "a", "c"])
})

test("positions are shared and a flat axis centres", () => {
  const { min, max } = axisRange([{ from: 0, to: 100 }])
  assert.ok(min < 0 && max > 100)
  assert.equal(axisPosition(50, 0, 100), 50)
  assert.equal(axisPosition(7, 7, 7), 50)
})
