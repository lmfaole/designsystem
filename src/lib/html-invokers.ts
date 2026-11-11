/**
 * Attributes of the newest HTML that React's types do not list yet: invoker commands (`command` and `commandfor` on a
 * button) and `closedby` on a dialog. React passes a lowercase attribute it does not know straight to the DOM.
 */
export type InvokerCommand = "show-modal" | "close" | "request-close" | "show-popover" | "hide-popover" | "toggle-popover"

declare module "react" {
  interface ButtonHTMLAttributes<T> {
    command?: InvokerCommand | undefined
    commandfor?: string | undefined
  }

  interface DialogHTMLAttributes<T> {
    closedby?: "any" | "closerequest" | "none" | undefined
  }
}
