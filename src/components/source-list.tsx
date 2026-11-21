import type { ReactNode } from "react"

import { BrandIcon } from "./brand-icon"
import { ExternalLink } from "./external-link"
import type { BrandName } from "../lib/brand-marks"

export interface Source {
  /** The source's name as it writes it: «Last.fm», «Yr». */
  name: string
  /** Its mark, drawn before the name; none for a source that has no mark in `BrandIcon`. */
  brand?: BrandName
  /** Where the name links to: the source's own site. */
  href: string
  /** What the page gets from it, in a sentence. */
  description: ReactNode
  /** What its licence or terms ask to be said («© OpenStreetMap-bidragsytere»), after the description. */
  credit?: ReactNode
}

/**
 * Where an app's data comes from, said once (at the foot of «Innstillinger») rather than on every page that uses it: each source with
 * its mark beside its name, the name linking to the source, what the app gets from it, and the credit its terms ask for. A description
 * list: the source is the term, what it gives is the value.
 */
export function SourceList({ sources }: { sources: readonly Source[] }) {
  if (sources.length === 0) return null
  return (
    <dl className="grid gap-4 text-sm">
      {sources.map((source) => (
        <div key={source.name} className="grid gap-1">
          <dt className="flex items-center gap-2 font-medium">
            {source.brand === undefined ? null : <BrandIcon name={source.brand} size="md" decorative />}
            <ExternalLink href={source.href}>{source.name}</ExternalLink>
          </dt>
          <dd className="text-muted-foreground">{source.description}</dd>
          {source.credit === undefined ? null : <dd className="text-muted-foreground">{source.credit}</dd>}
        </div>
      ))}
    </dl>
  )
}
