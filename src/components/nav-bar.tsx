import type { ReactNode } from "react"

import { Icon } from "./icon"
import { NavBarScroll } from "./nav-bar-scroll"
import type { IconName } from "../lib/icons"

export interface NavItem {
  key: string
  /** One word: it must fit under an icon on a phone. */
  label: string
  href: string
  icon: IconName
  /** The place you are in (for a detail page, the list it belongs to). */
  current: boolean
  /** A mark beside the place, such as a `NewBadge` for a place that is new: over the icon on a phone, after the label on the rail. */
  badge?: ReactNode
}

/**
 * The way between the top-level places of an app: a **bar at the foot of the screen on a phone** (an icon over a short label, in
 * the reach of the thumb) and a **rail down the left side from tablet width up**. It is NAVIGATION, not tabs: tabs switch
 * between views of the same content on one page; this goes to another page (Material 3 uses a navigation bar and a rail for
 * this and keeps tabs for secondary content; GOV.UK's tabs "switch views within a page", its service navigation "links across a
 * service"). Three to five places is best; more is allowed (an app's «Innstillinger» last, with the `settings` icon): on a phone the bar then scrolls sideways
 * with each place snapping into place, at least 4.5 rem wide (a place cut at the edge, and a fade there, show that there is more), and the current place is scrolled into view
 * when the page opens (`NavBarScroll`, drawn inside); the rail shows every place. One-word labels, the same order on every page, the current one marked (`aria-current="page"`).
 * Give it to `PageLayout` as `nav`: the page leaves room for it. It is chrome, not content, so it does not break the reading
 * column (README, rule 7).
 */
export function NavBar({ label, title, items }: { label: string; /** The app's name, shown at the top of the rail (not on a phone). */ title?: string; items: readonly NavItem[] }) {
  return (
    <nav
      aria-label={label}
      className="bg-background/95 fixed inset-x-0 bottom-0 z-40 border-t pb-[var(--safe-bottom)] backdrop-blur md:inset-x-auto md:inset-y-0 md:left-0 md:w-56 md:overflow-y-auto md:border-t-0 md:border-r md:px-3 md:pt-8 md:pb-6"
    >
      {title === undefined ? null : <p className="font-heading hidden px-3 pb-5 text-sm font-medium md:block">{title}</p>}
      <ul className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] data-more-end:mask-r-from-[calc(100%-2rem)] data-more-start:mask-l-from-[calc(100%-2rem)] md:snap-none md:flex-col md:gap-1 md:overflow-visible md:mask-none">
        {items.map((item) => (
          <li key={item.key} className={`min-w-[4.5rem] flex-1 snap-start md:min-w-0 md:flex-none ${item.current ? "[scroll-initial-target:nearest]" : ""}`}>
            <a
              href={item.href}
              className="group hover:bg-muted/50 flex min-h-14 flex-col items-center justify-center gap-0.5 px-1 py-1.5 text-xs md:min-h-10 md:flex-row md:justify-start md:gap-3 md:rounded-lg md:px-3 md:py-2 md:text-sm md:aria-[current=page]:bg-muted aria-[current=page]:font-medium"
              {...(item.current ? { "aria-current": "page" as const } : {})}
            >
              {/* On a phone the current place is the icon on a pill (the indicator of a navigation bar); on the rail the whole row is. */}
              <span className="group-aria-[current=page]:bg-muted relative rounded-full px-4 py-1 md:p-0 md:group-aria-[current=page]:bg-transparent">
                <Icon name={item.icon} />
                {item.badge === undefined ? null : <span className="bg-background absolute -top-2 left-1/2 rounded-full md:hidden">{item.badge}</span>}
              </span>
              <span className="truncate">{item.label}</span>
              {item.badge === undefined ? null : <span className="hidden md:ml-auto md:inline-flex">{item.badge}</span>}
            </a>
          </li>
        ))}
      </ul>
      <NavBarScroll />
    </nav>
  )
}
