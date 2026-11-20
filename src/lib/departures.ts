/** The kind of a line, as Entur names its transport modes (`bus`, `tram`, `metro`, `rail`, `water` → `ferry`; the rest `other`). */
export type TransitMode = "bus" | "tram" | "metro" | "rail" | "ferry" | "other"

/** One departure from a stop, as Entur's journey planner gives it. */
export interface BoardDeparture {
  key: string
  /** The line's public code (`31`, `L2`); may be empty. */
  line: string
  mode: TransitMode
  destination: string
  /** When it is expected to leave (ISO): the real-time estimate, or the timetable's when there is none. */
  expected: string
  /** When the timetable says it leaves (ISO); the delay is `expected` − `aimed`. */
  aimed?: string
  /** The time is a real-time estimate, not the timetable's. */
  realtime: boolean
  cancelled?: boolean
  /** A short deviation (the summary of a situation): «Innstilt pga. arbeid i sporet». */
  notice?: string
  /** The platform or track's public code (`A`, `2`). */
  quay?: string
}

/** The name of each kind, in Norwegian, as a screen reader hears a line badge («Buss 31»). */
export const MODE_NAMES: Readonly<Record<TransitMode, string>> = { bus: "Buss", tram: "Trikk", metro: "T-bane", rail: "Tog", ferry: "Båt", other: "Annet" }

