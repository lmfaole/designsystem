export interface DonutInput {
  label: string
  value: number
  /** A CSS colour for this item; without one it takes its place in the tinted ramp. */
  color?: string
}

export interface DonutSlice {
  label: string
  value: number
  /** 0–1 of the donut's total. */
  share: number
  /** Where the slice starts and ends round the ring, 0–1. */
  start: number
  end: number
  /** The slice that gathers everything past `keep`. */
  other: boolean
  /** The item's own colour, when it brought one. */
  color?: string
}

/**
 * The biggest `keep` items as slices, the rest gathered in one «Other», each
 * with where it sits round the ring. Zero and negative values are dropped, and
 * nothing at all gives no slices.
 */
export function donutSlices(items: readonly DonutInput[], keep = 5, otherLabel = "Andre"): DonutSlice[] {
  const positive = items.filter((item) => item.value > 0).toSorted((a, b) => b.value - a.value)
  const total = positive.reduce((sum, item) => sum + item.value, 0)
  if (total === 0) return []

  const head = positive.slice(0, keep)
  const rest = positive.slice(keep).reduce((sum, item) => sum + item.value, 0)
  const parts: { label: string; value: number; other: boolean; color?: string }[] =
    rest > 0 ? [...head.map((item) => ({ ...item, other: false })), { label: otherLabel, value: rest, other: true }] : head.map((item) => ({ ...item, other: false }))

  let start = 0
  return parts.map((part) => {
    const share = part.value / total
    const slice: DonutSlice = { label: part.label, value: part.value, share, start, end: start + share, other: part.other, ...(part.color === undefined ? {} : { color: part.color }) }
    start += share
    return slice
  })
}

/**
 * A slice's colour: the donut's base colour (`--donut-base`, the theme's
 * primary unless a page sets it) fading toward the page's muted tone down the
 * ranking, and a plain muted tone for «Other».
 */
export function sliceColor(index: number, count: number, other: boolean, own?: string): string {
  if (own !== undefined) return own
  if (other) return "color-mix(in oklch, var(--muted-foreground) 45%, var(--background))"
  const steps = Math.max(1, count - 1)
  const strength = 100 - Math.round((index / steps) * 60)
  return `color-mix(in oklch, var(--donut-base, var(--primary)) ${strength}%, var(--background))`
}

/** A `conic-gradient` for the slices, hard-edged where one ends and the next starts. */
export function donutGradient(slices: readonly DonutSlice[]): string {
  if (slices.length === 0) return "none"
  const stops = slices.map((slice, index) => {
    const color = sliceColor(index, slices.length, slice.other, slice.color)
    return `${color} ${(slice.start * 100).toFixed(3)}% ${(slice.end * 100).toFixed(3)}%`
  })
  return `conic-gradient(from 0deg, ${stops.join(", ")})`
}
