import type { ReactNode } from "react"

import { Icon } from "./icon"
import { Text } from "./text"

const LOOKS = {
  info: { icon: "info", box: "border-border", role: "status" },
  success: { icon: "success", box: "border-border", role: "status" },
  warning: { icon: "warning", box: "border-border", role: "status" },
  destructive: { icon: "warning", box: "border-destructive/40 text-destructive", role: "alert" },
} as const

/**
 * A message about the whole page or a whole section, in the reading column above what it is about: the data is old, a source
 * failed, this is a snapshot. A message about one action or one field stands next to it, not here. It cannot be dismissed (what
 * matters stays until it is solved), there is no toast in the design system, and the symbol and the title say what kind it is, so
 * colour never carries it alone. `destructive` is only for what stops something and is announced at once (`role="alert"`);
 * `info`, `success` and `warning` are announced politely. `success` says that what the reader did has worked: «Lagret» on a settings page after the
 * server saved it and sent the reader back (`?lagret=1`), under the page's title. A failed query is an `ErrorMessage`.
 */
export function Banner({ tone = "info", title, children }: { tone?: keyof typeof LOOKS; title: string; children?: ReactNode }) {
  const look = LOOKS[tone]
  return (
    <div role={look.role} className={`flex items-start gap-3 rounded-lg border p-4 ${look.box}`}>
      <span className="pt-0.5">
        <Icon name={look.icon} tone={tone === "destructive" ? "destructive" : "muted"} />
      </span>
      <div className="grid min-w-0 gap-1">
        <Text weight="medium" tone={tone === "destructive" ? "destructive" : "default"}>
          {title}
        </Text>
        {children === undefined ? null : (
          <Text size="sm" tone={tone === "destructive" ? "destructive" : "muted"}>
            {children}
          </Text>
        )}
      </div>
    </div>
  )
}
