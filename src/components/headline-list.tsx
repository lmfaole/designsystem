import type { ReactNode } from "react"

import { ExternalLink } from "./external-link"

export interface Headline {
  key: string
  href: string
  title: string
  /** After the title, muted: where it is from and when. */
  note: ReactNode
}

/** A list of headlines, each a link out to another site with a muted note after it. */
export function HeadlineList({ headlines }: { headlines: readonly Headline[] }) {
  return (
    <ol className="grid gap-2 text-sm">
      {headlines.map((headline) => (
        <li key={headline.key}>
          <ExternalLink href={headline.href}>{headline.title}</ExternalLink>
          <span className="text-muted-foreground">
            {" "}
            · {headline.note}
          </span>
        </li>
      ))}
    </ol>
  )
}
