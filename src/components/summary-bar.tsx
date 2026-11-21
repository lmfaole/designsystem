import { Icon } from "./icon"
import type { IconName } from "../lib/icons"

export interface SummaryItem {
  key: string
  /** What is counted, in the plural (`blokkert`, `venter på din review`). */
  label: string
  count: number
  /** The page that lists them: a count is a link to what it counts. */
  href: string
  icon: IconName
  /** `destructive` for what stops something and is for you to fix. */
  tone?: "default" | "destructive"
}

const TONES = { default: "", destructive: "border-destructive/40 text-destructive font-medium" } as const

/**
 * The state of one kind of thing in a line of counts, each a link to the page that lists them: «2 blokkert · 1 klar til merge ·
 * 14 venter på din review». It stands with what it counts, under the title of its section (the pull requests' counts in «Pull
 * requests»), never all of a page's counts gathered at the top: the reader meets the counts where they read the detail. Leave out
 * the counts that are zero.
 */
export function SummaryBar({ label, items }: { label: string; items: readonly SummaryItem[] }) {
  if (items.length === 0) return null
  return (
    <nav aria-label={label}>
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => (
          <li key={item.key}>
            <a href={item.href} className={`hover:bg-muted/50 inline-flex min-h-9 items-center gap-1.5 rounded-full border px-3 text-sm ${TONES[item.tone ?? "default"]}`}>
              <Icon name={item.icon} tone={item.tone === "destructive" ? "destructive" : "muted"} />
              <span className="tabular-nums">{item.count}</span>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
