import { Icon } from "./icon"
import type { IconName } from "../lib/icons"
import { Button } from "./ui/button"

/**
 * A link that looks like a button, for an action that goes somewhere: «Åpne på GitHub». `external` is a link out to
 * another site: it is marked with the external symbol, opened without handing the new page a `window.opener`, and is the
 * LAST action on a page, never the first (see «Links» in the README). A link that only continues in the same place is a
 * `TextLink`, not a button.
 */
export function LinkButton({ href, external = false, variant = "outline", icon, children }: { href: string; external?: boolean; variant?: "default" | "outline" | "secondary" | "ghost"; icon?: IconName; children: string }) {
  return (
    <Button asChild variant={variant}>
      <a href={href} {...(external ? { rel: "noopener noreferrer" } : {})}>
        {icon === undefined ? null : <Icon name={icon} slot="start" />}
        {children}
        {external ? (
          <>
            <Icon name="external" slot="end" />
            <span className="sr-only"> (eksternt nettsted)</span>
          </>
        ) : null}
      </a>
    </Button>
  )
}
