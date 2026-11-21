import type { ReactNode } from "react"

import { Icon } from "./icon"
import type { IconName } from "../lib/icons"
import { Heading } from "./text"

/** The title of a section, with the icon that says what it is in front of it. */
function Title({ icon, children }: { icon: IconName | undefined; children: string }) {
  return icon === undefined ? children : (
    <span className="inline-flex items-center gap-2">
      <Icon name={icon} />
      {children}
    </span>
  )
}

/**
 * A titled block of a page (a ranked list, the latest plays): the small capitals heading and the content under it, labelled for a screen reader by it.
 *
 * With `continues` it is a preview of a subpage: a card holding the title, the first few of what the subpage has (the five latest
 * plays), and at its foot, inside the card under a line, one full-width link to the subpage («Se hele historikken»). The rows keep
 * their own links; only the foot goes to the subpage, so the card itself is not one link. It replaces `more` (both would go to the same page).
 */
export function PageSection({ id, title, icon, more, continues, level = 2, children }: { id: string; title: string; /** What the section is about, in front of its title: a section is found at a glance. */ icon?: IconName; /** `3` for a section under another heading than the page's own, so the outline has no gap and no jump. */ level?: 2 | 3; children: ReactNode } & (
  | { /** The page with all of it, when the section shows only the first of a list. */ more?: More; continues?: undefined }
  | { more?: undefined; /** The subpage this section is an excerpt of: the section becomes a card with the link at its foot. */ continues: Continuation }
)) {
  const heading = (
    <Heading level={level} look="label" id={id}>
      <Title icon={icon}>{title}</Title>
    </Heading>
  )
  if (continues !== undefined) {
    return (
      <section aria-labelledby={id} className="border-border bg-card text-card-foreground grid min-w-0 content-start rounded-2xl border">
        <div className="grid min-w-0 content-start gap-4 p-4">
          {heading}
          {children}
        </div>
        <Foot continues={continues} />
      </section>
    )
  }
  return (
    <section aria-labelledby={id} className="grid content-start gap-4">
      <Head more={more}>{heading}</Head>
      {children}
    </section>
  )
}

/** The subpage a section card is an excerpt of, linked at the card's foot: «Se hele historikken». */
export interface Continuation {
  href: string
  /** Names where it goes, in full: «Se hele historikken», «Se månedens Wrapped», never «Se alle» or «Mer» alone. */
  label: string
  /** The icon of the subpage: given when the rows above have icons (`Rows lead="icon"`), so the label stands in their text column. */
  icon?: IconName
  /** How much there is there, with what it counts («1 248 avspillinger»): shown quietly at the end of the line, and read with the link. */
  count?: string
}

/** The card's foot: one link the width of the card, under a line, its text in the content's column and a chevron at the end. */
function Foot({ continues }: { continues: Continuation }) {
  const { href, label, icon, count } = continues
  return (
    <a href={href} className={`group border-border hover:bg-muted/50 grid min-h-12 items-center gap-x-3 rounded-b-2xl border-t px-4 py-3 ${icon === undefined ? "grid-cols-[1fr_auto]" : "grid-cols-[1rem_1fr_auto]"}`}>
      {icon === undefined ? null : <Icon name={icon} tone="muted" />}
      <span className="font-medium underline decoration-dotted underline-offset-4 group-hover:decoration-solid group-active:decoration-2">{label}</span>
      <span className="text-muted-foreground inline-flex items-center gap-1 text-sm">
        {count === undefined ? null : <span className="tabular-nums">{count}</span>}
        <Icon name="chevron-right" size="sm" />
      </span>
    </a>
  )
}

/** A link to the page with all of it, at the end of a section's title: «Se alle 12». */
export interface More {
  href: string
  /** Says what it opens, in full: «Se alle pull requests», so it is a link that reads right by itself. */
  label: string
}

/** The title with its «see all» link on the same line. */
function Head({ more, children }: { more: More | undefined; children: ReactNode }) {
  if (more === undefined) return children
  return (
    <div className="flex min-w-0 items-baseline justify-between gap-4">
      {children}
      <a href={more.href} className="text-muted-foreground hover:text-foreground inline-flex min-h-6 shrink-0 items-center gap-0.5 text-sm">
        {more.label}
        <Icon name="chevron-right" size="sm" />
      </a>
    </div>
  )
}

/**
 * Several `SubSection`s that belong together (everything about pull requests, everything about today's weather): one
 * titled block, so a reader meets them together. The title is the group's `<h2>`, the subsections' titles are `<h3>`s under it,
 * and the subsections stand UNDER each other in the order they matter: never side by side, so the order is never in doubt.
 */
export function SectionGroup({ id, title, icon, more, children }: { id: string; title: string; icon?: IconName; more?: More; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="grid min-w-0 content-start gap-5">
      <Head more={more}>
        <Heading level={2} look="section" id={id}>
          <Title icon={icon}>{title}</Title>
        </Heading>
      </Head>
      <div className="grid content-start gap-y-8">{children}</div>
    </section>
  )
}

/** A titled part of a `SectionGroup`: the same small capitals heading as a `PageSection`, one level down (`<h3>`). */
export function SubSection({ id, title, icon, more, children }: { id: string; title: string; icon?: IconName; more?: More; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="grid min-w-0 content-start gap-3">
      <Head more={more}>
        <Heading level={3} look="label" id={id}>
          <Title icon={icon}>{title}</Title>
        </Heading>
      </Head>
      {children}
    </section>
  )
}
