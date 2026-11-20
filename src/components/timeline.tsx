import { useId, type ReactNode } from "react"

import { ENTITY_LINK } from "../lib/link-style"
import { collapseRuns, groupByDay, sortEvents, type TimelineActor, type TimelineEvent, type TimelineItem, type TimelineTone } from "../lib/timeline"
import { Badge } from "./badge"
import { ExternalMark } from "./external-link"
import { Icon } from "./icon"
import { LiveDot } from "./live-dot"
import { Time } from "./time"

export type { TimelineActor, TimelineEvent, TimelineTone } from "../lib/timeline"

export interface TimelineProps {
  /** What the history is, for a screen reader: the name of the list («Historikk for pull request 42»). */
  label: string
  events: readonly TimelineEvent[]
  /** The time now (ISO), from the server: times are told relative to it, and the component never reads the clock. */
  now: string
  /** `desc` (the default): newest first. `asc`: oldest first, as a conversation reads. */
  order?: "asc" | "desc"
  /** A heading over each day («I dag», «I går», «Torsdag 19. november»); on by default. */
  byDay?: boolean
  /** A run of more than this many events of one `group` shows the first and folds the rest behind «Vis 7 commits til»; 3 by default. */
  collapseAfter?: number
  /** What a group's events are called in the fold, by group key: `{ commit: "commits", play: "spor" }`. «hendelser» by default. */
  groupNouns?: Readonly<Record<string, string>>
  /** At most this many events, then a line saying how many more there are. */
  limit?: number
  /** The level of the days' headings: `3` under a page's section (`<h2>`), the default. */
  headingLevel?: 2 | 3 | 4 | 5
}

/** The node's colour by tone: the icon stands on it at 4.5:1, and the node itself has 3:1 on the page (tokens `--event-*`). */
const NODE: Readonly<Record<TimelineTone, string>> = {
  neutral: "border bg-muted text-muted-foreground",
  accent: "bg-(--event-accent) text-(--event-accent-foreground)",
  success: "bg-(--event-success) text-(--event-success-foreground)",
  warning: "bg-(--event-warning) text-(--event-warning-foreground)",
  danger: "bg-(--event-danger) text-(--event-danger-foreground)",
}

/** The rail: a line down the list, at the centre of the nodes. */
const RAIL = "relative grid gap-4 before:absolute before:inset-y-0 before:left-4 before:w-px before:-translate-x-1/2 before:bg-border"
const ITEM = "relative min-w-0 scroll-mt-24 pl-11"
const FOCUS = "rounded-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"

/**
 * A history of what happened to one thing, newest first: a pull request, an issue, a discussion, what was played or watched. A vertical
 * rail with a node for each event. A `comment` is shown in full, its author's picture on the rail and its body in a bordered box; an
 * `event` is one condensed line («Kari godkjente · for 3 timer siden») beside a small node with its icon, coloured by `tone`. Runs of
 * the same `group` (commits, plays of one album) fold behind a native disclosure («Vis 7 commits til»), and never across a day. A heading
 * over each day, each time relative with the exact time in its title and `datetime`, and each item an anchor (`id`) its time links to.
 * Rendered on the server with no script; `now` is passed in.
 */
export function Timeline({ label, events, now, order = "desc", byDay = true, collapseAfter = 3, groupNouns = {}, limit, headingLevel = 3 }: TimelineProps) {
  const base = useId()
  if (events.length === 0) return <p className="text-sm text-muted-foreground">Ingen hendelser ennå.</p>
  const sorted = sortEvents(events, order)
  const shown = limit === undefined ? sorted : sorted.slice(0, Math.max(0, limit))
  const left = sorted.length - shown.length
  const clock = new Date(now)
  const Heading = `h${headingLevel}` as const
  return (
    <div className="grid gap-4">
      {byDay ? (
        <ol aria-label={label} className="grid gap-6">
          {groupByDay(shown, now).map((day) => {
            const id = `${base}-${day.key}`
            return (
              <li key={day.key} className="grid gap-3">
                <Heading id={id} className="text-sm font-semibold">
                  <time dateTime={day.key}>{day.label}</time>
                  {day.date === "" ? null : <span className="font-normal text-muted-foreground"> · {day.date}</span>}
                </Heading>
                <Events items={collapseRuns(day.events, collapseAfter, groupNouns)} now={clock} labelledBy={id} />
              </li>
            )
          })}
        </ol>
      ) : (
        <Events items={collapseRuns(shown, collapseAfter, groupNouns)} now={clock} label={label} />
      )}
      {left > 0 ? (
        <p className="text-sm text-muted-foreground">
          {left} {order === "desc" ? "eldre" : "nyere"} {left === 1 ? "hendelse" : "hendelser"} vises ikke
        </p>
      ) : null}
    </div>
  )
}

function Events({ items, now, label, labelledBy }: { items: TimelineItem<TimelineEvent>[]; now: Date; label?: string; labelledBy?: string }) {
  return (
    <ol className={RAIL} {...(label === undefined ? {} : { "aria-label": label })} {...(labelledBy === undefined ? {} : { "aria-labelledby": labelledBy })}>
      {items.map((item) => (item.kind === "single" ? <Item key={item.event.id} event={item.event} now={now} /> : <Run key={`run-${item.shown[0]?.id ?? item.group}`} item={item} now={now} />))}
    </ol>
  )
}

