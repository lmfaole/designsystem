import type { ReactNode } from "react"

import type { IconName } from "./icons"

/** The colour of a node or a bar. It is never the only cue: the icon and the words say the same. */
export type TimelineTone = "neutral" | "accent" | "success" | "warning" | "danger"

export interface TimelineActor {
  name: string
  avatar?: string
  href?: string
}

export interface TimelineEvent {
  /** Stable: the anchor (`id`) of the item, for a permalink. */
  id: string
  /** When it happened (ISO). */
  at: string
  /** `comment`: the full item, with its body in a bordered box. `event`: one condensed line on the rail. */
  kind: "comment" | "event"
  icon: IconName
  /** Colours the node; never the only cue. */
  tone?: TimelineTone
  actor?: TimelineActor
  /** The short action after the actor: «godkjente», «la til etiketten bug», «spilte». */
  summary: string
  /** An emphasised object after the action: a commit message, a track's title. */
  target?: { label: string; href?: string }
  /** A comment's body (the app renders the Markdown). */
  body?: ReactNode
  /** The event where it lives (on GitHub, say): the time links to it. */
  href?: string
  /** Consecutive events with the same key fold into one disclosure when there are more than `collapseAfter`. */
  group?: string
  /** What the folded events are called («spor»), where the group key is dynamic («album:123»). Wins over `groupNouns`. */
  groupNoun?: string
  /** One word beside it: «Svar», «Innstilt». */
  badge?: string
  /** Still going on («spiller nå»): a live dot and «nå» in place of the time since it began. */
  ongoing?: boolean
}

export interface StateStep {
  /** «Åpnet», «Review», «Godkjent», «Merget». */
  label: string
  /** When it was reached (ISO); none, and it has not been. */
  at?: string
  state: "done" | "current" | "upcoming" | "failed" | "skipped"
  icon?: IconName
}

export interface DurationSpan {
  key: string
  /** «Venter på review», «Endringer etterspurt». */
  label: string
  start: string
  /** None: it goes on until now. */
  end?: string
  tone?: TimelineTone
  /** A lane: spans with the same row share it. None, and the span has a lane of its own, named by its label. */
  row?: string
}

const ZONE = "Europe/Oslo"
const MINUTE = 60_000
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

/**
 * A length of time, short: «under 1 min», «12 min», «3 t», «2 d», «3 u», «4 mnd». Each unit takes over where the one below
 * it would reach the next (60 min is «1 t», 24 t is «1 d»), so a value is never «60 min» or «24 t».
 */
export function formatDuration(ms: number): string {
  const value = Math.max(0, ms)
  const minutes = Math.round(value / MINUTE)
  if (minutes < 1) return "under 1 min"
  if (minutes < 60) return `${minutes} min`
  const hours = Math.round(value / HOUR)
  if (hours < 24) return `${hours} t`
  const days = Math.round(value / DAY)
  if (days < 14) return `${days} d`
  const weeks = Math.round(days / 7)
  if (weeks < 9) return `${weeks} u`
  return `${Math.round(days / 30.44)} mnd`
}

const dayParts = new Intl.DateTimeFormat("en-CA", { timeZone: ZONE, year: "numeric", month: "2-digit", day: "2-digit" })
const WEEKDAYS = ["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"] as const
const MONTHS = ["januar", "februar", "mars", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "desember"] as const
const shortDate = new Intl.DateTimeFormat("nb-NO", { timeZone: ZONE, day: "numeric", month: "short" })
const clock = new Intl.DateTimeFormat("nb-NO", { timeZone: ZONE, hour: "2-digit", minute: "2-digit" })
const dateClock = new Intl.DateTimeFormat("nb-NO", { timeZone: ZONE, day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })
const offsetName = new Intl.DateTimeFormat("en-US", { timeZone: ZONE, timeZoneName: "longOffset" })

/** The day in Oslo of a time, as `2026-11-20`; empty for what is not a time. */
export function dayKey(iso: string): string {
  const at = Date.parse(iso)
  return Number.isNaN(at) ? "" : dayParts.format(at)
}

const daysApart = (a: string, b: string): number => Math.round((Date.parse(`${a}T00:00:00Z`) - Date.parse(`${b}T00:00:00Z`)) / DAY)

