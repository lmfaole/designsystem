import assert from "node:assert/strict"
import { test } from "node:test"

import { BRAND_MARKS, BRAND_NAMES } from "./brand-marks.ts"
import { ICONS } from "./icons.ts"

test("every mark has a name and a path, and none is in the icon register", () => {
  for (const [name, path] of Object.entries(BRAND_MARKS)) {
    assert.ok(path.startsWith("M"), name)
    assert.ok(BRAND_NAMES[name as keyof typeof BRAND_MARKS].length > 0, name)
    assert.ok(!(name in ICONS), `${name} is a mark, not a meaning`)
  }
})
