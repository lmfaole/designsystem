import type { ReactNode } from "react"

import { ExternalLink } from "./external-link"
import { valuesOf, type FactValue } from "../lib/fact-values"

/**
 * Terms and what belongs to them (a description list): each term once, in the left column, and under it ONE value or SEVERAL, each
 * on a line of its own. Several things of one kind (reviewers, labels, assignees, branches) are several values of one term, stacked
 * under each other, never a comma-separated string: a list is scanned down, a sentence is read along (README, «Description lists»).
 * Terms without a value are left out, and so is the list when none is left.
 */
export function FactList({ facts }: { facts: readonly (readonly [string, FactValue<ReactNode>])[] }) {
  const shown = facts.map(([label, value]) => [label, valuesOf(value)] as const).filter(([, values]) => values.length > 0)
  if (shown.length === 0) return null
  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
      {shown.map(([label, values]) => (
        // One group per term: the term in the first column on the first row, its values in the second, one per row.
        <div key={label} className="col-span-2 grid grid-cols-subgrid gap-y-0.5">
          <dt className="text-muted-foreground col-start-1 row-start-1">{label}</dt>
          {values.map((value, index) => (
            <dd key={index} className="col-start-2 min-w-0 [overflow-wrap:anywhere]">
              {value}
            </dd>
          ))}
        </div>
      ))}
    </dl>
  )
}

/** Links out to other sites on one line; pairs without an address are left out, and so is the line when none is left. */
export function LinkList({ links }: { links: readonly (readonly [string, string | null])[] }) {
  const shown = links.filter((link): link is readonly [string, string] => link[1] !== null && link[1] !== "")
  if (shown.length === 0) return null
  return (
    <p className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
      {shown.map(([label, href]) => (
        <ExternalLink key={label} href={href}>
          {label}
        </ExternalLink>
      ))}
    </p>
  )
}
