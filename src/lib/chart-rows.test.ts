import { strict as assert } from "node:assert"
import { test } from "node:test"

import { datumRows, stackedRows } from "./chart-rows.ts"

test("one row per category in the chart's own order, labelled as the axis labels it", () => {
  const rows = datumRows([{ label: "1990", value: 12 }, { label: "2000", value: 7 }], (label) => `${label}-tallet`)
  assert.deepEqual(rows, [["1990-tallet", 12], ["2000-tallet", 7]])
})

test("a stacked chart gives one row per label with a column for each series, a missing pair as nothing", () => {
  const rows = stackedRows(
    [
      { label: "2020", series: "A", value: 3 },
      { label: "2020", series: "B", value: 1 },
      { label: "2021", series: "B", value: 4 },
    ],
    ["A", "B"],
  )
  assert.deepEqual(rows, [["2020", 3, 1], ["2021", 0, 4]])
})

test("labels keep the order they first appear in, and a pair given twice is added up", () => {
  const rows = stackedRows(
    [
      { label: "b", series: "A", value: 1 },
      { label: "a", series: "A", value: 2 },
      { label: "b", series: "A", value: 5 },
    ],
    ["A"],
  )
  assert.deepEqual(rows, [["b", 6], ["a", 2]])
})

test("a series that is not in the list is left out", () => {
  assert.deepEqual(stackedRows([{ label: "x", series: "Z", value: 9 }], ["A"]), [["x", 0]])
})
