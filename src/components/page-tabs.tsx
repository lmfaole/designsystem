import { Icon } from "./icon"
import type { IconName } from "../lib/icons"

export interface PageTab {
  key: string
  label: string
  href: string
  /** What the page is, in front of its name. */
  icon?: IconName
  /** The page you are on. */
  current: boolean
  /** How much there is on the page (open pull requests, issues): shown after the name, so the number is seen before the page is opened. */
  count?: number
}

const TAB = "inline-flex min-h-10 items-center gap-1.5 rounded-lg px-3 text-sm hover:bg-muted aria-[current=page]:bg-muted aria-[current=page]:font-medium"

/**
 * The way between the sibling pages of one place (the front page and its lists): plain links, the current one marked
 * (`aria-current="page"`), so it works without a script and a screen reader says where you are. Put it under the page's title on
 * every page of the set, in the same order each time. It is for pages of the same level; a page one level down has a `BackLink`.
 */
export function PageTabs({ label, tabs }: { label: string; tabs: readonly PageTab[] }) {
  return (
    <nav aria-label={label} className="mb-6">
      <ul className="flex flex-wrap gap-1 border-b pb-2">
        {tabs.map((tab) => (
          <li key={tab.key}>
            <a href={tab.href} className={TAB} {...(tab.current ? { "aria-current": "page" as const } : {})}>
              {tab.icon === undefined ? null : <Icon name={tab.icon} />}
              {tab.label}
              {tab.count === undefined ? null : <span className="text-muted-foreground tabular-nums">{tab.count}</span>}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
