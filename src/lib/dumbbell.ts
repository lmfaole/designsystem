export interface DumbbellRow {
  label: string
  from: number
  to: number
}

/** Rows ordered by the size of the change, the biggest first (up or down): the chart is read from the top, so the top is what moved most. Ties keep their order. */
export function sortByChange<T extends { from: number; to: number }>(rows: readonly T[]): T[] {
  return [...rows].sort((a, b) => Math.abs(b.to - b.from) - Math.abs(a.to - a.from))
}

/** Where a value stands on the shared axis, 0 to 100 percent; the axis is the same for every row, and a zero baseline is not forced since the dots show position, not length. */
export function axisPosition(value: number, min: number, max: number): number {
  return max === min ? 50 : ((value - min) / (max - min)) * 100
}

/** The axis range with a little air so no dot sits on the edge. */
export function axisRange(rows: readonly { from: number; to: number }[]): { min: number; max: number } {
  const values = rows.flatMap((row) => [row.from, row.to])
  const min = Math.min(...values)
  const max = Math.max(...values)
  const air = (max - min) * 0.04
  return { min: min - air, max: max + air }
}
