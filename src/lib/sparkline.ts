export interface SparklinePoint {
  x: number
  y: number
}

/** The fewest values that make a line worth drawing: with fewer, the number says it better. */
export const SPARKLINE_MIN = 3

/**
 * The points of a sparkline in a box of `width` by `height`, with `pad` kept round the edge so the end dot is not cut off. The line is scaled to its
 * own range, so it shows the shape and not the size (the number beside it says the size); a flat series is a line through the middle. Nothing for
 * fewer than `SPARKLINE_MIN` values or a value that is not a number.
 */
export function sparklinePoints(values: readonly number[], width: number, height: number, pad = 2): SparklinePoint[] | null {
  if (values.length < SPARKLINE_MIN || values.some((value) => !Number.isFinite(value))) return null
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min
  return values.map((value, index) => ({
    x: pad + (index / (values.length - 1)) * (width - 2 * pad),
    y: range === 0 ? height / 2 : pad + (1 - (value - min) / range) * (height - 2 * pad),
  }))
}
