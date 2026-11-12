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
