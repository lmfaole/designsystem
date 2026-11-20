import assert from "node:assert/strict"
import { test } from "node:test"

import { identity, multiply, perspective, rotationPart, rotationX, rotationY, transformPoint, translation } from "./mat4.ts"

const close = (a: number[], b: number[], eps = 1e-5): boolean => a.every((value, index) => Math.abs(value - (b[index] ?? 0)) < eps)

test("the identity changes nothing, and a move moves a point", () => {
  assert.ok(close(transformPoint(identity(), [1, 2, 3]), [1, 2, 3]))
  assert.ok(close(transformPoint(translation(1, -2, 0.5), [1, 1, 1]), [2, -1, 1.5]))
})

test("a quarter turn about y takes the front to the side, and about x takes up to the front", () => {
  assert.ok(close(transformPoint(rotationY(Math.PI / 2), [0, 0, 1]), [1, 0, 0]))
  assert.ok(close(transformPoint(rotationX(Math.PI / 2), [0, 1, 0]), [0, 0, 1]))
})

test("a product applies the right one first", () => {
  const turned = multiply(translation(5, 0, 0), rotationY(Math.PI / 2))
  assert.ok(close(transformPoint(turned, [0, 0, 1]), [6, 0, 0]))
})

test("a rotation keeps lengths and its 3x3 part is the rotation alone", () => {
  const m = multiply(rotationY(0.4), rotationX(-0.3))
  const [x, y, z] = transformPoint(m, [0.3, 0.4, 0.5])
  assert.ok(Math.abs(Math.hypot(x, y, z) - Math.hypot(0.3, 0.4, 0.5)) < 1e-5)
  const part = rotationPart(translation(9, 9, 9))
  assert.deepEqual(Array.from(part), [1, 0, 0, 0, 1, 0, 0, 0, 1])
})

test("the camera puts what is straight ahead in the middle and nearer things lower in depth than farther ones", () => {
  const camera = multiply(perspective(Math.PI / 4, 1.5, 0.1, 10), translation(0, 0, -3))
  const [x, y] = transformPoint(camera, [0, 0, 0])
  assert.ok(Math.abs(x) < 1e-6 && Math.abs(y) < 1e-6)
  const near = transformPoint(camera, [0, 0, 1])[2]
  const far = transformPoint(camera, [0, 0, -1])[2]
  assert.ok(near < far)
  const [right] = transformPoint(camera, [1, 0, 0])
  assert.ok(right > 0 && right < 1)
})
