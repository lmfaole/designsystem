"use client"

import { useId, useState } from "react"

import { Icon } from "./icon"
import { LinkButton } from "./link-button"
import { Text } from "./text"
import { Button } from "./ui/button"
import type { IconName } from "../lib/icons"
import { markSeen } from "../lib/onboarding-client"

/** Where focus goes when the callout is gone: the page's heading, or its main content. */
const focusPage = (): void => {
  const target = document.querySelector<HTMLElement>("main h1") ?? document.querySelector<HTMLElement>("h1") ?? document.querySelector<HTMLElement>("main")
  if (target === null) return
  if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1")
  target.focus({ preventScroll: true })
}

/**
 * A short word about what a page is for, the first time a reader comes: in the flow of the page (not a dialog, nothing over the
 * content), dismissed once and for good. The server leaves it out when `seen` (from the `seen` cookie with `isSeen(seen, id, version)`),
 * so it never flashes; dismissing records `id@version` under `cookiePath` and moves focus to the page's heading. Raise `version` to show
 * a changed intro again. One sentence or two in `body`, and at most one `action` that goes somewhere.
 */
export function IntroCallout({ id, version = 1, seen, title, body, icon = "idea", action, cookiePath, dismissLabel = "Skjønner" }: { id: string; version?: number; seen: boolean; title: string; body: string; icon?: IconName; action?: { href: string; label: string }; cookiePath: string; dismissLabel?: string }) {
  const [dismissed, setDismissed] = useState(false)
  const titleId = useId()
  if (seen || dismissed) return null
  return (
    <section aria-labelledby={titleId} className="border-border bg-muted/40 flex items-start gap-3 rounded-lg border p-4">
      <span className="pt-0.5">
        <Icon name={icon} tone="muted" />
      </span>
      <div className="grid min-w-0 flex-1 gap-3">
        <div className="grid gap-1">
          <Text weight="medium" id={titleId}>
            {title}
          </Text>
          <Text size="sm" tone="muted">
            {body}
          </Text>
        </div>
        <div className="flex flex-wrap gap-2">
          {action === undefined ? null : (
            <LinkButton href={action.href} variant="default">
              {action.label}
            </LinkButton>
          )}
          <Button
            type="button"
            variant={action === undefined ? "outline" : "ghost"}
            onClick={() => {
              markSeen(id, version, cookiePath)
              setDismissed(true)
              focusPage()
            }}
          >
            {dismissLabel}
          </Button>
        </div>
      </div>
    </section>
  )
}
