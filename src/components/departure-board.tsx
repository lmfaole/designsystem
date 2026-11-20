import { clock, delayText, groupDepartures, shownDelay, stopMeta, stripPosition, stripTicks, type BoardDeparture, type DepartureGroup, type TimedDeparture, type TransitMode, type WalkStatus } from "../lib/departures"
import { Icon } from "./icon"
import { LineBadge } from "./line-badge"
import { StatusLine } from "./status-line"
import { CardHeading, Text } from "./text"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"

export type { BoardDeparture, TransitMode } from "../lib/departures"

export interface DepartureBoardProps {
  /** The stop's name: the card's heading. */
  stop: string
  /** The time now (ISO), from the server: the board never reads the clock, so it renders the same on the server and in the browser. */
  now: string
  departures: readonly BoardDeparture[]
  /** Minutes on foot to the stop: the board then says when to leave, and dims what cannot be reached. */
  walkMinutes?: number
  /** Metres to the stop, in the header. */
  distance?: number
  /** The minutes the time strips cover, from now; 60 by default. */
  window?: number
  /** The heading's level: `3` under a page's section (`<h2>`), the default. */
  headingLevel?: 2 | 3 | 4
  /** At most this many rows (a line to one destination each), the soonest you can catch first. */
  limit?: number
}

const DOTS: Readonly<Record<TransitMode, { full: string; hollow: string }>> = {
  bus: { full: "bg-(--transit-bus)", hollow: "border-(--transit-bus)" },
  tram: { full: "bg-(--transit-tram)", hollow: "border-(--transit-tram)" },
  metro: { full: "bg-(--transit-metro)", hollow: "border-(--transit-metro)" },
  rail: { full: "bg-(--transit-rail)", hollow: "border-(--transit-rail)" },
  ferry: { full: "bg-(--transit-ferry)", hollow: "border-(--transit-ferry)" },
  other: { full: "bg-(--transit-other)", hollow: "border-(--transit-other)" },
}

/** The hatched part of a strip: the minutes it takes to walk to the stop, which no departure in them can be caught. */
const HATCH = "bg-[repeating-linear-gradient(135deg,var(--muted-foreground)_0_1px,transparent_1px_5px)] opacity-60"

/** How many departures after the next a row names. */
const LATER = 2

/**
 * One stop's departures, as the real-time signs at a stop show them: a card with the stop's name (and the walk and distance to it), and a
 * row for each line to one destination, with the line's badge, the destination and the next departure large at the right («nå», «3 min»,
 * the clock from 20 minutes on or when the time is the timetable's) and the next two smaller. Under each row a strip of the next hour
 * puts a dot at each departure, with the walk hatched at its start. With `walkMinutes` each row says when to leave («Gå om 4 min»,
 * «Gå nå», «Rekker ikke») and what cannot be reached is dimmed; the rows come in the order you can catch them. A delay shows the timetable's
 * time struck and «+3 min», a cancelled departure is struck with «Innstilt», and a deviation is a line under the row. Rendered on the server
 * with no script; `now` is passed in. Say how fresh the data is with `Freshness` beside it.
 */
