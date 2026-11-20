import assert from "node:assert/strict"
import { test } from "node:test"

import { describeSymbol, everyNth, precipitationScale, summariseMeteogram, symbolIcon, temperatureScale, zeroLine } from "./meteogram.ts"

const hour = (time: string, temperature: number, precipitation = 0) => ({ time, temperature, precipitation })

test("a range that crosses zero has zero as a tick and a zero line where the colours split", () => {
  const scale = temperatureScale([-3, -1, 2, 4])
  assert.ok(scale.ticks.includes(0))
  assert.ok(scale.min <= -3 && scale.max >= 4)
  const zero = zeroLine(scale)
  assert.ok(zero !== null && zero > 0 && zero < 100)
  assert.equal(zero, (scale.max / (scale.max - scale.min)) * 100)
})

test("all below zero: the axis stays below, no zero line, the whole line is cold", () => {
  const scale = temperatureScale([-12, -9, -7])
  assert.ok(scale.max < 0)
  assert.equal(zeroLine(scale), null)
})

test("a calm day still gets an axis at least 4° tall", () => {
  const scale = temperatureScale([10, 10.5])
  assert.ok(scale.max - scale.min >= 4)
})

test("a symbol every 3rd hour from the first", () => {
  assert.deepEqual(everyNth(24, 3), [0, 3, 6, 9, 12, 15, 18, 21])
  assert.deepEqual(everyNth(7, 3), [0, 3, 6])
})

test("no rain: the scale keeps 1 mm and the summary says there is none", () => {
  assert.deepEqual(precipitationScale([0, 0, 0]), { min: 0, max: 1, ticks: [0, 1] })
  assert.equal(precipitationScale([0.4, 3.2]).max, 5)
  assert.equal(summariseMeteogram([hour("2026-11-20T12:00:00Z", -3), hour("2026-11-20T13:00:00Z", 2)]), "Fra −3° kl. 13:00 til 2° kl. 14:00. Ingen nedbør.")
})

test("the summary adds the precipitation and names the wettest hour", () => {
  const text = summariseMeteogram([hour("2026-11-20T12:00:00Z", 4, 0.4), hour("2026-11-20T13:00:00Z", 5, 1.8)])
  assert.equal(text, "Fra 4° kl. 13:00 til 5° kl. 14:00. 2,2\u00a0mm nedbør i alt, mest kl. 14:00 (1,8\u00a0mm).")
})

test("a symbol is read as words and an icon by its meaning", () => {
  assert.equal(describeSymbol("clearsky_night"), "Klarvær")
  assert.equal(describeSymbol("lightrainshowers_day"), "Lette regnbyger")
  assert.equal(describeSymbol("heavysnow"), "Kraftig snø")
  assert.equal(describeSymbol("rainandthunder"), "Regn og torden")
  assert.equal(symbolIcon("clearsky_night"), "moon")
  assert.equal(symbolIcon("partlycloudy_night"), "weather-night")
  assert.equal(symbolIcon("lightsleet"), "sleet")
})
