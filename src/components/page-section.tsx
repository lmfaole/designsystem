import type { ReactNode } from "react"

import { Heading } from "./text"

/** A titled block of a page (a ranked list, the latest plays): the small capitals heading and the content under it, labelled for a screen reader by it. */
export function PageSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="grid content-start gap-4">
      <Heading level={2} look="label" id={id}>
        {title}
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
export function SectionGroup({ id, title, width = "cell", children }: { id: string; title: string; width?: keyof typeof GROUP_WIDTHS; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className={`grid min-w-0 content-start gap-5 ${GROUP_WIDTHS[width]}`}>
      <Heading level={2} look="section" id={id}>
        {title}
      </Heading>
      <div className="grid content-start gap-y-8">{children}</div>
    </section>
  )
}

/** A titled part of a `SectionGroup`: the same small capitals heading as a `PageSection`, one level down (`<h3>`). */
export function SubSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="grid min-w-0 content-start gap-3">
      <Heading level={3} look="label" id={id}>
        {title}
      </Heading>
      {children}
    </section>
  )
}
