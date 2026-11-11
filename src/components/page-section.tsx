import type { ReactNode } from "react"

/** A titled block of a page (a ranked list, the latest plays): the small capitals heading and the content under it, labelled for a screen reader by it. */
export function PageSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="grid content-start gap-4">
      <h2 id={id} className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">
        {title}
      </h2>
      {children}
    </section>
  )
}
