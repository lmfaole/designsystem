import { strict as assert } from "node:assert"
import { test } from "node:test"

import { axisTicks, collapseRuns, dayLabel, durationsBetween, formatDuration, groupByDay, groupNounOf, layoutDurations, sortEvents, spanText } from "./timeline.ts"

const NOW = "2026-11-20T13:00:00.000Z"
const MIN = 60_000

test("a duration is short, and a unit takes over before the one below reaches it", () => {
  assert.equal(formatDuration(20_000), "under 1 min")
  assert.equal(formatDuration(12 * MIN), "12 min")
  assert.equal(formatDuration(59.6 * MIN), "1 t")
  assert.equal(formatDuration(3 * 60 * MIN), "3 t")
  assert.equal(formatDuration(23.6 * 60 * MIN), "1 d")
  assert.equal(formatDuration(2 * 1440 * MIN), "2 d")
  assert.equal(formatDuration(21 * 1440 * MIN), "3 u")
  assert.equal(formatDuration(120 * 1440 * MIN), "4 mnd")
  assert.equal(formatDuration(-5), "under 1 min")
})

test("a day is named in Oslo: today, yesterday, then the weekday and date, with the year only when it is another", () => {
  assert.equal(dayLabel("2026-11-20T08:00:00Z", NOW), "I dag")
  assert.equal(dayLabel("2026-11-19T23:30:00Z", NOW), "I dag", "23:30 UTC is after midnight in Oslo")
  assert.equal(dayLabel("2026-11-19T12:00:00Z", NOW), "I går")
  assert.equal(dayLabel("2026-11-21T12:00:00Z", NOW), "I morgen")
  assert.equal(dayLabel("2026-11-12T12:00:00Z", NOW), "Torsdag 12. november")
  assert.equal(dayLabel("2025-11-12T12:00:00Z", NOW), "Onsdag 12. november 2025")
  assert.equal(dayLabel("ikke en tid", NOW), "")
})

test("events are grouped by day in the order given, with the full date beside «I dag»", () => {
  const days = groupByDay([{ at: "2026-11-20T10:00:00Z" }, { at: "2026-11-20T09:00:00Z" }, { at: "2026-11-18T09:00:00Z" }], NOW)
  assert.deepEqual(days.map((day) => [day.key, day.label, day.date, day.events.length]), [["2026-11-20", "I dag", "fredag 20. november", 2], ["2026-11-18", "Onsdag 18. november", "", 1]])
})

test("events are newest first by default, oldest first on asking, and an unreadable time goes last", () => {
  const events = [{ at: "2026-11-19T10:00:00Z" }, { at: "x" }, { at: "2026-11-20T10:00:00Z" }]
  assert.deepEqual(sortEvents(events).map((event) => event.at), ["2026-11-20T10:00:00Z", "2026-11-19T10:00:00Z", "x"])
  assert.deepEqual(sortEvents(events, "asc").map((event) => event.at), ["2026-11-19T10:00:00Z", "2026-11-20T10:00:00Z", "x"])
})

test("a run of more than collapseAfter events of one group folds all but the first; shorter runs and ungrouped events stay", () => {
  const e = (id: string, group?: string, groupNoun?: string) => ({ id, ...(group === undefined ? {} : { group }), ...(groupNoun === undefined ? {} : { groupNoun }) })
  const events = [e("a"), ...["1", "2", "3", "4", "5"].map((n) => e(`c${n}`, "commit")), e("b"), e("d1", "commit"), e("d2", "commit")]
  const items = collapseRuns(events, 3, { commit: "commits" })
  assert.deepEqual(
    items.map((item) => (item.kind === "single" ? item.event.id : `${item.shown.map((x) => x.id).join("")}+${item.hidden.length} ${item.noun}`)),
    ["a", "c1+4 commits", "b", "d1", "d2"],
  )
  assert.equal(collapseRuns(events.slice(1, 4), 3).length, 3, "three is not more than three")
})

test("a group's noun is the event's own, then the page's, then «hendelser»", () => {
  assert.equal(groupNounOf({ group: "album:1", groupNoun: "spor" }, { "album:1": "låter" }), "spor")
  assert.equal(groupNounOf({ group: "commit" }, { commit: "commits" }), "commits")
  assert.equal(groupNounOf({ group: "x" }), "hendelser")
})

test("the time in each step runs to the next reached step, or to now for the current one", () => {
  const steps = [
    { state: "done", at: "2026-11-20T08:00:00Z" },
    { state: "done", at: "2026-11-20T10:00:00Z" },
    { state: "current", at: "2026-11-20T12:00:00Z" },
    { state: "upcoming" },
  ] as const
  assert.deepEqual(durationsBetween(steps, NOW), [2 * 60 * MIN, 2 * 60 * MIN, 60 * MIN, null])
  assert.deepEqual(durationsBetween([{ state: "done", at: "2026-11-20T08:00:00Z" }, { state: "skipped" }, { state: "done", at: "2026-11-20T09:00:00Z" }], NOW), [60 * MIN, null, null])
})

test("a span reads as its times, the clock alone at the end on the same day", () => {
  assert.equal(spanText("2026-11-19T13:00:00Z", "2026-11-19T15:30:00Z"), "19. nov., 14:00–16:30")
  assert.equal(spanText("2026-11-19T13:00:00Z", undefined), "fra 19. nov., 14:00")
})

test("spans are laid out on one axis to now, with a lane per row and the ongoing ones reaching now", () => {
  const layout = layoutDurations(
    [
      { key: "a", label: "Venter på review", start: "2026-11-20T09:00:00Z", end: "2026-11-20T11:00:00Z", row: "Status" },
      { key: "b", label: "Godkjent", start: "2026-11-20T11:00:00Z", row: "Status" },
      { key: "c", label: "Sjekker feiler", start: "2026-11-20T10:00:00Z", end: "2026-11-20T10:30:00Z" },
    ],
    NOW,
  )
  assert.deepEqual(layout.lanes.map((lane) => [lane.label, lane.bars.length]), [["Status", 2], ["Sjekker feiler", 1]])
  const [first, second] = layout.lanes[0]?.bars ?? []
  assert.equal(first?.left, 0)
  assert.equal(first?.width, 0.5)
  assert.equal(second?.ongoing, true)
  assert.equal((second?.left ?? 0) + (second?.width ?? 0), 1)
  assert.equal(layout.now, 1)
  assert.ok(layout.ticks.length > 0 && layout.ticks.length <= 6)
})

test("axis ticks fall on whole hours in Oslo, and on a midnight the date", () => {
  const ticks = axisTicks(Date.parse("2026-11-19T20:10:00Z"), Date.parse("2026-11-20T08:00:00Z"))
  assert.deepEqual(ticks.map((tick) => tick.label), ["20. nov.", "03:00", "06:00", "09:00"])
})
