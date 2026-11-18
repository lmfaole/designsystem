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
 * The state of a whole place in a line of counts, each a link to the page that lists them: «2 blokkert · 1 klar til merge ·
 * 14 venter på din review». It goes first on a front page, before any list: the reader sees what needs them, then reads the
 * detail only where it does. Leave out the counts that are zero.
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
