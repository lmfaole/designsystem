import assert from "node:assert/strict"
import { test } from "node:test"

import { FULL, LOW, measure, nextQuality, REDUCED, START, WINDOW } from "./gl-quality.ts"

test("a verdict comes after a window of frames, as their average", () => {
  let meter = START
  let verdict: number | null = null
  for (let i = 0; i < WINDOW; i += 1) {
    const step = measure(meter, 20)
    meter = step.meter
    verdict = step.average
    if (i < WINDOW - 1) assert.equal(verdict, null)
  }
  assert.equal(verdict, 20)
  assert.deepEqual(meter, START)
})

test("a pause is not a slow frame", () => {
  assert.deepEqual(measure(START, 5000), { meter: START, average: null })
  assert.deepEqual(measure(START, 0), { meter: START, average: null })
  assert.deepEqual(measure(START, Number.NaN), { meter: START, average: null })
})

test("a machine that cannot keep up is asked for less, in steps, and never for more again", () => {
  assert.equal(nextQuality(FULL, 16), FULL)
  assert.equal(nextQuality(FULL, 40), REDUCED)
  assert.equal(nextQuality(REDUCED, 40), LOW)
  assert.equal(nextQuality(LOW, 40), LOW)
  assert.equal(nextQuality(REDUCED, 10), REDUCED)
})