const MINUTE = 60_000
const clockFormat = new Intl.DateTimeFormat("nb-NO", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Oslo" })

/** A departure is kept this long after its time: data a little old still shows the bus that is at the stop. */
const GONE_AFTER_MINUTES = 1
/** From this many minutes the next departure shows its clock time instead of a count. */
const CLOCK_FROM_MINUTES = 20

/** `14:32`, Oslo time; empty for what is not a time. */
export function clock(iso: string): string {
  const at = Date.parse(iso)
  return Number.isNaN(at) ? "" : clockFormat.format(at)
}

/** Whole minutes from `now` (milliseconds) until `iso`, rounded down (59 seconds is 0, «nå»); `NaN` for what is not a time. */
export function minutesUntil(iso: string, now: number): number {
  return Math.floor((Date.parse(iso) - now) / MINUTE)
}

/** «nå» under one minute, else «3 min». */
export function countdown(minutes: number): string {
  return minutes < 1 ? "nå" : `${minutes} min`
}

/** Minutes late (positive) or early (negative) against the timetable, rounded; 0 without a timetable time. */
export function delayMinutes(expected: string, aimed: string | undefined): number {
  if (aimed === undefined) return 0
  const delay = Math.round((Date.parse(expected) - Date.parse(aimed)) / MINUTE)
  return Number.isNaN(delay) ? 0 : delay
}

/** A delay worth showing: two minutes late or more, or a minute early or more. A minute late is on time to a traveller. */
export function shownDelay(delay: number): boolean {
  return delay >= 2 || delay <= -1
}

/** «+3 min», «−1 min» (with a real minus). */
export function delayText(delay: number): string {
  return delay < 0 ? `−${-delay} min` : `+${delay} min`
}

/** How long until you must leave to reach a departure on foot: the minutes until it, less the walk. Negative: it cannot be reached. */
export function leaveIn(minutes: number, walkMinutes: number): number {
  return minutes - walkMinutes
}

export interface WalkStatus {
  /** `now`: leave at once (0–1 min to spare); `later`: there is time; `missed`: no departure in the list can be reached. */
  kind: "now" | "later" | "missed"
  text: string
}

/** What to do about the walk, from how long until you must leave (`leaveIn`), or `null` when nothing can be reached. */
export function walkStatus(leave: number | null): WalkStatus {
  if (leave === null || leave < 0) return { kind: "missed", text: "Rekker ikke" }
  if (leave <= 1) return { kind: "now", text: "Gå nå" }
  return { kind: "later", text: `Gå om ${leave} min` }
}

/** Where a departure stands on a strip of `window` minutes, from 0 (now) to 1; `null` beyond it. */
export function stripPosition(exactMinutes: number, window: number): number | null {
  if (!(window > 0) || Number.isNaN(exactMinutes) || exactMinutes > window) return null
  return Math.min(1, Math.max(0, exactMinutes / window))
}

/** The minutes the strip marks between now and its end: every 10 up to half an hour, every 15 up to an hour, then every 30. */
export function stripTicks(window: number): number[] {
  const step = window <= 30 ? 10 : window <= 60 ? 15 : 30
  const ticks: number[] = []
  for (let minute = step; minute < window; minute += step) ticks.push(minute)
  return ticks
}

/** A departure with what the board shows of it. */
export interface TimedDeparture extends BoardDeparture {
  /** Whole minutes until it leaves, never below 0. */
  minutes: number
  /** Minutes until it leaves, with the seconds: for the strip. */
  exact: number
  /** Minutes late (positive) or early (negative); 0 when on time or without a timetable time. */
  delay: number
  /** It runs and can be reached on foot in time (without a walk: it runs). */
  reachable: boolean
  /** What the board says: «nå», «3 min», or the clock time from 20 minutes on and for a timetable time. */
  label: string
  /** `14:35`, the expected clock time. */
  clock: string
}

/** One line to one destination from the stop, with its departures in order. */
export interface DepartureGroup {
  key: string
  line: string
  mode: TransitMode
  destination: string
  quay?: string
  departures: readonly TimedDeparture[]
  /** The walk to the next departure that can be reached; `null` without a walk. */
  walk: WalkStatus | null
  /** The deviations of its departures, each once. */
  notices: readonly string[]
}

/** The label of a departure on the board: a count while it is near and known in real time, else its clock time. */
export function departureLabel(minutes: number, realtime: boolean, iso: string): string {
  return realtime && minutes < CLOCK_FROM_MINUTES ? countdown(minutes) : clock(iso)
}

/**
 * The board of a stop: its departures grouped by line and destination, each group in time order, and the groups in the order you
 * can reach them: by the next departure you can catch on foot (with `walkMinutes`), then the groups with none you can catch. Departures
 * more than a minute gone and what is not a time are left out. `now` is given in milliseconds, never read here.
 */
export function groupDepartures(departures: readonly BoardDeparture[], now: number, options: { walkMinutes?: number; limit?: number } = {}): DepartureGroup[] {
  const { walkMinutes, limit } = options
  const groups = new Map<string, TimedDeparture[]>()
  for (const departure of departures) {
    const exact = (Date.parse(departure.expected) - now) / MINUTE
    if (Number.isNaN(exact) || exact < -GONE_AFTER_MINUTES) continue
    const minutes = Math.max(0, Math.floor(exact))
    const reachable = departure.cancelled !== true && (walkMinutes === undefined || leaveIn(minutes, walkMinutes) >= 0)
    const timed: TimedDeparture = {
      ...departure,
      minutes,
      exact: Math.max(0, exact),
      delay: delayMinutes(departure.expected, departure.aimed),
      reachable,
      label: departureLabel(minutes, departure.realtime, departure.expected),
      clock: clock(departure.expected),
    }
    const key = `${departure.mode}|${departure.line}|${departure.destination}`
    groups.set(key, [...(groups.get(key) ?? []), timed])
  }
  const built = [...groups].flatMap(([key, list]) => {
    const sorted = list.toSorted((a, b) => a.exact - b.exact)
    const first = sorted[0]
    if (first === undefined) return []
    const target = sorted.find((departure) => departure.reachable)
    const group: DepartureGroup = {
      key,
      line: first.line,
      mode: first.mode,
      destination: first.destination,
      ...(first.quay === undefined || first.quay === "" ? {} : { quay: first.quay }),
      departures: sorted,
      walk: walkMinutes === undefined ? null : walkStatus(target === undefined ? null : leaveIn(target.minutes, walkMinutes)),
      notices: [...new Set(sorted.flatMap((departure) => (departure.notice === undefined || departure.notice === "" ? [] : [departure.notice])))],
    }
    return [{ group, at: (target ?? first).exact, catchable: target !== undefined }]
  })
  const ordered = built.toSorted((a, b) => Number(b.catchable) - Number(a.catchable) || a.at - b.at || a.group.key.localeCompare(b.group.key, "nb")).map(({ group }) => group)
  return limit === undefined ? ordered : ordered.slice(0, Math.max(0, limit))
}

/** «4 min å gå · 250 m», «1,2 km»: the walk and the distance to a stop, either may be missing. */
export function stopMeta(walkMinutes: number | undefined, distance: number | undefined): string {
  const parts: string[] = []
  if (walkMinutes !== undefined) parts.push(`${walkMinutes} min å gå`)
  if (distance !== undefined && Number.isFinite(distance)) parts.push(distance < 1000 ? `${Math.round(distance / 10) * 10} m` : `${(Math.round(distance / 100) / 10).toLocaleString("nb-NO")} km`)
  return parts.join(" · ")
}
