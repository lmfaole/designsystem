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

/** A titled block of a page (a ranked list, the latest plays): the small capitals heading and the content under it, labelled for a screen reader by it. */
export function PageSection({ id, title, icon, more, children }: { id: string; title: string; /** What the section is about, in front of its title: a section is found at a glance. */ icon?: IconName; /** The page with all of it, when the section shows only the first of a list. */ more?: More; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="grid content-start gap-4">
      <Head more={more}>
        <Heading level={2} look="label" id={id}>
          <Title icon={icon}>{title}</Title>
        </Heading>
      </Head>
      {children}
    </section>
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
