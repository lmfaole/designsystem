import { strict as assert } from "node:assert"
import { test } from "node:test"

import { CVD, contrast, distance, inGamut, onto, parseOklch, simulate, toLinear } from "./colour.ts"

test("black on white is 21:1 and a colour on itself is 1:1", () => {
  const black = toLinear(parseOklch("oklch(0 0 0)"))
  const white = toLinear(parseOklch("oklch(1 0 0)"))
  assert.ok(Math.abs(contrast(black, white) - 21) < 0.01)
  assert.equal(contrast(white, white), 1)
})

test("an alpha colour is laid over what is behind it, as a browser does", () => {
  const dark = toLinear(parseOklch("oklch(0.145 0 0)"))
  const line = parseOklch("oklch(1 0 0 / 10%)")
  assert.equal(line.a, 0.1)
  // 10 % white in encoded sRGB over near-black: much weaker than the 2.9:1 that blending in linear light would give.
  assert.ok(contrast(onto(line, dark), dark) < 1.5)
})

test("a colour outside the gamut is found", () => {
  assert.ok(inGamut(parseOklch("oklch(0.5 0.1 250)")))
  assert.ok(!inGamut(parseOklch("oklch(0.8 0.3 150)")))
})

test("red and green are close to each other for someone with deuteranopia", () => {
  const red = toLinear(parseOklch("oklch(0.6 0.2 25)"))
  const green = toLinear(parseOklch("oklch(0.6 0.2 145)"))
  assert.ok(distance(simulate(red, CVD.deutan), simulate(green, CVD.deutan)) < distance(red, green))
})

test("something that is not oklch is refused", () => {
  assert.throws(() => parseOklch("#fff"), /not an oklch/)
})
