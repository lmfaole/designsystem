import { Icon } from "./icon"
import { pageWindow } from "../lib/pagination"

/**
 * The way between the pages of a long list that has an address for each page (`?side=3`). Real links, so a page can be bookmarked, shared and
 * found; «Forrige» and «Neste» carry their words, the current page is marked (`aria-current="page"`) and a gap stands where pages are left
 * out. Prefer a short list with a clear sort and filters to many pages, and never an endless list where the reader has to get to the foot (a
 * `VirtualRows` or a `progressive count` keeps one page). `hrefFor` gives the address of a page.
 */
export function Pagination({ current, total, hrefFor, label = "Sidenummer" }: { current: number; total: number; hrefFor: (page: number) => string; label?: string }) {
  if (total <= 1) return null
  const items = pageWindow(current, total)
  const link = "hover:bg-muted/50 focus-visible:ring-ring inline-flex min-h-9 min-w-9 items-center justify-center gap-1 rounded-md px-2 text-sm focus-visible:ring-2 focus-visible:outline-none"
  return (
    <nav aria-label={label}>
      <ul className="flex flex-wrap items-center gap-1">
        {current > 1 ? (
          <li>
            <a href={hrefFor(current - 1)} rel="prev" className={link}>
              <Icon name="back" size="sm" />
              Forrige
            </a>
          </li>
        ) : null}
        {items.map((item, index) =>
          item === "gap" ? (
            <li key={`gap-${index}`} aria-hidden="true" className="text-muted-foreground px-1">
              …
            </li>
          ) : (
            <li key={item}>
              <a href={hrefFor(item)} {...(item === current ? { "aria-current": "page" as const } : {})} aria-label={`Side ${item}`} className={`${link} tabular-nums ${item === current ? "border font-medium" : ""}`}>
                {item}
              </a>
            </li>
          ),
        )}
        {current < total ? (
          <li>
            <a href={hrefFor(current + 1)} rel="next" className={link}>
              Neste
              <Icon name="chevron-right" size="sm" />
            </a>
          </li>
        ) : null}
      </ul>
    </nav>
  )
}
