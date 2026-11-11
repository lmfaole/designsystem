import type { ReactNode } from "react"

import { cn } from "../lib/utils"
import { Reveal } from "./reveal"

/** One band of a review: an eyebrow and a title, a line that says what to look for, and room around the content. */
export function ReviewSection({ eyebrow, title, lead, children, className }: { eyebrow?: string; title: string; lead?: string | undefined; children: ReactNode; className?: string }) {
  return (
    <Reveal as="section" className={cn("grid gap-6 sm:gap-8", className)}>
      <header className="grid gap-2">
        {eyebrow === undefined ? null : <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">{eyebrow}</p>}
        <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-4xl">{title}</h2>
        {lead === undefined ? null : <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">{lead}</p>}
      </header>
      {children}
    </Reveal>
  )
}
