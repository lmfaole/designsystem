export type TimeFormat = "auto" | "relative" | "date" | "datetime"

/** Under this many days a time is told relative to now («for 3 timer siden»); from this many days it is a date. */
export const RELATIVE_DAYS = 7

const ZONE = "Europe/Oslo"
const relative = new Intl.RelativeTimeFormat("nb-NO", { numeric: "auto" })
const date = new Intl.DateTimeFormat("nb-NO", { day: "numeric", month: "short", year: "numeric", timeZone: ZONE })
const dateTime = new Intl.DateTimeFormat("nb-NO", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", timeZone: ZONE })

export interface TimeText {
  /** What is shown. */
  text: string
  /** The exact time, for the title and for anyone who wants it: the date and the clock, always. */
  exact: string
  /** The value as a machine-readable time (`<time datetime>`). */
  iso: string
}

/** `5 min`, `3 timer`, `2 dager` as a relative phrase from the seconds between two instants (negative: in the past). */
function relativeText(seconds: number): string {
  const abs = Math.abs(seconds)
  if (abs < 45) return "nå"
  if (abs < 3600) return relative.format(Math.round(seconds / 60), "minute")
  if (abs < 86_400) return relative.format(Math.round(seconds / 3600), "hour")
  return relative.format(Math.round(seconds / 86_400), "day")
}

/**
 * A time as the reader should see it: recent times relative to `now`, older ones as a date, and the exact time always at hand.
 * `now` is given, never read here, so the server and the browser tell the same story and a test can fix the clock. Nothing for a
 * value that is not a time.
 */
export function describeTime(value: string, now: Date, format: TimeFormat = "auto"): TimeText | null {
  const at = new Date(value)
  if (Number.isNaN(at.getTime())) return null
  const seconds = (at.getTime() - now.getTime()) / 1000
  const recent = Math.abs(seconds) < RELATIVE_DAYS * 86_400
  const shown = format === "auto" ? (recent ? "relative" : "date") : format
  const text = shown === "relative" ? relativeText(seconds) : shown === "date" ? date.format(at) : dateTime.format(at)
  return { text, exact: dateTime.format(at), iso: at.toISOString() }
}
