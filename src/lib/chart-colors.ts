/**
 * The default colours of a chart that is not given its own: the foreground at falling strength, laid over the page. Each step keeps 3:1
 * against the page and the card in light and dark (`theme-contrast.test.ts` checks it); a step lighter than the last of these does not, which is
 * why a stack has three grey steps and the fourth series on takes a `series-*` colour.
 */
export const GREY_STEPS = [100, 66, 44] as const

/** The steps of a line: the dashes tell the lines apart, the strength only has to stay visible. */
export const LINE_STEPS = [100, 72, 52, 44] as const

export const greyStep = (share: number): string => `color-mix(in oklab, var(--foreground) ${share}%, transparent)`

/** The colour of the nth series (from 0) when the page gave none: a grey step while there are steps, then `series-4` and on (the last is reused). */
export function defaultSeriesColor(index: number): string {
  const share = GREY_STEPS[index]
  return share === undefined ? `var(--series-${Math.min(index + 1, 6)})` : greyStep(share)
}

/** The strengths of the four heat steps: the lightest keeps 3:1 against the page like the other default steps, and no step is told apart by colour alone (a title, the table and the numbers say it). */
export const HEAT_SHADES = [44, 60, 80, 100] as const

/** The fill of a heat step; 0 is nothing and has no fill, only a faint edge. */
export const heatColour = (level: number): string | undefined => {
  const share = HEAT_SHADES[level - 1]
  return share === undefined ? undefined : greyStep(share)
}
