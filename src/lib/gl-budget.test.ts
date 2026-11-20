import assert from "node:assert/strict"
import { test } from "node:test"

import { acquireGlSlot, glSlotsInUse, MAX_GL_SURFACES } from "./gl-budget.ts"

test("a page has a few WebGL surfaces, and one more gets none until one is given back", () => {
  const held = Array.from({ length: MAX_GL_SURFACES }, () => acquireGlSlot())
  assert.ok(held.every((slot) => slot !== null))
  assert.equal(glSlotsInUse(), MAX_GL_SURFACES)
  assert.equal(acquireGlSlot(), null)
  held[0]?.()
  const again = acquireGlSlot()
  assert.notEqual(again, null)
  for (const slot of [...held, again]) slot?.()
  assert.equal(glSlotsInUse(), 0)
})

test("giving a slot back twice gives back one", () => {
  const slot = acquireGlSlot()
  const other = acquireGlSlot()
  slot?.()
  slot?.()
  assert.equal(glSlotsInUse(), 1)
  other?.()
  assert.equal(glSlotsInUse(), 0)
})
