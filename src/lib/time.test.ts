import { strict as assert } from "node:assert"
import { test } from "node:test"

import { describeTime } from "./time.ts"

const now = new Date("2026-11-19T12:00:00Z")

test("a recent time is told relative to now, in Norwegian", () => {
  assert.equal(describeTime("2026-11-19T11:59:50Z", now)?.text, "nå")
  assert.match(describeTime("2026-11-19T11:55:00Z", now)?.text ?? "", /5 minutter siden/)
  assert.match(describeTime("2026-11-19T09:00:00Z", now)?.text ?? "", /3 timer siden/)
  assert.equal(describeTime("2026-11-18T12:00:00Z", now)?.text, "i går")
  assert.match(describeTime("2026-11-19T14:00:00Z", now)?.text ?? "", /om 2 timer/)
})

test("an older time is a date, and the exact time is always there", () => {
  const old = describeTime("2026-11-02T10:30:00Z", now)
  assert.match(old?.text ?? "", /2\. nov\.? 2026/)
  assert.match(old?.exact ?? "", /11:30/)
  assert.equal(old?.iso, "2026-11-02T10:30:00.000Z")
})

test("the format can be forced", () => {
  assert.match(describeTime("2026-11-19T11:55:00Z", now, "date")?.text ?? "", /19\. nov/)
  assert.match(describeTime("2026-11-02T10:30:00Z", now, "relative")?.text ?? "", /siden/)
  assert.match(describeTime("2026-11-19T11:55:00Z", now, "datetime")?.text ?? "", /12:55/)
})

test("something that is not a time is nothing", () => {
  assert.equal(describeTime("i dag", now), null)
})
