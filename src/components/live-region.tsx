import type { ReactNode } from "react"

/**
 * A part of the page whose content changes by itself (what plays now, a count that is fetched again): what changes in it is told to a screen reader, politely, without taking its place. It must be on the page
 * before its content changes, so it is there even when it is empty. The change is for the eye as well as the ear: show it in words, never only by movement.
 */
export function LiveRegion({ children }: { children?: ReactNode }) {
  return (
    <div aria-live="polite" aria-atomic="true">
      {children}
    </div>
  )
}