export function DepartureBoard({ stop, now, departures, walkMinutes, distance, window = 60, headingLevel = 3, limit }: DepartureBoardProps) {
  const groups = groupDepartures(departures, Date.parse(now), { ...(walkMinutes === undefined ? {} : { walkMinutes }), ...(limit === undefined ? {} : { limit }) })
  const meta = stopMeta(walkMinutes, distance)
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <CardHeading level={headingLevel}>{stop}</CardHeading>
        </CardTitle>
        {meta === "" ? null : (
          <CardDescription>
            <span className="inline-flex items-center gap-1">
              <Icon name={walkMinutes === undefined ? "place" : "walk"} size="sm" />
              {meta}
            </span>
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {groups.length === 0 ? (
          <Text size="sm" tone="muted">
            Ingen avganger den nærmeste tiden.
          </Text>
        ) : (
          <div className="@container grid grid-cols-[auto_minmax(0,1fr)_auto] gap-x-3 gap-y-2">
            <ul className="col-span-full grid grid-cols-subgrid divide-y divide-border">
              {groups.map((group) => (
                <DepartureRow key={group.key} group={group} window={window} walkMinutes={walkMinutes} />
              ))}
            </ul>
            <Axis window={window} walkMinutes={walkMinutes} />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

/** A row takes the board's columns (the widest badge, the destination, the times), so the destinations and the strips line up. */
const ROW = "col-span-full grid grid-cols-subgrid"

function DepartureRow({ group, window, walkMinutes }: { group: DepartureGroup; window: number; walkMinutes: number | undefined }) {
  const [next, ...rest] = group.departures
  if (next === undefined) return null
  const later = rest.slice(0, LATER)
  return (
    <li className={`${ROW} gap-y-1 py-3 first:pt-1`}>
      <span className="row-span-2 self-start pt-0.5">
        <LineBadge line={group.line} mode={group.mode} />
      </span>
      <span className="min-w-0 self-baseline font-medium [overflow-wrap:anywhere]">{group.destination}</span>
      <span className="self-baseline text-right">
        <BigTime departure={next} />
      </span>
      <span className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-muted-foreground">
        {next.cancelled === true ? (
          <span className="inline-flex items-center gap-1 font-medium text-destructive">
            <Icon name="cancelled" size="sm" tone="destructive" />
            Innstilt
          </span>
        ) : null}
        {group.walk === null ? null : <Walk status={group.walk} />}
        {next.cancelled !== true && shownDelay(next.delay) && next.aimed !== undefined ? <Delay departure={next} /> : null}
        {next.realtime ? null : <span>Rutetid</span>}
        {group.quay === undefined ? null : <span>{group.mode === "rail" ? "Spor" : "Plattform"} {group.quay}</span>}
      </span>
      <span className="text-right text-xs whitespace-nowrap text-muted-foreground tabular-nums">
        {later.length === 0 ? null : (
          <>
            <span className="sr-only">Deretter </span>
            {later.map((departure, index) => (
              <span key={departure.key}>
                {index > 0 ? " · " : null}
                <LaterTime departure={departure} />
              </span>
            ))}
          </>
        )}
      </span>
      <Strip group={group} window={window} walkMinutes={walkMinutes} />
      {group.notices.length === 0 ? null : (
        <span className="col-start-2 col-end-4 pt-1">
          <StatusLine items={group.notices.map((text) => ({ text, icon: "warning" as const }))} />
        </span>
      )}
    </li>
  )
}

/** The next departure, large: struck when cancelled, dimmed when it cannot be reached. */
function BigTime({ departure }: { departure: TimedDeparture }) {
  const time = (
    <time dateTime={departure.expected} className="text-lg leading-tight font-semibold tabular-nums">
      {departure.label}
    </time>
  )
  if (departure.cancelled === true) return <s className="text-muted-foreground">{time}</s>
  return <span className={departure.reachable ? "" : "text-muted-foreground"}>{time}</span>
}

function LaterTime({ departure }: { departure: TimedDeparture }) {
  const time = <time dateTime={departure.expected}>{departure.label}</time>
  if (departure.cancelled === true)
    return (
      <>
        <s>{time}</s>
        <span className="sr-only"> innstilt</span>
      </>
    )
  return departure.reachable ? <span className="text-foreground">{time}</span> : time
}

function Delay({ departure }: { departure: TimedDeparture }) {
  return (
    <span className="inline-flex items-baseline gap-1 tabular-nums">
      <span className="sr-only">Rutetid </span>
      <s>
        <time dateTime={departure.aimed}>{clock(departure.aimed ?? "")}</time>
      </s>
      <span className="font-medium text-(--transit-late)">
        <span className="sr-only">{departure.delay > 0 ? "forsinket " : "tidlig "}</span>
        {delayText(departure.delay)}
      </span>
    </span>
  )
}

function Walk({ status }: { status: WalkStatus }) {
  if (status.kind === "missed")
    return (
      <span className="inline-flex items-center gap-1">
        <Icon name="blocked" size="sm" tone="muted" />
        {status.text}
      </span>
    )
  return (
    <span className={`inline-flex items-center gap-1 ${status.kind === "now" ? "font-semibold text-foreground" : "text-foreground"}`}>
      <Icon name="walk" size="sm" />
      {status.text}
    </span>
  )
}

/** The departures of a row on the next `window` minutes: a dot at each, hollow when cancelled and faint when out of reach. */
function Strip({ group, window, walkMinutes }: { group: DepartureGroup; window: number; walkMinutes: number | undefined }) {
  const walk = walkMinutes === undefined || walkMinutes <= 0 ? null : Math.min(1, walkMinutes / window)
  const dots = DOTS[group.mode]
  return (
    <span aria-hidden="true" className="col-start-2 col-end-4 block px-1.5 pt-1">
      <span className="relative block h-3">
        {walk === null ? null : <span className={`absolute inset-y-0 left-0 rounded-xs ${HATCH}`} style={{ width: `${walk * 100}%` }} />}
        <span className="absolute inset-x-0 top-1/2 h-px bg-border" />
        {stripTicks(window).map((minute) => (
          <span key={minute} className="absolute top-1/2 h-2 w-px -translate-y-1/2 bg-border" style={{ left: `${(minute / window) * 100}%` }} />
        ))}
        {group.departures.map((departure, index) => {
          const position = stripPosition(departure.exact, window)
          if (position === null) return null
          const look = departure.cancelled === true ? `border-2 bg-card ${dots.hollow}` : dots.full
          const size = index === 0 ? "size-3" : "size-2.5"
          return <span key={departure.key} className={`absolute top-1/2 -translate-1/2 rounded-full ${size} ${look} ${departure.reachable || departure.cancelled === true ? "" : "opacity-40"}`} style={{ left: `${position * 100}%` }} />
        })}
      </span>
    </span>
  )
}

/** The scale under the strips: «nå», the ticks, the end; and what the hatching means when there is a walk. */
function Axis({ window, walkMinutes }: { window: number; walkMinutes: number | undefined }) {
  return (
    <div aria-hidden="true" className={`${ROW} text-xs text-muted-foreground tabular-nums`}>
      <span className="col-start-2 col-end-4 grid gap-1 px-1.5">
        <span className="relative block h-4">
          <span className="absolute left-0">nå</span>
          {stripTicks(window).map((minute) => (
            <span key={minute} className="absolute -translate-x-1/2" style={{ left: `${(minute / window) * 100}%` }}>
              {minute}
            </span>
          ))}
          <span className="absolute right-0">
            {window}
            <span className="hidden @sm:inline"> min</span>
          </span>
        </span>
        {walkMinutes === undefined || walkMinutes <= 0 ? null : (
          <span className="inline-flex items-center gap-1.5">
            <span className={`inline-block h-2.5 w-4 rounded-xs ${HATCH}`} />
            Rekker ikke fram til fots
          </span>
        )}
      </span>
    </div>
  )
}

