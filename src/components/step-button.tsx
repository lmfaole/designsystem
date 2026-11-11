import type { ReactNode } from "react"

import { Button } from "./ui/button"

/** A step to the day, month or year before or after: a link, so it works without JavaScript; a disabled button at the ends. */
export function StepButton({ label, href, children }: { label: string; href: string | null; children: ReactNode }) {
  if (href === null) {
    return (
      <Button variant="outline" size="icon" aria-label={label} disabled>
        {children}
      </Button>
    )
  }
  return (
    <Button asChild variant="outline" size="icon">
      <a href={href} aria-label={label}>
        {children}
      </a>
    </Button>
  )
}
