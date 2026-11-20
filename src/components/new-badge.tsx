import { Badge } from "./badge"
import { isNew } from "../lib/onboarding"

/**
 * «Nytt» beside something that has just come (a page in the navigation, a section) for a while: until `until`, and not after the
 * reader has seen it (`seen`, from the `seen` cookie with `isSeen`; a `MarkSeen` on the new page records it). `now` is passed in, as
 * for `Time`, so the server and the browser agree. Nothing is drawn when it is no longer new.
 */
export function NewBadge({ until, now, seen = false, label = "Nytt" }: { until: string; now: string; seen?: boolean; label?: string }) {
  if (seen || !isNew(until, now)) return null
  return (
    <Badge icon="new" tone="default">
      {label}
    </Badge>
  )
}
