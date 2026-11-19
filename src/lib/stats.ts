/**
 * The statistics the distribution charts draw, as pure functions so a test can pin them. Quantiles are Hyndman and Fan's type 7 (the default of R,
 * NumPy and Excel), the box plot is Tukey's (whiskers to the last value within 1.5 × IQR of the box), and the histogram's bin width is Freedman and
 * Diaconis's `2 · IQR · n^(−1/3)`, which follows the data's spread and its size where a fixed count of bins does not.
 */

export function quantile(sorted: readonly number[], p: number): number {
  if (sorted.length === 0) return Number.NaN
  const position = (sorted.length - 1) * p
  const below = Math.floor(position)
  const lower = sorted[below] ?? 0
  const upper = sorted[Math.min(below + 1, sorted.length - 1)] ?? lower
  return lower + (upper - lower) * (position - below)
}

const finiteSorted = (values: readonly number[]): number[] => values.filter(Number.isFinite).sort((a, b) => a - b)

export interface FiveNumbers {
  n: number
  min: number
  q1: number
  median: number
  q3: number
  max: number
  whiskerLow: number
  whiskerHigh: number
  outliers: number[]
}

/** The summary of one box: quartiles, Tukey whiskers and the values beyond them. `null` with nothing to summarise. */
export function fiveNumbers(values: readonly number[]): FiveNumbers | null {
  const sorted = finiteSorted(values)
  if (sorted.length === 0) return null
  const q1 = quantile(sorted, 0.25)
  const q3 = quantile(sorted, 0.75)
  const fence = 1.5 * (q3 - q1)
  const inside = sorted.filter((value) => value >= q1 - fence && value <= q3 + fence)
  return {
    n: sorted.length,
    min: sorted[0] ?? 0,
    q1,
    median: quantile(sorted, 0.5),
    q3,
    max: sorted.at(-1) ?? 0,
    whiskerLow: inside[0] ?? q1,
    whiskerHigh: inside.at(-1) ?? q3,
    outliers: sorted.filter((value) => value < q1 - fence || value > q3 + fence),
  }
}

export interface Bin {
  from: number
  to: number
  count: number
}

/** The nearest «nice» step (1, 2 or 5 times a power of ten) at or above `raw`, so the edges are numbers a person would write. */
export function niceStep(raw: number): number {
  if (!(raw > 0)) return 1
  const power = 10 ** Math.floor(Math.log10(raw))
  const fraction = raw / power
  return (fraction <= 1 ? 1 : fraction <= 2 ? 2 : fraction <= 5 ? 5 : 10) * power
}

/** Bins of equal, nice width that cover the data; the last bin includes its upper edge. Five to thirty bins. */
export function histogramBins(values: readonly number[], binCount?: number): Bin[] {
  const sorted = finiteSorted(values)
  if (sorted.length === 0) return []
  const min = sorted[0] ?? 0
  const max = sorted.at(-1) ?? 0
  if (min === max) return [{ from: min, to: min, count: sorted.length }]
  const iqr = quantile(sorted, 0.75) - quantile(sorted, 0.25)
  const width = binCount === undefined ? (iqr > 0 ? 2 * iqr * sorted.length ** (-1 / 3) : (max - min) / Math.ceil(Math.log2(sorted.length) + 1)) : (max - min) / binCount
  const clamped = Math.min(Math.max(width, (max - min) / 30), (max - min) / 5)
  const step = niceStep(clamped)
  const start = Math.floor(min / step) * step
  const count = Math.max(1, Math.ceil((max - start) / step))
  const bins: Bin[] = Array.from({ length: count }, (_, index) => ({ from: start + index * step, to: start + (index + 1) * step, count: 0 }))
  for (const value of sorted) {
    const bin = bins[Math.min(count - 1, Math.floor((value - start) / step))]
    if (bin !== undefined) bin.count += 1
  }
  return bins
}

export interface LinearFit {
  slope: number
  intercept: number
  /** The share of the variation in y that the line explains, 0 to 1. */
  r2: number
  n: number
}

/** Least squares; `null` for fewer than three points or no spread in x, where a line says nothing. */
export function linearFit(points: readonly { x: number; y: number }[]): LinearFit | null {
  const n = points.length
  if (n < 3) return null
  const meanX = points.reduce((sum, point) => sum + point.x, 0) / n
  const meanY = points.reduce((sum, point) => sum + point.y, 0) / n
  let sxx = 0
  let sxy = 0
  let syy = 0
  for (const point of points) {
    sxx += (point.x - meanX) ** 2
    sxy += (point.x - meanX) * (point.y - meanY)
    syy += (point.y - meanY) ** 2
  }
  if (sxx === 0) return null
  const slope = sxy / sxx
  return { slope, intercept: meanY - slope * meanX, r2: syy === 0 ? 0 : (sxy * sxy) / (sxx * syy), n }
}

/** How strong a relation is, in words, from r² (Cohen's rough bands on r: 0.1, 0.3, 0.5). */
export function strengthWord(r2: number): string {
  const r = Math.sqrt(r2)
  return r < 0.1 ? "ingen tydelig sammenheng" : r < 0.3 ? "en svak sammenheng" : r < 0.5 ? "en middels sammenheng" : "en sterk sammenheng"
}
