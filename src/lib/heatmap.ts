/** The shared part of the two heat maps: which of a few steps a value falls in, and the weeks of a calendar. */

/** Steps in a heat map, besides «nothing». Four is what a person can tell apart and what keeps every step at 3:1 on the page. */
export const HEAT_STEPS = 4

/**
 * A function from a value to its step, 0 for nothing and 1 to `steps` for the rest. The limits are quantiles of the values above zero, not equal
 * ranges: one very busy day would otherwise put every other day in the palest step and the chart would say nothing.
 */
export function heatLevels(values: readonly number[], steps: number = HEAT_STEPS): (value: number | null | undefined) => number {
  const positive = values.filter((value) => Number.isFinite(value) && value > 0).sort((a, b) => a - b)
  const limits = Array.from({ length: steps - 1 }, (_, index) => {
    const position = ((index + 1) / steps) * (positive.length - 1)
    return positive[Math.round(position)] ?? 0
  })
  return (value) => {
    if (value === null || value === undefined || !(value > 0)) return 0
    const above = limits.filter((limit) => value > limit).length
    return Math.min(steps, above + 1)
  }
}

export interface CalendarDay {
  /** `YYYY-MM-DD`. */
  date: string
  value: number
}

export interface CalendarCell {
  date: string
  /** `null` for a day inside the range with no row: it is nothing, not zero. */
  value: number | null
  level: number
}

export interface CalendarWeek {
  /** Monday first, seven slots; `null` before the first and after the last day. */
  days: (CalendarCell | null)[]
  /** The month's short name when a new month starts in this week, for the label above the column. */
  month: string | null
}

const DAY = 86_400_000
const parse = (date: string): number => Date.parse(`${date}T00:00:00Z`)
const MONTHS = ["jan.", "feb.", "mars", "apr.", "mai", "juni", "juli", "aug.", "sep.", "okt.", "nov.", "des."]

/** The weeks from the first to the last date given, Monday to Sunday (the Norwegian week), each day with its step. */
export function calendarWeeks(days: readonly CalendarDay[]): CalendarWeek[] {
  if (days.length === 0) return []
  const byDate = new Map(days.map((day) => [day.date, day.value]))
  const times = days.map((day) => parse(day.date)).filter(Number.isFinite)
  if (times.length === 0) return []
  const first = Math.min(...times)
  const last = Math.max(...times)
  const level = heatLevels(days.map((day) => day.value))
  const mondayOffset = (new Date(first).getUTCDay() + 6) % 7
  const weeks: CalendarWeek[] = []
  let previousMonth = -1
  for (let week = first - mondayOffset * DAY; week <= last; week += 7 * DAY) {
    const slots: (CalendarCell | null)[] = []
    let month: string | null = null
    for (let index = 0; index < 7; index++) {
      const time = week + index * DAY
      if (time < first || time > last) {
        slots.push(null)
        continue
      }
      const date = new Date(time).toISOString().slice(0, 10)
      const value = byDate.get(date) ?? null
      slots.push({ date, value, level: level(value) })
      const monthIndex = new Date(time).getUTCMonth()
      if (monthIndex !== previousMonth && new Date(time).getUTCDate() <= 7 && month === null) month = MONTHS[monthIndex] ?? null
      previousMonth = monthIndex
    }
    weeks.push({ days: slots, month })
  }
  return weeks
}

/** The calendar's table: one row per month with its sum and the number of days that had anything, since a row for each of 365 days is not a table to read. */
export function monthRows(days: readonly CalendarDay[]): (string | number)[][] {
  const months = new Map<string, { sum: number; active: number }>()
  for (const day of [...days].sort((a, b) => a.date.localeCompare(b.date))) {
    const key = day.date.slice(0, 7)
    const month = months.get(key) ?? { sum: 0, active: 0 }
    month.sum += day.value
    if (day.value > 0) month.active += 1
    months.set(key, month)
  }
  return [...months].map(([key, month]) => [`${MONTHS[Number(key.slice(5, 7)) - 1] ?? key} ${key.slice(0, 4)}`, month.sum, month.active])
}

/** A date as «12. mars», for a tooltip and a summary. */
export function dayName(date: string): string {
  const time = new Date(`${date}T00:00:00Z`)
  return `${time.getUTCDate()}. ${MONTHS[time.getUTCMonth()] ?? ""}`.trim()
}
