import type { ReactNode } from "react"

import type { InvokerCommand as Command } from "../lib/html-invokers"

function runCommand(command: Command, target: HTMLElement | null): void {
  if (target === null) return
  if (target instanceof HTMLDialogElement) {
    if (command === "show-modal") target.showModal()
    if (command === "close") target.close()
    return
  }
  if (command === "show-popover") target.showPopover()
  if (command === "hide-popover") target.hidePopover()
  if (command === "toggle-popover") target.togglePopover()
}

const LOOKS = { zoom: "cursor-zoom-in rounded-md", close: "" } as const

/**
 * A button that opens or closes the dialog or popover with the id `commandFor`, with the browser's own invoker
 * commands, so there is no state to keep and it works before the page's scripts have loaded. A browser without them
 * (Safari before 26.2, Firefox before 144) gets the same from a click handler. `look` is `close` for the overlay's own
 * close button (styled in `overlay.css`) and `zoom` for a picture that opens larger; `label` names it for a screen reader.
 */
export function CommandButton({ command, commandFor, label, look, children }: { command: Command; commandFor: string; label: string; look: keyof typeof LOOKS; children: ReactNode }) {
  return (
    <button
      type="button"
      command={command}
      commandfor={commandFor}
      aria-label={label}
      className={LOOKS[look]}
      {...(look === "close" ? { "data-overlay-close": "" } : {})}
      onClick={() => {
        if (!("commandForElement" in HTMLButtonElement.prototype)) runCommand(command, document.getElementById(commandFor))
      }}
    >
      {children}
    </button>
  )
}
