import type { ReactNode } from "react"

import { Icon } from "./icon"
import { Text } from "./text"
import type { IconName } from "../lib/icons"

export type PermissionCardState = "checking" | "prompt" | "pending" | "granted" | "denied" | "unsupported" | "error"

/** What the card says in each state, under the app's own `body`. */
export const PERMISSION_TEXT: Readonly<Record<PermissionCardState, string>> = {
  checking: "Sjekker om nettleseren har gitt tilgang …",
  prompt: "Nettleseren spør deg før noe deles.",
  pending: "Svar på spørsmålet fra nettleseren.",
  granted: "Tilgang gitt.",
  denied: "Tilgangen er avslått. Gi den i nettleserens innstillinger for dette nettstedet, og last siden på nytt.",
  unsupported: "Nettleseren din støtter ikke dette.",
  error: "Nettleseren svarte ikke. Prøv igjen.",
}

const STATE_ICONS: Readonly<Record<PermissionCardState, IconName | null>> = {
  checking: "pending",
  prompt: null,
  pending: "waiting",
  granted: "success",
  denied: "blocked",
  unsupported: "unknown",
  error: "warning",
}

/**
 * Asks for a permission of the browser (the position, notifications) where the page needs it, and says what happened: the app's
 * `title` and `body` say what it is for, and the card adds the state. The app's `action` (a button that asks) is shown when the browser
 * can still be asked (`prompt`) and to try again (`error`); `fallback` (another way: choose a place, search) is shown when it cannot
 * (`denied`, `unsupported`, `error`). The state is the app's, from `usePermissionState` and its own asking (`pending`, `error`); the
 * card itself has no script and renders on the server. The state line is a polite live region, so a change is announced.
 */
export function PermissionCard({ title, body, state, icon = "place", action, deniedHelp, unsupportedText, fallback }: { title: string; body: string; state: PermissionCardState; icon?: IconName; action?: ReactNode; deniedHelp?: string; unsupportedText?: string; fallback?: ReactNode }) {
  const stateIcon = STATE_ICONS[state]
  const text = state === "denied" ? (deniedHelp ?? PERMISSION_TEXT.denied) : state === "unsupported" ? (unsupportedText ?? PERMISSION_TEXT.unsupported) : PERMISSION_TEXT[state]
  const showAction = action !== undefined && (state === "prompt" || state === "error")
  const showFallback = fallback !== undefined && (state === "denied" || state === "unsupported" || state === "error")
  return (
    <div className="border-border flex items-start gap-3 rounded-lg border p-4" aria-busy={state === "checking" || state === "pending" ? true : undefined}>
      <span className="pt-0.5">
        <Icon name={icon} tone="muted" />
      </span>
      <div className="grid min-w-0 flex-1 gap-3">
        <div className="grid gap-1">
          <Text weight="medium">{title}</Text>
          <Text size="sm" tone="muted">
            {body}
          </Text>
          <p role="status" className={`flex items-start gap-1.5 text-sm ${state === "error" ? "text-destructive font-medium" : "text-muted-foreground"}`}>
            {stateIcon === null ? null : (
              <span className="pt-0.5">
                <Icon name={stateIcon} size="sm" tone={state === "error" ? "destructive" : "muted"} />
              </span>
            )}
            <span>{text}</span>
          </p>
        </div>
        {showAction || showFallback ? (
          <div className="flex flex-wrap items-center gap-2">
            {showAction ? action : null}
            {showFallback ? fallback : null}
          </div>
        ) : null}
      </div>
    </div>
  )
}
