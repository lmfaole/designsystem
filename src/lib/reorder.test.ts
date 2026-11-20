import { strict as assert } from "node:assert"
import { test } from "node:test"

import { applyMove, moveTo, parseMove } from "./reorder.ts"

const order = ["vaer", "transport", "github", "kalender"]

test("a move goes one place up or down, and leaves the order it was given alone", () => {
  assert.deepEqual(applyMove(order, "github:up"), ["vaer", "github", "transport", "kalender"])
  assert.deepEqual(applyMove(order, "vaer:down"), ["transport", "vaer", "github", "kalender"])
  assert.deepEqual(order, ["vaer", "transport", "github", "kalender"])
})

test("a move past an end, of an id that is not there, or not understood changes nothing", () => {
  for (const move of ["vaer:up", "kalender:down", "borte:up", "github", "github:left", ":up", "", null, undefined]) assert.deepEqual(applyMove(order, move), order, String(move))
})

test("the direction is after the last colon, so an id may hold one", () => {
  assert.deepEqual(parseMove("a:b:down"), { id: "a:b", direction: "down" })
  assert.deepEqual(applyMove(["x", "a:b"], "a:b:up"), ["a:b", "x"])
})

test("a drag moves an item from one place to another", () => {
  assert.deepEqual(moveTo(order, 0, 2), ["transport", "github", "vaer", "kalender"])
  assert.deepEqual(moveTo(order, 3, 0), ["kalender", "vaer", "transport", "github"])
  assert.deepEqual(moveTo(order, 1, 9), order)
})
