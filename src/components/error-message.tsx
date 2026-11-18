import type { ReactNode } from "react"

import { Icon } from "./icon"

/**
 * A plain error box for a page or section whose query failed. Pass
 * `children` to override the lead-in text, e.g. for an app whose
 * user-facing copy is in a language other than English.
 */
export function ErrorMessage({
  error,
  children = "Kunne ikke laste data",
}: {
  error: Error
  children?: ReactNode
}) {
  return (
    <div
      role="alert"
      className="border-destructive/40 bg-background text-destructive flex items-start gap-2 rounded-lg border p-4 text-sm"
    >
      <span className="pt-0.5">
        <Icon name="warning" tone="destructive" />
      </span>
      <span className="min-w-0 [overflow-wrap:anywhere]">
        {children}: {error.message}
      </span>
    </div>
  )
}
