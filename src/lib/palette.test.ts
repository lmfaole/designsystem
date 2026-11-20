import assert from "node:assert/strict"
import { test } from "node:test"

import { BACKDROP_HIGHLIGHT, BACKDROP_OPACITY, lively, paletteOf, quarterMean } from "./palette.ts"

const square = (size: number, colour: (x: number, y: number) => [number, number, number, number]): number[] => {
  const pixels: number[] = []
  for (let y = 0; y < size; y += 1) for (let x = 0; x < size; x += 1) pixels.push(...colour(x, y))
  return pixels
}

test("each quarter of a picture has its own mean colour", () => {
  const pixels = square(8, (x, y) => (y < 4 ? (x < 4 ? [255, 0, 0, 255] : [0, 255, 0, 255]) : x < 4 ? [0, 0, 255, 255] : [255, 255, 255, 255]))
  assert.deepEqual(quarterMean(pixels, 8, 0), [255, 0, 0])
  assert.deepEqual(quarterMean(pixels, 8, 1), [0, 255, 0])
  assert.deepEqual(quarterMean(pixels, 8, 2), [0, 0, 255])
  assert.deepEqual(quarterMean(pixels, 8, 3), [255, 255, 255])
})

test("transparent pixels are not counted, and a quarter with nothing is a neutral grey", () => {
  const pixels = square(4, (x) => (x < 2 ? [200, 100, 50, 255] : [0, 0, 0, 0]))
  assert.deepEqual(quarterMean(pixels, 4, 0), [200, 100, 50])
  assert.deepEqual(quarterMean(pixels, 4, 1), [128, 128, 128])
})

test("a backdrop colour is lifted to a coloured middle band, never white or black, and a grey stays grey", () => {
  for (const colour of [[255, 255, 255], [0, 0, 0], [10, 10, 12], [250, 250, 245]] as const) {
    const [r, g, b] = lively([...colour])
    const lightness = (Math.max(r, g, b) + Math.min(r, g, b)) / 2 / 255
    assert.ok(lightness >= 0.33 && lightness <= 0.63, `${colour} gave lightness ${lightness}`)
  }
  const grey = lively([120, 120, 120])
  assert.ok(Math.abs(grey[0] - grey[1]) <= 1 && Math.abs(grey[1] - grey[2]) <= 1)
  const dull = lively([150, 110, 100])
  const spread = (c: number[]) => Math.max(...c) - Math.min(...c)
  assert.ok(spread(dull) > spread([150, 110, 100]), "a dull colour is made more saturated")
})

test("the palette has four colours, one per quarter", () => {
  const palette = paletteOf(square(8, () => [200, 80, 60, 255]), 8)
  assert.equal(palette.length, 4)
  for (const colour of palette) assert.equal(colour.length, 3)
})

const linear = (value: number): number => {
  const c = value / 255
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
}
const luminance = ([r, g, b]: number[]): number => 0.2126 * linear(r ?? 0) + 0.7152 * linear(g ?? 0) + 0.0722 * linear(b ?? 0)
const ratio = (a: number[], b: number[]): number => {
  const [high, low] = luminance(a) > luminance(b) ? [luminance(a), luminance(b)] : [luminance(b), luminance(a)]
  return (high + 0.05) / (low + 0.05)
}

test("the head's text keeps 4.5:1 on the backdrop, on the worst colour a picture can give, with the light's highlight on it, in both themes", () => {
  const hueToRgb = (hue: number): number[] => [4, 0, 2].map((n) => Math.round(255 * Math.max(0, Math.min(1, Math.abs((((hue / 60 + n) % 6) - 3)) - 1))))
  for (const [bg, text, opacity] of [[[10, 10, 10], [250, 250, 250], BACKDROP_OPACITY.dark], [[255, 255, 255], [10, 10, 10], BACKDROP_OPACITY.light]] as const) {
    for (let hue = 0; hue < 360; hue += 5) {
      for (const dull of [false, true]) {
        const base = hueToRgb(hue)
        const colour = lively((dull ? base.map((v) => 128 + (v - 128) * 0.3) : base) as [number, number, number])
        for (const shown of [colour, colour.map((v) => Math.min(255, v + BACKDROP_HIGHLIGHT * 255))]) {
          const blended = shown.map((v, index) => v * opacity + (bg[index] ?? 0) * (1 - opacity))
          assert.ok(ratio([...text], blended) >= 4.5, `hue ${hue} ${dull ? "dull" : "vivid"} on ${bg[0]} gave ${ratio([...text], blended).toFixed(2)}`)
        }
      }
    }
  }
})
