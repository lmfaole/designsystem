import type { ReactNode } from "react"

import { ExternalLink } from "./external-link"

/** Label and value pairs as a two-column list; pairs without a value are left out, and so is the list when none is left. */
export function FactList({ facts }: { facts: readonly (readonly [string, ReactNode])[] }) {
  const shown = facts.filter((fact) => fact[1] !== null && fact[1] !== undefined && fact[1] !== "")
  if (shown.length === 0) return null
  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
      {shown.map(([label, value]) => (
        <div key={label} className="contents">
          <dt className="text-muted-foreground">{label}</dt>
          <dd>{value}</dd>
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
