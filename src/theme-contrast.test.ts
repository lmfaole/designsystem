import { strict as assert } from "node:assert"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import { test } from "node:test"

import { CVD, contrast, distance, inGamut, onto, parseOklch, simulate, toLinear, type Oklch, type Rgb } from "./lib/colour.ts"

const css = readFileSync(join(import.meta.dirname, "theme.css"), "utf8")
const DARK_AT = "@media (prefers-color-scheme: dark) {"
const lightBlock = css.slice(css.indexOf(":root {\n    color-scheme: light"), css.indexOf(DARK_AT))
const darkBlock = css.slice(css.indexOf(DARK_AT))

const read = (block: string): Record<string, Oklch> =>
  Object.fromEntries([...block.matchAll(/--([a-z0-9-]+):\s*(oklch\([^)]*\))/g)].map((match) => [match[1] ?? "", parseOklch(match[2] ?? "")]))

const light = read(lightBlock)
// Dark redefines most tokens and inherits the rest (the chart ramp, the radius).
const dark = { ...light, ...read(darkBlock) }
const MODES = { light, dark } as const

const token = (tokens: Record<string, Oklch>, name: string): Oklch => {
  const found = tokens[name]
  assert.ok(found !== undefined, `--${name} is not in theme.css`)
  return found
}
const surface = (tokens: Record<string, Oklch>, name: string): Rgb => toLinear(token(tokens, name))
/** The contrast of a token laid over a surface (a token with alpha is blended with it). */
const ratio = (tokens: Record<string, Oklch>, foreground: string, background: string): number => contrast(onto(token(tokens, foreground), surface(tokens, background)), surface(tokens, background))

/** Text: 4.5:1 (WCAG 1.4.3). Each is a pair a component really sets. */
const TEXT: readonly (readonly [string, string])[] = [
  ["foreground", "background"],
  ["foreground", "card"],
  ["card-foreground", "card"],
  ["popover-foreground", "popover"],
  ["primary-foreground", "primary"],
  ["secondary-foreground", "secondary"],
  ["accent-foreground", "accent"],
  ["muted-foreground", "background"],
  ["muted-foreground", "card"],
  ["muted-foreground", "muted"],
  ["destructive", "background"],
  ["destructive", "card"],
]

/** Parts that carry meaning: 3:1 (WCAG 1.4.11): the focus ring, the edge of a field, an error edge, a chart series. */
const MARKS: readonly (readonly [string, string])[] = [
  ["ring", "background"],
  ["ring", "card"],
  ["muted-foreground", "background"],
  ["muted-foreground", "card"],
  ["destructive", "background"],
  ...[1, 2, 3, 4, 5, 6].flatMap((n): [string, string][] => [[`series-${n}`, "background"], [`series-${n}`, "card"]]),
]

for (const [mode, tokens] of Object.entries(MODES)) {
  test(`${mode}: every text pair has 4.5:1`, () => {
    const low = TEXT.filter(([foreground, background]) => ratio(tokens, foreground, background) < 4.5).map(([foreground, background]) => `${foreground} on ${background}: ${ratio(tokens, foreground, background).toFixed(2)}`)
    assert.deepEqual(low, [], "darken or lighten the token in theme.css, and update the table in Tokens / Overview")
  })

  test(`${mode}: every mark that carries meaning has 3:1`, () => {
    const low = MARKS.filter(([foreground, background]) => ratio(tokens, foreground, background) < 3).map(([foreground, background]) => `${foreground} on ${background}: ${ratio(tokens, foreground, background).toFixed(2)}`)
    assert.deepEqual(low, [], "a series, a ring or an edge that is too weak to see")
  })

  test(`${mode}: the lines between parts are decorative and never the only edge of something`, () => {
    // If one of these ever reaches 3:1 the guide can say so; until then a control takes its edge from `muted-foreground`.
    for (const name of ["border", "input"]) assert.ok(ratio(tokens, name, "background") < 3, `--${name} reaches 3:1: update the guide «Colour and state» and let it be a control's edge`)
  })

  test(`${mode}: the chart series are told apart in normal vision and in each kind of colour-vision deficiency`, () => {
    const series = [1, 2, 3, 4, 5, 6].map((n) => surface(tokens, `series-${n}`))
    const weak: string[] = []
    for (const [kind, matrix] of [["normal", null], ["protan", CVD.protan], ["deutan", CVD.deutan], ["tritan", CVD.tritan]] as const) {
      for (let i = 0; i < series.length; i++) {
        for (let j = i + 1; j < series.length; j++) {
          const a = series[i] ?? [0, 0, 0] as Rgb
          const b = series[j] ?? [0, 0, 0] as Rgb
          const apart = distance(matrix === null ? a : simulate(a, matrix), matrix === null ? b : simulate(b, matrix))
          if (apart < 8) weak.push(`series-${i + 1} and series-${j + 1} (${kind}): ${apart.toFixed(1)}`)
        }
      }
    }
    assert.deepEqual(weak, [], "change the lightness or hue of one of them (oklab distance, times 100, of at least 8)")
  })

  test(`${mode}: the series are inside the sRGB gamut, so a browser shows them as written`, () => {
    assert.deepEqual([1, 2, 3, 4, 5, 6].filter((n) => !inGamut(token(tokens, `series-${n}`))), [])
  })
}

test("the chart ramp and the lightest default steps are known to be weak, and the guides say so", () => {
  // `chart-1` is 1.5:1 on a light page and `chart-3` to `chart-5` are weak on a dark one: marks are never told apart by these alone.
  assert.ok(ratio(light, "chart-1", "background") < 3)
  assert.ok(ratio(dark, "chart-5", "background") < 3)
  const tokensMdx = readFileSync(join(import.meta.dirname, "..", "stories", "tokens", "Tokens.mdx"), "utf8")
  assert.match(tokensMdx, /two lightest default steps/)
})
