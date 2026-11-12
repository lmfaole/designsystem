import type { ReactNode } from "react"

import { cn } from "cn"

/**
 * A link out to another site: underlined, and opened without handing the new page a `window.opener` reference.
 * `rel` is not a prop: it is a safety property, not a preference. For a link inside running text the underline is enough;
 * `look="pill"` is the bordered form a row of links to a thing's other sites takes.
 */
export function ExternalLink({ href, look = "text", children }: { href: string; look?: "text" | "pill"; children: ReactNode }) {
  return (
    <a href={href} className={cn(look === "pill" ? "rounded-full border px-3 py-1 no-underline hover:bg-muted" : "underline underline-offset-4")} rel="noopener noreferrer">
      {children}
    </a>
  )
}
