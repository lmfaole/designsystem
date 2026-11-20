import { formatDuration, layoutDurations, spanText, type DurationSpan, type TimelineTone } from "../lib/timeline"
import { Icon } from "./icon"

export type { DurationSpan } from "../lib/timeline"

export interface DurationBarsProps {
  /** What the spans are of, for a screen reader: «Tid i hver tilstand». */
  label: string
  spans: readonly DurationSpan[]
  /** The time now (ISO): a span with no end goes on to it. */
  now: string
  /** The start of the axis (ISO); the earliest span's by default. */
  start?: string
  /** The end of the axis (ISO); the latest end, or now, by default. */
  end?: string
}

/** A bar's fill by tone, with the text that stands on it at 4.5:1; the bar has 3:1 on the page (tokens `--event-*`). */
const FILL: Readonly<Record<TimelineTone, string>> = {
  neutral: "bg-muted-foreground text-background",
  accent: "bg-(--event-accent) text-(--event-accent-foreground)",
  success: "bg-(--event-success) text-(--event-success-foreground)",
  warning: "bg-(--event-warning) text-(--event-warning-foreground)",
  danger: "bg-(--event-danger) text-(--event-danger-foreground)",
}

/** A tick this close to now gives way to «nå». */
const NEAR = 0.07

/** A bar wide enough for its words. */
const ROOM = 0.14

/**
 * How long each state lasted, as spans on one time axis: «Venter på review», «Endringer etterspurt», «Sjekker feiler» side by side in
 * time, like Aksel's timeline. A lane per `row` (spans with the same row share it), a bar per span from its start to its end, or to now
 * with an arrow for one that goes on, a line at now and the hours or dates under them. Where there is no room for bars (a phone), it is a
 * list of each span with its length and its times. The list is under the bars on a wide screen too, as their legend and their text: a
 * short span has no room for words in its bar, and a screen reader reads the list, the bars being a picture of it.
 */
export function DurationBars({ label, spans, now, start, end }: DurationBarsProps) {
  const layout = layoutDurations(spans, now, start, end)
  if (layout.lanes.length === 0) return <p className="text-sm text-muted-foreground">Ingen perioder å vise.</p>
  return (
    <div className="@container grid gap-3">
      <div aria-hidden="true" className="hidden grid-cols-[minmax(5rem,10rem)_minmax(0,1fr)] gap-x-3 gap-y-2 text-xs @lg:grid">
        {layout.lanes.map((lane) => (
          <div key={lane.key} className="col-span-full grid grid-cols-subgrid items-center">
            <span className="min-w-0 text-sm [overflow-wrap:anywhere]">{lane.label}</span>
            <span className="relative block h-7 overflow-hidden rounded-sm bg-muted">
              {layout.ticks.map((tick) => (
                <span key={tick.at} className="absolute inset-y-0 w-px bg-border" style={{ left: `${tick.position * 100}%` }} />
              ))}
              {lane.bars.map((bar) => {
                const words = lane.named ? `${bar.span.label} · ${formatDuration(bar.ms)}` : formatDuration(bar.ms)
                return (
                  <span
                    key={bar.span.key}
                    title={`${bar.span.label}: ${formatDuration(bar.ms)}${bar.ongoing ? " så langt" : ""}`}
                    className={`absolute inset-y-0.5 flex items-center justify-between gap-1 overflow-hidden px-1.5 whitespace-nowrap ${bar.ongoing ? "rounded-l-sm" : "rounded-sm"} ${FILL[bar.span.tone ?? "neutral"]}`}
                    style={{ left: `min(${bar.left * 100}%, 100% - 4px)`, width: `max(${bar.width * 100}%, 4px)` }}
                  >
                    {bar.width >= ROOM ? <span className="min-w-0 truncate font-medium">{words}</span> : <span />}
                    {bar.ongoing ? <Icon name="arrow-right" size="sm" /> : null}
                  </span>
                )
              })}
              {layout.now === null ? null : <span className="absolute inset-y-0 w-0.5 -translate-x-1/2 bg-foreground" style={{ left: `clamp(1px, ${layout.now * 100}%, 100% - 1px)` }} />}
            </span>
          </div>
        ))}
        <span className="col-start-2 relative block h-4 text-muted-foreground tabular-nums">
          {layout.ticks
            .filter((tick) => layout.now === null || Math.abs(tick.position - layout.now) > NEAR)
            .map((tick) => (
              <span key={tick.at} className="absolute -translate-x-1/2 whitespace-nowrap" style={{ left: `${tick.position * 100}%` }}>
                {tick.label}
              </span>
            ))}
          {layout.now === null ? null : (
            <span className={`absolute font-medium text-foreground ${layout.now > 1 - NEAR ? "-translate-x-full" : "-translate-x-1/2"}`} style={{ left: `${layout.now * 100}%` }}>
              nå
            </span>
          )}
        </span>
      </div>
      <ul aria-label={label} className="grid gap-2 text-sm">
        {layout.lanes.flatMap((lane) =>
          lane.bars.map((bar) => (
            <li key={bar.span.key} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-baseline gap-x-2">
              <span aria-hidden="true" className={`inline-block size-2.5 rounded-xs ${FILL[bar.span.tone ?? "neutral"]}`} />
              <span className="min-w-0 [overflow-wrap:anywhere]">
                {lane.named && lane.label !== bar.span.label ? <span className="text-muted-foreground">{lane.label}: </span> : null}
                {bar.span.label}
                <span className="block text-xs text-muted-foreground">
                  {spanText(bar.span.start, bar.span.end)}
                  {bar.ongoing ? ", pågår" : ""}
                </span>
              </span>
              <span className="font-medium whitespace-nowrap tabular-nums">
                {formatDuration(bar.ms)}
                {bar.ongoing ? <span className="font-normal text-muted-foreground"> så langt</span> : null}
              </span>
            </li>
          )),
        )}
      </ul>
    </div>
  )
}
