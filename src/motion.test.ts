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

test("no animation of the system loops for ever (WCAG 2.2.2: a loop stops within five seconds), but the disc of a record playing now", () => {
  const theme = readFileSync(join(import.meta.dirname, "theme.css"), "utf8")
  const withoutDisc = motion.replace(/\.motion-disc \{[^}]*\}/, "")
  for (const css of [withoutDisc, theme]) assert.doesNotMatch(css, /\binfinite\b/)
  assert.match(motion, /\.motion-disc \{[^}]*infinite/)
  const reduced = motion.slice(motion.indexOf("@media (prefers-reduced-motion: reduce)"))
  assert.match(reduced, /\.motion-disc[^{]*\{\s*animation: none/)
})

test("every duration token lands at once under reduced motion", () => {
  const reduced = motion.slice(motion.indexOf("@media (prefers-reduced-motion: reduce)"))
  const durations = [...motion.matchAll(/^\s*(--motion-duration-[a-z]+): (?!var\()/gm)].map((match) => match[1] ?? "")
  assert.ok(durations.length >= 8)
  const missing = durations.filter((name) => !new RegExp(`${name}: 0\\.01ms`).test(reduced))
  assert.deepEqual(missing, [])
})
