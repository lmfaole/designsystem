import assert from "node:assert/strict"
import { test } from "node:test"

import { summariseCalendar, summariseDumbbell, summariseScatter } from "./chart-summary-complex.ts"
import { monthRows } from "./heatmap.ts"

test("the calendar summary counts days and names the busiest", () => {
  const text = summariseCalendar([{ date: "2026-03-11", value: 2 }, { date: "2026-03-12", value: 9 }, { date: "2026-03-13", value: 0 }], "avspillinger")
  assert.equal(text, "Kalenderdiagram, 11. mars til 13. mars: 11 avspillinger på 2 av 3 dager. Travleste dag: 12. mars (9).")
  assert.equal(summariseCalendar([], "x"), null)
})

test("months add up and count active days", () => {
  assert.deepEqual(monthRows([{ date: "2026-03-01", value: 2 }, { date: "2026-03-02", value: 0 }, { date: "2026-04-01", value: 5 }]), [["mars 2026", 2, 1], ["apr. 2026", 5, 1]])
})

test("the scatter summary never claims a cause and handles no fit", () => {
  assert.match(summariseScatter({ slope: 2, intercept: 0, r2: 0.64, n: 10 }, 10, "x", "y") ?? "", /ikke det samme som en årsak/)
  assert.equal(summariseScatter(null, 2, "x", "y"), "Punktdiagram med 2 punkter: y mot x.")
  assert.equal(summariseScatter(null, 0, "x", "y"), null)
})

test("the dumbbell summary names the biggest change in either direction", () => {
  assert.match(summariseDumbbell([{ label: "A", from: 1, to: 2 }, { label: "B", from: 10, to: 4 }], "2024", "2025") ?? "", /Størst endring: B \(−6\)/)
})
