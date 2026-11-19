import assert from "node:assert/strict"
import { test } from "node:test"

import { calendarWeeks, heatLevels } from "./heatmap.ts"

test("levels come from quantiles, so one busy day does not flatten the rest", () => {
  const level = heatLevels([1, 2, 3, 4, 5, 6, 7, 8, 1000])
  assert.equal(level(0), 0)
  assert.equal(level(null), 0)
  assert.equal(level(1), 1)
  assert.equal(level(1000), 4)
  assert.ok(level(5) >= 2 && level(5) <= 3)
})

test("the calendar runs Monday to Sunday and tells a missing day from a zero", () => {
  // 2026-11-04 is a Wednesday.
  const weeks = calendarWeeks([{ date: "2026-11-04", value: 3 }, { date: "2026-11-06", value: 0 }, { date: "2026-11-09", value: 5 }])
  assert.equal(weeks.length, 2)
  assert.deepEqual(weeks[0]?.days.map((day) => day?.date ?? null), [null, null, "2026-11-04", "2026-11-05", "2026-11-06", "2026-11-07", "2026-11-08"])
  assert.equal(weeks[0]?.days[3]?.value, null)
  assert.equal(weeks[0]?.days[4]?.value, 0)
  assert.equal(weeks[0]?.days[4]?.level, 0)
  assert.equal(weeks[0]?.month, "nov.")
  assert.equal(weeks[1]?.days[0]?.date, "2026-11-09")
  assert.deepEqual(calendarWeeks([]), [])
})
