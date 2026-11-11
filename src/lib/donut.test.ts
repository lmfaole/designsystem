import { strict as assert } from "node:assert"
import { test } from "node:test"

import { donutGradient, donutSlices, sliceColor } from "./donut.ts"

const genres = [
  { label: "electronic", value: 50 },
  { label: "pop", value: 30 },
  { label: "rock", value: 10 },
  { label: "jazz", value: 6 },
  { label: "folk", value: 4 },
]

test("the biggest items are slices, the rest one «Other», and the shares add up to one", () => {
  const slices = donutSlices(genres, 3)
  assert.deepEqual(slices.map((slice) => slice.label), ["electronic", "pop", "rock", "Andre"])
  assert.equal(slices[3]?.value, 10)
  assert.equal(slices[3]?.other, true)
  assert.ok(Math.abs((slices.at(-1)?.end ?? 0) - 1) < 1e-9)
})

test("there is no «Other» when everything fits, and the slices are in order round the ring", () => {
  const slices = donutSlices(genres.slice(0, 2), 5)
  assert.deepEqual(slices.map((slice) => [slice.label, slice.start, slice.end]), [
    ["electronic", 0, 50 / 80],
    ["pop", 50 / 80, 1],
  ])
})

test("zero values and no data give no slices", () => {
  assert.deepEqual(donutSlices([]), [])
  assert.deepEqual(donutSlices([{ label: "x", value: 0 }]), [])
  assert.deepEqual(donutSlices([{ label: "x", value: 0 }, { label: "y", value: 3 }]).map((slice) => slice.label), ["y"])
})

test("the gradient has one hard stop per slice, and the first slice is the strongest colour", () => {
  const slices = donutSlices(genres, 2)
  const gradient = donutGradient(slices)
  assert.equal(gradient.match(/color-mix/g)?.length, slices.length)
  assert.match(gradient, /^conic-gradient\(from 0deg, /)
  assert.match(sliceColor(0, 3, false), /100%/)
  assert.match(sliceColor(2, 3, false), /40%/)
  assert.equal(donutGradient([]), "none")
})

test("an item's own colour is kept on its slice and in the gradient, and the rest keep the ramp", () => {
  const slices = donutSlices([{ label: "Debt", value: 60, color: "red" }, { label: "Food", value: 40 }], 5)
  assert.equal(slices[0]?.color, "red")
  assert.equal(slices[1]?.color, undefined)
  const gradient = donutGradient(slices)
  assert.match(gradient, /red 0\.000% 60\.000%/)
  assert.match(gradient, /color-mix/)
  assert.equal(sliceColor(0, 2, false, "red"), "red")
})
