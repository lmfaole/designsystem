import type { ComponentProps } from "react"

import { cn } from "cn"

// `rel` is not in the props: it is a safety property, not a preference, so a
// call site cannot opt out of it by accident.
type ExternalLinkProps = Omit<ComponentProps<"a">, "rel"> & {
  /** `medium` for a link that is the title of a row. */
  weight?: "normal" | "medium"
}

/**
 * A link out to another site: underlined, and opened without handing the new
 * page a `window.opener` reference.
 *
 * Six call sites across five apps wrote this markup by hand, which is how the
 * underline and the `rel` came to differ per app without anyone noticing. The
 * difference between the copies was never anything a reader could see, only
 * code, so there was nothing to keep.
 *
 * An app chooses `weight`; `className` stays for other components of
 * a design-system package (a pill link in a hero). For a link inside running
 * text, leave both out: the underline is enough.
 */
export function ExternalLink({ className, weight = "normal", ...props }: ExternalLinkProps) {
  return <a className={cn("underline underline-offset-4", weight === "medium" && "font-medium", className)} {...props} rel="noopener noreferrer" />
}
