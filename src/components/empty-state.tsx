import { isValidElement, type ReactNode } from "react"

import { Icon } from "./icon"
import { LinkButton } from "./link-button"
import { Text } from "./text"
import type { IconName } from "../lib/icons"

const isLink = (action: unknown): action is { href: string; label: string } =>
  typeof action === "object" && action !== null && !isValidElement(action) && "href" in action && "label" in action

/**
 * Where a list or a page has nothing to show: what it would hold, and, when there is something to do about it, one next step. It
 * replaces the whole empty structure (no table with headers over no rows), stays in the reading column, and has no illustration
 * and no joke. Say why it is empty when the reader can change that («Ingen treff. Prøv færre filtre.») and say plainly when nothing
 * is wrong («Ingen åpne pull requests. Alt er behandlet.»). Where many sections of a front page are empty at once, leave out the
 * `action` and the icon: a quiet line is enough. The action is a link (`{ href, label }`) or, where the next step is not a link (a
 * form, a `CommandButton`), another component of this package.
 */
export function EmptyState({ title, description, icon, action }: { title: string; description?: string; icon?: IconName; action?: { href: string; label: string } | ReactNode }) {
  return (
    <div className="grid justify-items-start gap-2">
      {icon === undefined ? null : <Icon name={icon} tone="muted" />}
      <Text weight="medium">{title}</Text>
      {description === undefined ? null : (
        <Text size="sm" tone="muted">
          {description}
        </Text>
      )}
      {isLink(action) ? <LinkButton href={action.href}>{action.label}</LinkButton> : action}
    </div>
  )
}
