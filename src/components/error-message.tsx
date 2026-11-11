import type { ReactNode } from "react"

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
      className="border-destructive/40 bg-background text-destructive rounded-lg border p-4 text-sm"
    >
      {children}: {error.message}
    </div>
  )
}
