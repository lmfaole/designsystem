import assert from "node:assert/strict"
import { test } from "node:test"

import { approach, DEFAULT_LIGHT, lightAngle, lightFromPointer, lightFromTilt, settled, shadowOffset } from "./light.ts"

test("the light is at the pointer, from -1 to 1 across the screen, and never outside it", () => {
  assert.deepEqual(lightFromPointer(0, 0, 400, 800), { x: -1, y: -1 })
  assert.deepEqual(lightFromPointer(200, 400, 400, 800), { x: 0, y: 0 })
  assert.deepEqual(lightFromPointer(900, -50, 400, 800), { x: 1, y: -1 })
  assert.deepEqual(lightFromPointer(10, 10, 0, 0), DEFAULT_LIGHT)
})

test("a phone held as it is read keeps the light's height, and tilting it moves the light across the screen", () => {
  const level = lightFromTilt(45, 0)
  assert.equal(level.x, 0)
  assert.ok(lightFromTilt(45, 20).x < level.x)
  assert.ok(lightFromTilt(45, -20).x > level.x)
  assert.ok(lightFromTilt(80, 0).y < level.y)
  const far = lightFromTilt(400, 400)
  assert.ok(Math.abs(far.x) <= 1 && Math.abs(far.y) <= 1)
})

test("a tilt reading that is not a number is the default light", () => {
  assert.deepEqual(lightFromTilt(null, 10), DEFAULT_LIGHT)
  assert.deepEqual(lightFromTilt(10, null), DEFAULT_LIGHT)
  assert.deepEqual(lightFromTilt(Number.NaN, 3), DEFAULT_LIGHT)
})

test("the light moves half the distance in the half-life, whatever the frame rate", () => {
  const half = approach({ x: 0, y: 0 }, { x: 1, y: -1 }, 120, 120)
  assert.ok(Math.abs(half.x - 0.5) < 1e-9 && Math.abs(half.y + 0.5) < 1e-9)
  let slow = { x: 0, y: 0 }
  for (let i = 0; i < 12; i += 1) slow = approach(slow, { x: 1, y: 0 }, 10, 120)
  let fast = { x: 0, y: 0 }
  fast = approach(fast, { x: 1, y: 0 }, 120, 120)
  assert.ok(Math.abs(slow.x - fast.x) < 1e-9)
  assert.deepEqual(approach({ x: 0.3, y: 0.3 }, { x: 1, y: 1 }, 0), { x: 0.3, y: 0.3 })
})

test("a shadow falls away from the light, and a light that has settled is told", () => {
  assert.deepEqual(shadowOffset({ x: -0.5, y: -0.5 }, 8), { x: 4, y: 4 })
  assert.ok(Math.abs(lightAngle({ x: 0, y: 1 }) - Math.PI / 2) < 1e-9)
  assert.ok(settled({ x: 0.5, y: 0.5 }, { x: 0.5005, y: 0.5 }))
  assert.ok(!settled({ x: 0, y: 0 }, { x: 0.1, y: 0 }))
})
