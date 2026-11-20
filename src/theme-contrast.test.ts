import { strict as assert } from "node:assert"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import { test } from "node:test"

import { GREY_STEPS, HEAT_SHADES, LINE_STEPS } from "./lib/chart-colors.ts"
import { CVD, contrast, distance, inGamut, onto, parseOklch, simulate, toLinear, type Oklch, type Rgb } from "./lib/colour.ts"

const css = readFileSync(join(import.meta.dirname, "theme.css"), "utf8")
// The tokens' dark block (the custom variant `dark` above it has a media query of the same words).
const DARK_AT = "@media (prefers-color-scheme: dark) {\n  :root"
const lightBlock = css.slice(css.indexOf(':root,\n[data-theme="light"] {\n    color-scheme: light'), css.indexOf(DARK_AT))
const FORCED_AT = '[data-theme="dark"] {'
const darkBlock = css.slice(css.indexOf(DARK_AT), css.indexOf(FORCED_AT))
const forcedBlock = css.slice(css.indexOf(FORCED_AT), css.indexOf("@layer base"))

const read = (block: string): Record<string, Oklch> =>
  Object.fromEntries([...block.matchAll(/--([a-z0-9-]+):\s*(oklch\([^)]*\))/g)].map((match) => [match[1] ?? "", parseOklch(match[2] ?? "")]))

const light = read(lightBlock)
// Dark redefines most tokens and inherits the rest (the chart ramp, the radius).
const dark = { ...light, ...read(darkBlock) }
const MODES = { light, dark } as const

test("the forced dark theme (Storybook's toolbar, the tests) is the device's dark theme, token for token", () => {
  assert.deepEqual(read(forcedBlock), read(darkBlock))
  assert.ok(css.includes(':root:not([data-theme="light"])'), "a forced light theme wins over a dark device")
})

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

/** The tinted button and badge of a destructive action: its text on its own colour at 10 % (light) or 20 % (dark) over the page (shadcn's `destructive` variant). */
const TINTED: Readonly<Record<string, number>> = { light: 0.1, dark: 0.2 }

for (const [mode, tokens] of Object.entries(MODES)) {
  test(`${mode}: the destructive text keeps 4.5:1 on its own tint`, () => {
    const page = surface(tokens, "background")
    const tint = onto({ ...token(tokens, "destructive"), a: TINTED[mode] ?? 0.1 }, page)
    const seen = contrast(onto(token(tokens, "destructive"), tint), tint)
    assert.ok(seen >= 4.5, `destructive on its tint: ${seen.toFixed(2)}; darken (light) or lighten (dark) --destructive`)
  })
}

/** Parts that carry meaning: 3:1 (WCAG 1.4.11): the focus ring, the edge of a field, an error edge, a chart series. */
const MARKS: readonly (readonly [string, string])[] = [
  ["ring", "background"],
  ["ring", "card"],
  ["muted-foreground", "background"],
  ["muted-foreground", "card"],
  ["destructive", "background"],
  ...[1, 2, 3, 4, 5, 6].flatMap((n): [string, string][] => [[`series-${n}`, "background"], [`series-${n}`, "card"]]),
  ...["temperature-warm", "temperature-cold", "precipitation"].flatMap((name): [string, string][] => [[name, "background"], [name, "card"]]),
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

const TRANSIT = ["bus", "tram", "metro", "rail", "ferry", "other"] as const

for (const [mode, tokens] of Object.entries(MODES)) {
  test(`${mode}: a line badge's text has 4.5:1 on its colour, the colour 3:1 on the page and the card (a time strip's dots), and a late time 4.5:1`, () => {
    const low: string[] = []
    for (const kind of TRANSIT) {
      const text = ratio(tokens, `transit-${kind}-foreground`, `transit-${kind}`)
      if (text < 4.5) low.push(`transit-${kind}-foreground on transit-${kind}: ${text.toFixed(2)}`)
      for (const background of ["background", "card"]) {
        const mark = ratio(tokens, `transit-${kind}`, background)
        if (mark < 3) low.push(`transit-${kind} on ${background}: ${mark.toFixed(2)}`)
      }
      if (!inGamut(token(tokens, `transit-${kind}`))) low.push(`transit-${kind} is outside sRGB`)
    }
    for (const background of ["background", "card"]) {
      const late = ratio(tokens, "transit-late", background)
      if (late < 4.5) low.push(`transit-late on ${background}: ${late.toFixed(2)}`)
    }
    if (!inGamut(token(tokens, "transit-late"))) low.push("transit-late is outside sRGB")
    assert.deepEqual(low, [], "darken or lighten the transit token in theme.css")
  })
}

for (const [mode, tokens] of Object.entries(MODES)) {
  test(`${mode}: every default chart step (the grey steps of a stack, the strengths of a line, the steps of a heat map) keeps 3:1 on the page and on the card`, () => {
    const low: string[] = []
    for (const share of new Set([...GREY_STEPS, ...LINE_STEPS, ...HEAT_SHADES])) {
      for (const background of ["background", "card"]) {
        const behind = surface(tokens, background)
        const seen = contrast(onto({ ...token(tokens, "foreground"), a: share / 100 }, behind), behind)
        if (seen < 3) low.push(`${share} % on ${background}: ${seen.toFixed(2)}`)
      }
    }
    assert.deepEqual(low, [], "a default step this light cannot be told from the page: use a darker one, or a series colour")
  })
}

test("the lightest steps that used to be defaults, and the chart ramp, are known to be weak, and the guides say so", () => {
  // 36 % and 24 % of the foreground, and `chart-1` on a light page, `chart-3` to `chart-5` on a dark one: marks are never told apart by these alone.
  const behind = surface(light, "background")
  assert.ok(contrast(onto({ ...token(light, "foreground"), a: 0.36 }, behind), behind) < 3)
  assert.ok(ratio(light, "chart-1", "background") < 3)
  assert.ok(ratio(dark, "chart-5", "background") < 3)
  const tokensMdx = readFileSync(join(import.meta.dirname, "..", "stories", "foundations", "tokens", "Tokens.mdx"), "utf8")
  assert.match(tokensMdx, /36 and 24 %/)
})
