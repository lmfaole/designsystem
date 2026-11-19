import { strict as assert } from "node:assert"
import { test } from "node:test"

import { describeFreshness } from "./freshness.ts"

const at = "2026-11-19T18:27:00Z"

test("the clock is Oslo time", () => {
  assert.equal(describeFreshness(at, new Date("2026-11-19T18:28:00Z"), 180)?.clock, "19:27")
})

test("data is stale when it is older than the threshold", () => {
  assert.equal(describeFreshness(at, new Date("2026-11-19T18:29:00Z"), 180)?.stale, false)
  assert.equal(describeFreshness(at, new Date("2026-11-19T18:31:01Z"), 180)?.stale, true)
})

test("a time in the future is not negative, and a non-time is nothing", () => {
  assert.equal(describeFreshness(at, new Date("2026-11-19T18:00:00Z"), 180)?.age, 0)
  assert.equal(describeFreshness("nå", new Date(), 180), null)
})
