import { strict as assert } from "node:assert"
import { test } from "node:test"

import { clock, countdown, delayMinutes, delayText, departureLabel, groupDepartures, leaveIn, minutesUntil, shownDelay, stopMeta, stripPosition, stripTicks, walkStatus, type BoardDeparture } from "./departures.ts"

const now = Date.parse("2026-11-20T13:00:00Z")
const at = (minutes: number) => new Date(now + minutes * 60_000).toISOString()
const bus = (key: string, minutes: number, extra: Partial<BoardDeparture> = {}): BoardDeparture => ({ key, line: "31", mode: "bus", destination: "Tonsenhagen", expected: at(minutes), realtime: true, ...extra })

test("minutes until a departure are rounded down, and under one minute it is «nå»", () => {
  assert.equal(minutesUntil(at(3.9), now), 3)
  assert.equal(countdown(minutesUntil(at(0.98), now)), "nå")
  assert.equal(countdown(4), "4 min")
})

test("the label is a count while near and in real time, else the Oslo clock", () => {
  assert.equal(clock("2026-11-20T13:32:00Z"), "14:32")
  assert.equal(departureLabel(19, true, at(19)), "19 min")
  assert.equal(departureLabel(20, true, at(20)), "14:20")
  assert.equal(departureLabel(3, false, at(3)), "14:03")
})

test("a delay shows from two minutes late or one minute early, with its sign", () => {
  assert.equal(delayMinutes(at(5), at(2)), 3)
  assert.equal(delayMinutes(at(5), undefined), 0)
  assert.deepEqual([-1, 0, 1, 2].map(shownDelay), [true, false, false, true])
  assert.equal(delayText(3), "+3 min")
  assert.equal(delayText(-1), "−1 min")
})

test("the walk: leave now with 0–1 minutes to spare, later with more, and not at all when it cannot be reached", () => {
  assert.equal(leaveIn(9, 4), 5)
  assert.deepEqual(walkStatus(1), { kind: "now", text: "Gå nå" })
  assert.deepEqual(walkStatus(5), { kind: "later", text: "Gå om 5 min" })
  assert.equal(walkStatus(-1).kind, "missed")
  assert.equal(walkStatus(null).text, "Rekker ikke")
})

test("the strip places a departure from now to the end of its window, and marks its ticks", () => {
  assert.equal(stripPosition(15, 60), 0.25)
  assert.equal(stripPosition(-0.5, 60), 0)
  assert.equal(stripPosition(61, 60), null)
  assert.deepEqual(stripTicks(60), [15, 30, 45])
  assert.deepEqual(stripTicks(30), [10, 20])
  assert.deepEqual(stripTicks(120), [30, 60, 90])
})

test("departures are grouped by line and destination, in time order, gone ones and non-times left out", () => {
  const groups = groupDepartures([bus("a", 12), bus("b", 2), bus("c", 6, { destination: "Snarøya" }), bus("d", -3), bus("e", 1, { expected: "snart" })], now)
  assert.deepEqual(groups.map((group) => [group.destination, group.departures.map((departure) => departure.key)]), [["Tonsenhagen", ["b", "a"]], ["Snarøya", ["c"]]])
  assert.equal(groups[0]?.departures[0]?.label, "2 min")
  assert.equal(groups[0]?.walk, null)
})

test("with a walk, groups are ordered by the next departure you can catch, and those you cannot come last", () => {
  const groups = groupDepartures([bus("near", 2, { line: "20", destination: "Skøyen" }), bus("near-later", 15, { line: "20", destination: "Skøyen" }), bus("mid", 8), bus("gone", 1, { line: "54", destination: "Kjelsås" }), bus("off", 9, { line: "37", destination: "Helsfyr", cancelled: true })], now, { walkMinutes: 5 })
  assert.deepEqual(groups.map((group) => group.line), ["31", "20", "54", "37"])
  assert.deepEqual(groups.map((group) => group.walk?.text), ["Gå om 3 min", "Gå om 10 min", "Rekker ikke", "Rekker ikke"])
  assert.equal(groups[1]?.departures[0]?.reachable, false)
  assert.equal(groups.length, 4)
  assert.equal(groupDepartures([bus("a", 2), bus("b", 3, { destination: "X" })], now, { limit: 1 }).length, 1)
})

test("a group's notices are each said once", () => {
  const [group] = groupDepartures([bus("a", 2, { notice: "Omkjøring" }), bus("b", 9, { notice: "Omkjøring" })], now)
  assert.deepEqual(group?.notices, ["Omkjøring"])
})

test("the stop's walk and distance", () => {
  assert.equal(stopMeta(4, 248), "4 min å gå · 250 m")
  assert.equal(stopMeta(undefined, 1240), "1,2 km")
  assert.equal(stopMeta(undefined, undefined), "")
})
