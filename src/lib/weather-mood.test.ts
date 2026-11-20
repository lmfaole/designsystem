import assert from "node:assert/strict"
import { test } from "node:test"

import { BACKDROP_HIGHLIGHT, BACKDROP_OPACITY, PAGE_BACKDROP_OPACITY } from "./palette.ts"
import { readSymbol, weatherAccent, weatherPalette } from "./weather-mood.ts"

const CODES = [
  "clearsky_day", "clearsky_night", "clearsky_polartwilight", "fair_day", "fair_night", "partlycloudy_day", "partlycloudy_night", "cloudy", "fog",
  "lightrain", "rain", "heavyrain", "lightrainshowers_day", "heavyrainshowers_night", "lightsleet", "sleet", "heavysleet", "lightsleetshowers_day",
  "lightsnow", "snow", "heavysnow", "lightsnowshowers_night", "rainandthunder", "heavyrainshowersandthunder_day", "lightssleetshowersandthunder_night", "snowandthunder",
]

test("a symbol code is read as a kind of weather and a time of day, with what Yr adds (showers, thunder, light, heavy) not changing the kind", () => {
  assert.deepEqual(readSymbol("clearsky_day"), { kind: "clear", period: "day" })
  assert.deepEqual(readSymbol("fair_night"), { kind: "clear", period: "night" })
  assert.deepEqual(readSymbol("clearsky_polartwilight"), { kind: "clear", period: "night" })
  assert.deepEqual(readSymbol("partlycloudy_day"), { kind: "partly", period: "day" })
  assert.equal(readSymbol("heavyrainshowers_night").kind, "rain")
  assert.equal(readSymbol("lightsleetshowers_day").kind, "sleet")
  assert.equal(readSymbol("heavysnow").kind, "snow")
  assert.equal(readSymbol("rainshowersandthunder_day").kind, "thunder")
  assert.equal(readSymbol("fog").kind, "fog")
  assert.equal(readSymbol("something-new").kind, "cloudy")
})

test("every weather has four colours, and weathers that look different are different", () => {
  const seen = new Set<string>()
  for (const code of CODES) {
    const palette = weatherPalette(code)
    assert.equal(palette.length, 4)
    for (const colour of palette) for (const channel of colour) assert.ok(Number.isInteger(channel) && channel >= 0 && channel <= 255, `${code}: ${colour}`)
  }
  for (const code of ["clearsky_day", "clearsky_night", "cloudy", "rain", "snow", "fog", "rainandthunder"]) seen.add(JSON.stringify(weatherPalette(code)))
  assert.equal(seen.size, 7)
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

test("the text keeps 4.5:1 on every weather's backdrop, with the light's highlight on it, in both themes", () => {
  for (const [bg, text, opacity] of [[[10, 10, 10], [250, 250, 250], BACKDROP_OPACITY.dark], [[255, 255, 255], [10, 10, 10], BACKDROP_OPACITY.light]] as const) {
    for (const code of CODES) {
      for (const colour of weatherPalette(code)) {
        for (const shown of [colour, colour.map((v) => Math.min(255, v + BACKDROP_HIGHLIGHT * 255))]) {
          const blended = shown.map((v, index) => v * opacity + (bg[index] ?? 0) * (1 - opacity))
          assert.ok(ratio([...text], blended) >= 4.5, `${code} on ${bg[0]} gave ${ratio([...text], blended).toFixed(2)}`)
        }
      }
    }
  }
})

test("behind a whole page, muted text keeps 4.5:1 on every weather's backdrop too, in both themes", () => {
  // The muted text colours of theme.css (oklch 0.5 and 0.708) on the page backgrounds (oklch 1 and 0.145).
  for (const [bg, text, opacity] of [[[10, 10, 10], [161, 161, 161], PAGE_BACKDROP_OPACITY.dark], [[255, 255, 255], [99, 99, 99], PAGE_BACKDROP_OPACITY.light]] as const) {
    for (const code of CODES) {
      for (const colour of weatherPalette(code)) {
        for (const shown of [colour, colour.map((v) => Math.min(255, v + BACKDROP_HIGHLIGHT * 255))]) {
          const blended = shown.map((v, index) => v * opacity + (bg[index] ?? 0) * (1 - opacity))
          assert.ok(ratio([...text], blended) >= 4.5, `${code} on ${bg[0]} gave ${ratio([...text], blended).toFixed(2)}`)
        }
      }
    }
  }
})

test("a weather's accent is its own first colour toward the text colour, so each kind of weather has a different one", () => {
  const accents = new Set(["clearsky_day", "cloudy", "rain", "snow", "rainandthunder", "clearsky_night"].map(weatherAccent))
  assert.equal(accents.size, 6)
  assert.match(weatherAccent("rain"), /^color-mix\(in oklab, color\(srgb [\d.]+ [\d.]+ [\d.]+\) 68%, var\(--foreground\)\)$/)
})
