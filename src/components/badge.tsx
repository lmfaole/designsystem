import { Icon } from "./icon"
import type { IconName } from "../lib/icons"

const TONES = { default: "", muted: "text-muted-foreground", destructive: "border-destructive/40 text-destructive font-medium" } as const

/**
 * One short word about a thing, next to its name in a row: a status or a kind («Utkast», «Feilet», «Ny»). Sentence case, never
 * truncated, never a link or a button. The words carry the meaning and the icon repeats it, so it reads the same without colour;
 * `destructive` is only for what stops something. A line of statuses under a title is a `StatusLine`; a count is a `SummaryBar`.
 */
export function Badge({ tone = "default", icon, children }: { tone?: keyof typeof TONES; icon?: IconName; children: string }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs whitespace-nowrap ${TONES[tone]}`}>
      {icon === undefined ? null : <Icon name={icon} size="sm" tone={tone === "destructive" ? "destructive" : tone === "muted" ? "muted" : "inherit"} />}
      {children}
    </span>
  )
}
