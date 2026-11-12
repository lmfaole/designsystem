import type { LucideIcon } from "lucide-react"

import { appUrl } from "../lib/base-url"
import { Card, CardContent } from "./ui/card"

/**
 * A page as the app's own navigation shows it: `to` is a path of the app (under its base, as `appUrl` takes it), and
 * `icon` and `description` are the page's entry in `APPS`, the one list of an app's pages.
 */
export interface AppNavLink {
  to: string
  label: string
  icon: LucideIcon
  description: string
}

/** Not a card: the page itself, and the history the front pages link under their latest list. */
const LEFT_OUT: readonly string[] = ["/", "/historikk"]

interface PageLinksProps {
  /** The app's own pages, `appPages(<id>)`, each with the line shown under its name. */
  links: readonly AppNavLink[]
  /** What the list is called to a screen reader, e.g. "More from music". */
  label: string
}

/**
 * The way into an app's other pages from its front page, one small card each with
 * its icon and name; what the page is stays for a screen reader. The front page itself is left out, and so is the
 * history: the front pages link it under their latest list instead.
 */
export function PageLinks({ links, label }: PageLinksProps) {
  const pages = links.filter((link) => !LEFT_OUT.includes(link.to))
  if (pages.length === 0) return null

  return (
    <nav aria-label={label} className="grid grid-cols-[repeat(auto-fill,minmax(11rem,1fr))] gap-2">
      {pages.map((page) => (
        <a key={page.to} href={appUrl(page.to)} data-astro-prefetch="" className="rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
          <Card className="motion-press h-full gap-0 py-3 transition-colors hover:bg-muted/50">
            <CardContent className="grid min-h-8 grid-cols-[auto_1fr] items-center gap-x-2 px-3">
              <page.icon aria-hidden="true" className="size-4 text-muted-foreground" />
              <span className="text-sm font-medium">{page.label}</span>
              <span className="sr-only">{page.description}</span>
            </CardContent>
          </Card>
        </a>
      ))}
    </nav>
  )
}
