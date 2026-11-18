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
export function PageSection({ id, title, icon, children }: { id: string; title: string; /** What the section is about, in front of its title: a section is found at a glance. */ icon?: IconName; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="grid content-start gap-4">
      <Heading level={2} look="label" id={id}>
        <Title icon={icon}>{title}</Title>
      </Heading>
      {children}
    </section>
  )
}

const GROUP_WIDTHS = {
  /** One cell of the page's grid, the subsections under each other. */
  cell: "",
  /** The whole row of the page's grid, the subsections side by side as far as there is room (at least 22rem each). */
  row: "col-span-full [&>div]:grid-cols-[repeat(auto-fit,minmax(min(100%,22rem),1fr))] [&>div]:gap-x-8",
} as const

/**
 * Several `SubSection`s that belong together (everything about pull requests, everything about today's weather): one
 * titled block, so a page's grid places the group as one part instead of scattering its pieces. The title is the group's
 * `<h2>`, the subsections' titles are `<h3>`s under it. With `width="row"` the group takes the whole row and lays its
 * subsections out in columns by the room it has.
 */
export function SectionGroup({ id, title, icon, width = "cell", children }: { id: string; title: string; icon?: IconName; width?: keyof typeof GROUP_WIDTHS; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className={`grid min-w-0 content-start gap-5 ${GROUP_WIDTHS[width]}`}>
      <Heading level={2} look="section" id={id}>
        <Title icon={icon}>{title}</Title>
      </Heading>
      <div className="grid content-start gap-y-8">{children}</div>
    </section>
  )
}

/** A titled part of a `SectionGroup`: the same small capitals heading as a `PageSection`, one level down (`<h3>`). */
export function SubSection({ id, title, icon, children }: { id: string; title: string; icon?: IconName; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="grid min-w-0 content-start gap-3">
      <Heading level={3} look="label" id={id}>
        <Title icon={icon}>{title}</Title>
      </Heading>
      {children}
    </section>
  )
}