/** The full date of a day: «fredag 20. november», with the year when it is not this year's. Spelt out here, not by `Intl`, whose long dates differ between runtimes. */
export function dayDate(iso: string, now: string): string {
  const day = dayKey(iso)
  if (day === "") return ""
  const year = Number(day.slice(0, 4))
  const month = Number(day.slice(5, 7))
  const date = Number(day.slice(8, 10))
  const text = `${WEEKDAYS[new Date(Date.UTC(year, month - 1, date)).getUTCDay()] ?? ""} ${date}. ${MONTHS[month - 1] ?? ""}`
  return day.slice(0, 4) === dayKey(now).slice(0, 4) ? text : `${text} ${year}`
}

/** A day's heading: «I dag», «I går», «I morgen», else the date («Torsdag 19. november», with the year when it is another year). */
export function dayLabel(iso: string, now: string): string {
  const day = dayKey(iso)
  if (day === "") return ""
  const apart = daysApart(day, dayKey(now))
  if (apart === 0) return "I dag"
  if (apart === -1) return "I går"
  if (apart === 1) return "I morgen"
  const text = dayDate(iso, now)
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export interface TimelineDay<T extends { at: string }> {
  /** `2026-11-20`. */
  key: string
  label: string
  /** The full date, when the label is a word («I dag»); else empty. */
  date: string
  events: T[]
}

/** Events in order, in runs of the same day in Oslo: a day's heading over each run. */
export function groupByDay<T extends { at: string }>(events: readonly T[], now: string): TimelineDay<T>[] {
  const days: TimelineDay<T>[] = []
  for (const event of events) {
    const key = dayKey(event.at)
    const last = days.at(-1)
    if (last !== undefined && last.key === key) last.events.push(event)
    else {
      const label = dayLabel(event.at, now)
      const full = dayDate(event.at, now)
      days.push({ key, label, date: label.toLowerCase() === full.toLowerCase() ? "" : full, events: [event] })
    }
  }
  return days
}

/** A lone event, or a run of events of one group with the first shown and the rest folded away. */
export type TimelineItem<T> = { kind: "single"; event: T } | { kind: "run"; group: string; noun: string; shown: T[]; hidden: T[] }

/** What a group's folded events are called: the event's own `groupNoun`, then the page's `groupNouns`, then «hendelser». */
export function groupNounOf(event: Pick<TimelineEvent, "group" | "groupNoun">, nouns: Readonly<Record<string, string>> = {}): string {
  return event.groupNoun ?? (event.group === undefined ? undefined : nouns[event.group]) ?? "hendelser"
}

/**
 * Folds the noise: consecutive events with the same `group`, more than `collapseAfter` of them, become one run that shows its first
 * event and folds the rest behind «Vis 7 commits til». A shorter run, and events with no group, stay as they are. Give it one day's
 * events at a time, so a run never crosses a day's heading.
 */
export function collapseRuns<T extends Pick<TimelineEvent, "group" | "groupNoun">>(events: readonly T[], collapseAfter: number, nouns: Readonly<Record<string, string>> = {}): TimelineItem<T>[] {
  const items: TimelineItem<T>[] = []
  let index = 0
  while (index < events.length) {
    const first = events[index]
    if (first === undefined) break
    let end = index + 1
    if (first.group !== undefined) while (end < events.length && events[end]?.group === first.group) end++
    const run = events.slice(index, end)
    if (first.group !== undefined && run.length > Math.max(1, collapseAfter)) items.push({ kind: "run", group: first.group, noun: groupNounOf(first, nouns), shown: run.slice(0, 1), hidden: run.slice(1) })
    else for (const event of run) items.push({ kind: "single", event })
    index = end
  }
  return items
}

/** The events in the order they are shown: newest first (`desc`) or oldest first; a time that cannot be read goes last. */
export function sortEvents<T extends { at: string }>(events: readonly T[], order: "asc" | "desc" = "desc"): T[] {
  const time = (event: T) => {
    const at = Date.parse(event.at)
    return Number.isNaN(at) ? null : at
  }
  return events.toSorted((a, b) => {
    const x = time(a)
    const y = time(b)
    if (x === null || y === null) return x === y ? 0 : x === null ? 1 : -1
    return order === "desc" ? y - x : x - y
  })
}

/**
 * The time spent in each step: from when it was reached to when the next one was, or to `now` for the current step. `null` for a step
 * not reached, and for the last reached step when it is not the current one (a merged pull request is not «in» merged).
 */
export function durationsBetween(steps: readonly Pick<StateStep, "at" | "state">[], now: string): (number | null)[] {
  return steps.map((step, index) => {
    const from = step.at === undefined ? Number.NaN : Date.parse(step.at)
    if (Number.isNaN(from)) return null
    if (step.state === "current") return Math.max(0, Date.parse(now) - from)
    const next = steps.slice(index + 1).find((later) => later.at !== undefined && !Number.isNaN(Date.parse(later.at)))
    return next?.at === undefined ? null : Math.max(0, Date.parse(next.at) - from)
  })
}

/** A span's times as words: «19. nov., 14:00–20. nov., 09:12», the clock alone for the end on the same day, «fra …» for one that goes on. */
export function spanText(start: string, end: string | undefined): string {
  const from = dateClock.format(Date.parse(start))
  if (end === undefined) return `fra ${from}`
  const to = dayKey(start) === dayKey(end) ? clock.format(Date.parse(end)) : dateClock.format(Date.parse(end))
  return `${from}–${to}`
}

export interface DurationBar {
  span: DurationSpan
  /** From the left edge of the axis, 0 to 1. */
  left: number
  width: number
  ms: number
  ongoing: boolean
}

export interface DurationLane {
  key: string
  label: string
  /** The lane is a named row (`row`): its bars carry their own labels. */
  named: boolean
  bars: DurationBar[]
}

export interface DurationLayout {
  from: number
  to: number
  lanes: DurationLane[]
  ticks: { at: number; position: number; label: string }[]
  /** Where now is on the axis, when it is on it. */
  now: number | null
}

const STEPS = [HOUR, 3 * HOUR, 6 * HOUR, 12 * HOUR, DAY, 2 * DAY, 7 * DAY, 14 * DAY, 28 * DAY, 91 * DAY]

/** How far Oslo is ahead of UTC at a moment, in milliseconds. */
function osloOffset(at: number): number {
  const name = offsetName.formatToParts(at).find((part) => part.type === "timeZoneName")?.value ?? "GMT"
  const match = /GMT([+-])(\d{2}):(\d{2})/.exec(name)
  if (match === null) return 0
  return (match[1] === "-" ? -1 : 1) * (Number(match[2]) * 60 + Number(match[3])) * MINUTE
}

/** At most `most` round ticks on an axis, at whole hours or midnights in Oslo: the clock, or the date at a midnight. */
export function axisTicks(from: number, to: number, most = 6): { at: number; label: string }[] {
  if (!(to > from) || !Number.isFinite(to - from)) return []
  const step = STEPS.find((candidate) => (to - from) / candidate <= most) ?? 91 * DAY
  const offset = osloOffset(from)
  const ticks: { at: number; label: string }[] = []
  for (let at = Math.ceil((from + offset) / step) * step - offset; at <= to; at += step) ticks.push({ at, label: step >= DAY || clock.format(at) === "00:00" ? shortDate.format(at) : clock.format(at) })
  return ticks
}

/**
 * The spans on one time axis: from `start` (or the earliest span) to `end` (or the latest end, or now for one that goes on), a lane per
 * `row` (or per span with none), each bar placed as a share of the axis.
 */
export function layoutDurations(spans: readonly DurationSpan[], now: string, start?: string, end?: string): DurationLayout {
  const nowAt = Date.parse(now)
  const begin = (span: DurationSpan) => Date.parse(span.start)
  const finish = (span: DurationSpan) => (span.end === undefined ? nowAt : Date.parse(span.end))
  const valid = spans.filter((span) => !Number.isNaN(begin(span)) && !Number.isNaN(finish(span)))
  const from = start === undefined ? Math.min(...valid.map(begin)) : Date.parse(start)
  const to = end === undefined ? Math.max(...valid.map(finish)) : Date.parse(end)
  const length = Number.isFinite(to - from) ? to - from : 0
  const lanes: DurationLane[] = []
  for (const span of valid) {
    const key = span.row ?? `span:${span.key}`
    let lane = lanes.find((one) => one.key === key)
    if (lane === undefined) {
      lane = { key, label: span.row ?? span.label, named: span.row !== undefined, bars: [] }
      lanes.push(lane)
    }
    const a = Math.min(Math.max(begin(span), from), to)
    const b = Math.min(Math.max(finish(span), from), to)
    lane.bars.push({ span, left: length > 0 ? (a - from) / length : 0, width: length > 0 ? Math.max(0, b - a) / length : 0, ms: Math.max(0, finish(span) - begin(span)), ongoing: span.end === undefined })
  }
  const ticks = length > 0 ? axisTicks(from, to).map((tick) => ({ ...tick, position: (tick.at - from) / length })) : []
  return { from, to, lanes, ticks, now: length > 0 && nowAt >= from && nowAt <= to ? (nowAt - from) / length : null }
}
