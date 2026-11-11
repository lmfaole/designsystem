import { strict as assert } from "node:assert"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import { test } from "node:test"

const motion = readFileSync(join(import.meta.dirname, "motion.css"), "utf8")

test("an entrance moves and never fades", () => {
  const rise = motion.match(/@keyframes motion-rise \{([^}]*\{[^}]*\}[^}]*)\}/)?.[1] ?? ""
  assert.match(rise, /transform/)
  assert.doesNotMatch(rise, /opacity/)
})
