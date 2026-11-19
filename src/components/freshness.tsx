"use client"

import { useEffect, useState } from "react"

import { Icon } from "./icon"
import { describeFreshness } from "../lib/freshness"

/** How often the line looks at the clock again. */
const LOOK_SECONDS = 30

/**
 * When the data on the page was made («Oppdatert 19:27»), and, when it is older than it should be, that it may be out of date. A page that
 * renews itself gets a new `at` each time; if the renewal stops (no network, a source that fails) `at` stays, the age grows and the line
 * turns into a warning in words and a symbol, so a failed renewal shows without anything having to detect it. `now` is the server's time,
 * so the first render is the same on the server and in the browser; after that the line follows the device's clock. It is a still line, not
 * a live region: the reader finds it, it does not interrupt (a change that matters is a `Banner`). Set `staleAfterSeconds` for the source,
 * a few times how often it renews.
 */
export function Freshness({ at, now, staleAfterSeconds }: { at: string; now: string; staleAfterSeconds: number }) {
  const [current, setCurrent] = useState(() => new Date(now))
  useEffect(() => {
    const look = () => setCurrent(new Date())
    look()
    const timer = setInterval(look, LOOK_SECONDS * 1000)
    document.addEventListener("visibilitychange", look)
    return () => {
      clearInterval(timer)
      document.removeEventListener("visibilitychange", look)
    }
  }, [])
  const fresh = describeFreshness(at, current, staleAfterSeconds)
  if (fresh === null) return null
  if (!fresh.stale) return <span>Oppdatert {fresh.clock}</span>
  return (
    <span className="inline-flex items-center gap-1 font-medium">
      <Icon name="warning" size="sm" />
      Oppdatert {fresh.clock} · dataene kan være gamle
    </span>
  )
}