function Run({ item, now }: { item: Extract<TimelineItem<TimelineEvent>, { kind: "run" }>; now: Date }) {
  const count = item.hidden.length
  return (
    <>
      {item.shown.map((event) => (
        <Item key={event.id} event={event} now={now} />
      ))}
      <li className={ITEM}>
        <Node tone="neutral" icon="more" />
        <details data-motion="disclosure" className="group">
          <summary className={`inline-flex min-h-6 cursor-pointer list-none items-center gap-1 text-sm font-medium [&::-webkit-details-marker]:hidden ${FOCUS}`}>
            <span className="transition-transform group-open:rotate-90">
              <Icon name="chevron-right" size="sm" />
            </span>
            <span className="group-open:hidden">
              Vis {count} {item.noun} til
            </span>
            <span className="hidden group-open:inline">
              Skjul {count} {item.noun}
            </span>
          </summary>
          <ol aria-label={`${count} ${item.noun} til`} className={`${RAIL} -ml-11 pt-4`}>
            {item.hidden.map((event) => (
              <Item key={event.id} event={event} now={now} />
            ))}
          </ol>
        </details>
      </li>
    </>
  )
}

function Item({ event, now }: { event: TimelineEvent; now: Date }) {
  if (event.kind === "comment") {
    return (
      <li id={event.id} className={ITEM}>
        {event.actor?.avatar === undefined ? (
          <Node tone={event.tone ?? "neutral"} icon={event.icon} large />
        ) : (
          <span aria-hidden="true" className="absolute top-0 left-4 size-8 -translate-x-1/2 overflow-hidden rounded-full bg-muted ring-4 ring-background">
            <img src={event.actor.avatar} alt="" loading="lazy" decoding="async" width={32} height={32} className="size-full object-cover" />
          </span>
        )}
        <div className="min-w-0 overflow-hidden rounded-lg border bg-card text-card-foreground">
          <p className="border-b bg-muted/50 px-3 py-2 text-sm text-muted-foreground [overflow-wrap:anywhere]">
            <Line event={event} now={now} />
          </p>
          {event.body === undefined || event.body === null ? null : <div className="grid min-w-0 gap-2 px-3 py-3 text-sm">{event.body}</div>}
        </div>
      </li>
    )
  }
  return (
    <li id={event.id} className={ITEM}>
      <Node tone={event.tone ?? "neutral"} icon={event.icon} />
      <p className="min-h-6 py-0.5 text-sm text-muted-foreground [overflow-wrap:anywhere]">
        <Line event={event} now={now} avatar />
      </p>
    </li>
  )
}

/** «Kari godkjente «Fiks feilen» · for 3 timer siden», the words of an event, in the order they are read. */
function Line({ event, now, avatar = false }: { event: TimelineEvent; now: Date; avatar?: boolean }) {
  return (
    <>
      {event.actor === undefined ? null : (
        <>
          <Actor actor={event.actor} avatar={avatar} />{" "}
        </>
      )}
      {event.summary}
      {event.target === undefined ? null : (
        <>
          {" "}
          <span className="font-medium text-foreground">{event.target.href === undefined ? event.target.label : <Link href={event.target.href}>{event.target.label}</Link>}</span>
        </>
      )}
      {event.badge === undefined ? null : (
        <>
          {" "}
          <span className="inline-block align-middle">
            <Badge>{event.badge}</Badge>
          </span>
        </>
      )}
      <span aria-hidden="true"> · </span>
      <When event={event} now={now} />
    </>
  )
}

function Actor({ actor, avatar }: { actor: TimelineActor; avatar: boolean }) {
  const name = (
    <span className="font-medium text-foreground">
      {avatar && actor.avatar !== undefined ? (
        <span aria-hidden="true" className="mr-1.5 inline-block size-5 overflow-hidden rounded-full bg-muted align-middle">
          <img src={actor.avatar} alt="" loading="lazy" decoding="async" width={20} height={20} className="size-full object-cover" />
        </span>
      ) : null}
      {actor.name}
    </span>
  )
  return actor.href === undefined ? name : <Link href={actor.href}>{name}</Link>
}

/** When: «nå» with a live dot for what goes on, else the relative time, linked to the event (or to its own anchor). */
function When({ event, now }: { event: TimelineEvent; now: Date }) {
  if (event.ongoing === true)
    return (
      <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
        <LiveDot />
        nå
      </span>
    )
  return (
    <Link href={event.href ?? `#${event.id}`} quiet>
      <Time value={event.at} now={now} />
    </Link>
  )
}

/** A link in a line: a link out of the site is marked as one. */
function Link({ href, quiet = false, children }: { href: string; quiet?: boolean; children: ReactNode }) {
  const external = /^https?:\/\//.test(href)
  return (
    <a href={href} className={quiet ? `underline-offset-4 hover:underline ${FOCUS}` : ENTITY_LINK.replace("inline-block ", "")} {...(external ? { rel: "noopener noreferrer" } : {})}>
      {children}
      {external ? <ExternalMark /> : null}
    </a>
  )
}

function Node({ tone, icon, large = false }: { tone: TimelineTone; icon: TimelineEvent["icon"]; large?: boolean }) {
  return (
    <span aria-hidden="true" className={`absolute top-0 left-4 flex -translate-x-1/2 items-center justify-center rounded-full ring-4 ring-background ${large ? "size-8" : "size-6"} ${NODE[tone]}`}>
      <Icon name={icon} size={large ? "md" : "sm"} />
    </span>
  )
}
