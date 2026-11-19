import { strict as assert } from "node:assert"
import { test } from "node:test"

import { pageWindow } from "./pagination.ts"

test("few pages are all shown", () => {
  assert.deepEqual(pageWindow(1, 1), [1])
  assert.deepEqual(pageWindow(2, 4), [1, 2, 3, 4])
  assert.deepEqual(pageWindow(1, 0), [])
})

test("many pages show the ends, the current and its neighbours, with a gap", () => {
  assert.deepEqual(pageWindow(1, 12), [1, 2, "gap", 12])
  assert.deepEqual(pageWindow(6, 12), [1, "gap", 5, 6, 7, "gap", 12])
  assert.deepEqual(pageWindow(12, 12), [1, "gap", 11, 12])
})

test("a gap of one page shows the page instead", () => {
  assert.deepEqual(pageWindow(4, 12), [1, 2, 3, 4, 5, "gap", 12])
})

test("a page outside the range is clamped", () => {
  assert.deepEqual(pageWindow(99, 5), [1, "gap", 4, 5])
})
