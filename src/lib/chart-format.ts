const NUMBER = new Intl.NumberFormat("nb-NO", { maximumFractionDigits: 2 })

/**
 * A value as a chart says it, in a tooltip, a table or a label: Norwegian grouping and decimal comma, and a real minus (U+2212). The locale is named,
 * never the runtime's, so the server and the browser agree and a tooltip agrees with the table.
 */
export function formatChartValue(value: number): string {
  return NUMBER.format(value)
}

/** What a chart says when it has nothing to draw: it says why, never a blank. */
export const EMPTY_CHART_MESSAGE = "Ingen data i denne perioden."
