import { Icon } from "./icon"
import { ENTITY_LINK } from "../lib/link-style"

/**
 * Whose data the app shows, where the reader always sees it (the head or the foot of the app's frame): «Viser data for octocat · Bytt».
 * `href` leads to the `UsernameForm`, filled in with the name, where another can be given or the name cleared.
 */
export function UserChip({ label = "Viser data for", user, href, changeLabel = "Bytt" }: { label?: string; user: string; href: string; changeLabel?: string }) {
  return (
    <p className="text-muted-foreground flex min-w-0 flex-wrap items-center gap-x-1.5 text-sm">
      <Icon name="person" size="sm" tone="muted" />
      <span>{label}</span>
      <span className="text-foreground font-medium [overflow-wrap:anywhere]">{user}</span>
      <span aria-hidden="true">·</span>
      <a href={href} className={`text-foreground ${ENTITY_LINK}`}>
        {changeLabel}
        <span className="sr-only"> brukernavn</span>
      </a>
    </p>
  )
}
