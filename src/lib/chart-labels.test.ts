import { strict as assert } from "node:assert"
import { test } from "node:test"

import { nameOffsets } from "./chart-labels.ts"

test("a name stands above its line's end, and steps down when the line above ends close to it", () => {
  const offsets = nameOffsets([{ name: "A", last: 100 }, { name: "B", last: 97 }, { name: "C", last: 40 }], 100)
  assert.equal(offsets.get("A"), -8)
  assert.equal(offsets.get("B"), 6)
  assert.equal(offsets.get("C"), -8)
})

test("three lines that end together step down one after the other", () => {
  const offsets = nameOffsets([{ name: "A", last: 50 }, { name: "B", last: 49 }, { name: "C", last: 48 }], 100)
  assert.deepEqual([offsets.get("A"), offsets.get("B"), offsets.get("C")], [-8, 6, 20])
})

test("a flat range keeps every name above", () => {
  assert.equal(nameOffsets([{ name: "A", last: 5 }, { name: "B", last: 5 }], 0).get("B"), -8)
})
