import type { ComponentProps } from "react"

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

/**
 * A button that opens or closes the dialog or popover with the id `commandFor`, with the browser's own invoker
 * commands, so there is no state to keep and it works before the page's scripts have loaded. A browser without them
 * (Safari before 26.2, Firefox before 144) gets the same from a click handler.
 */
export function CommandButton({ command, commandFor, onClick, type = "button", ...props }: Omit<ComponentProps<"button">, "command" | "commandfor"> & { command: Command; commandFor: string }) {
  return (
    <button
      {...props}
      type={type}
      command={command}
      commandfor={commandFor}
      onClick={(event) => {
        onClick?.(event)
        if (!("commandForElement" in HTMLButtonElement.prototype)) runCommand(command, document.getElementById(commandFor))
      }}
    />
  )
}
