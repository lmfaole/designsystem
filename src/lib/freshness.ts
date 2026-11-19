const clock = new Intl.DateTimeFormat("nb-NO", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Oslo" })

export interface FreshnessText {
  /** `19:27`, the clock of the moment the data was made. */
  clock: string
  /** Older than the source is expected to be: the page has not been renewed in time. */
  stale: boolean
  /** Seconds since `at`, never below zero. */
  age: number
}

/**
 * How fresh a page's data is, from when it was made (`at`) and the time now. It is stale when it is older than `staleAfterSeconds`, which
 * is set for each source (a few times how often the page renews itself), so that a refresh that has stopped working shows without anything
 * having to detect the failure. `now` is given, never read here. Nothing for a value that is not a time.
 */
export function describeFreshness(at: string, now: Date, staleAfterSeconds: number): FreshnessText | null {
  const made = new Date(at)
  if (Number.isNaN(made.getTime())) return null
  const age = Math.max(0, Math.round((now.getTime() - made.getTime()) / 1000))
  return { clock: clock.format(made), stale: age > staleAfterSeconds, age }
}
