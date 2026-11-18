import type { LucideIcon } from "lucide-react"

import { Card, CardContent } from "./ui/card"

/** A page to link to: its address, name and icon, and a line that is read by a screen reader only. */
export interface NavCardLink {
  href: string
  label: string
  icon: LucideIcon
  description: string
}

/** The way into other pages from a page, one small card each with its icon and name; what the page is stays for a screen reader. Leave out the current page before passing the links. */
export function NavCards({ links, label }: { links: readonly NavCardLink[]; /** What the list is called to a screen reader. */ label: string }) {
  if (links.length === 0) return null

  return (
    <nav aria-label={label} className="grid grid-cols-[repeat(auto-fill,minmax(11rem,1fr))] gap-2">
      {links.map((page) => (
        <a key={page.href} href={page.href} className="rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
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
