import { startTransition, useEffect, useState } from "react"

import { FIRST_ROWS, nextCount } from "./progressive-count"

type Idle = (callback: () => void) => void

const whenIdle: Idle = (callback) => (typeof requestIdleCallback === "function" ? requestIdleCallback(callback, { timeout: 200 }) : setTimeout(callback, 16))

/**
 * How many of `total` rows to draw now: the first ones on the server and in the first browser render (so both match),
 * then more at each idle moment until all are drawn. Each step is a transition, so a tap is never held up behind it.
 */
export function useProgressiveCount(total: number): number {
  const [count, setCount] = useState(Math.min(total, FIRST_ROWS))
  useEffect(() => {
    if (count >= total) return
    let live = true
    whenIdle(() => live && startTransition(() => setCount((now) => nextCount(now, total))))
    return () => {
      live = false
    }
  }, [count, total])
  return Math.min(count, total)
}
