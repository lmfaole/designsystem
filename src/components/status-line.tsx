import { Icon } from "./icon"
import type { IconName } from "../lib/icons"

export interface Status {
  text: string
  /** `destructive` is for what stops something: a failure, a conflict, a change asked for. */
  tone?: "default" | "muted" | "destructive"
  /** What it means, next to the words: a status with a symbol is found at a glance, and does not depend on its colour. */
  icon?: IconName
}

const TONES = { default: "", muted: "text-muted-foreground", destructive: "text-destructive font-medium" } as const

/**
 * Short statuses on one line, each with an icon and its words (`Tester feilet`, `Godkjent`, `Venter 3 dager`). The icon
 * means the same as the words and the colour never stands alone, so a status reads the same without colour. Nothing is
 * drawn for an empty list.
 */
export function StatusLine({ items }: { items: readonly Status[] }) {
  if (items.length === 0) return null
  return (
    <ul className="flex min-w-0 flex-wrap gap-x-3 gap-y-1 text-xs">
      {items.map((item) => (
        <li key={item.text} className={`inline-flex items-center gap-1 ${TONES[item.tone ?? "default"]}`}>
          {item.icon === undefined ? null : <Icon name={item.icon} size="sm" tone={item.tone === "destructive" ? "destructive" : item.tone === "muted" ? "muted" : "inherit"} />}
          {item.text}
        </li>
      ))}
    </ul>
  )
}
