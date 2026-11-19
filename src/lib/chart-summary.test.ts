import { strict as assert } from "node:assert"
import { test } from "node:test"

import { formatChartValue } from "./chart-format.ts"
import { summariseSeries } from "./chart-summary.ts"
import { sparklinePoints } from "./sparkline.ts"

const months = [{ label: "des", value: 210 }, { label: "jan", value: 250 }, { label: "mar", value: 402 }, { label: "nov", value: 380 }]

test("a series in order says what it counts, the highest, the lowest and how it moved", () => {
  const text = summariseSeries(months, { kind: "Linjediagram", valueLabel: "Avspillinger", ordered: true })
  assert.equal(text, "Linjediagram. Avspillinger, 4 verdier. Høyest mar (402), lavest des (210). Økte fra 210 til 380.")
})

test("categories say the highest and the lowest, and not how they moved", () => {
  const text = summariseSeries(months, { kind: "Søylediagram", valueLabel: "Avspillinger" })
  assert.ok(!text?.includes("Økte"))
  assert.match(text ?? "", /Høyest mar/)
})

test("a flat series is «omtrent uendret», and equal values are said once", () => {
  assert.match(summariseSeries([{ label: "a", value: 100 }, { label: "b", value: 101 }, { label: "c", value: 100 }, { label: "d", value: 160 }, { label: "e", value: 100 }], { kind: "K", valueLabel: "V", ordered: true }) ?? "", /Omtrent uendret/)
  assert.match(summariseSeries([{ label: "a", value: 5 }, { label: "b", value: 5 }], { kind: "K", valueLabel: "V", ordered: true }) ?? "", /Alle er 5\. Omtrent uendret\./)
})

test("one value and no value", () => {
  assert.equal(summariseSeries([{ label: "a", value: 7 }], { kind: "K", valueLabel: "V" }), "K. V, én verdi. a: 7.")
  assert.equal(summariseSeries([], { kind: "K", valueLabel: "V" }), null)
})

test("numbers are Norwegian, with a real minus", () => {
  assert.equal(formatChartValue(12345.6), "12 345,6")
  assert.equal(formatChartValue(-3), "−3")
})

test("a sparkline needs three values and keeps its dot inside the box", () => {
  assert.equal(sparklinePoints([1, 2], 96, 24), null)
  assert.equal(sparklinePoints([1, Number.NaN, 3], 96, 24), null)
  const points = sparklinePoints([1, 5, 3], 96, 24) ?? []
  assert.equal(points.length, 3)
  assert.deepEqual([points[0]?.x, points.at(-1)?.x], [2, 94])
  assert.ok(points.every((point) => point.y >= 2 && point.y <= 22))
  assert.equal(points[1]?.y, 2)
})

test("a flat series is a line through the middle", () => {
  assert.ok((sparklinePoints([4, 4, 4], 96, 24) ?? []).every((point) => point.y === 12))
})
