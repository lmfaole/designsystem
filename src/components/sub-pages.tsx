import { Icon } from "./icon"
import type { IconName } from "../lib/icons"

export interface SubPage {
  href: string
  label: string
  icon: IconName
  /** What the page is, in one line: the reader decides from it, so it says what is on the page, not what the page is called. */
  description: string
}

/**
 * The pages under this page, as a list under the title: an icon, the name as a link, and one line of what is on it. It is the
 * ONE way a page with subpages shows them: not as cards, not as buttons, not in a second menu. One column, in the order they matter
 * (`ICONS` and `Rows` have the same look), so the reader chooses from a list they can read, not a grid they have to scan. The page
 * itself shows what is on it below the list; the list only says where else to go.
 */
export function SubPages({ label, pages }: { label: string; pages: readonly SubPage[] }) {
  if (pages.length === 0) return null
  return (
    <nav aria-label={label} className="mb-6">
      <ul className="grid gap-1">
        {pages.map((page) => (
          <li key={page.href}>
            <a href={page.href} className="hover:bg-muted/50 grid min-h-12 grid-cols-[1rem_1fr_auto] items-start gap-x-3 rounded-lg px-2 py-2">
              <span className="pt-0.5">
                <Icon name={page.icon} tone="muted" />
              </span>
              <span className="grid min-w-0 gap-0.5">
                <span className="font-medium underline decoration-dotted underline-offset-4">{page.label}</span>
                <span className="text-muted-foreground text-sm">{page.description}</span>
              </span>
              <span className="pt-0.5">
                <Icon name="chevron-right" size="sm" tone="muted" />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
