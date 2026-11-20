"use client"

import { useEffect, useState } from "react"

import { acquireLightInput, requestTilt, tiltIsAskable } from "../lib/light-input"
import { Button } from "./ui/button"

/**
 * The one button that lets the light follow how a phone is held. It is there only where it is needed: on a phone or a tablet that asks first (iOS), that has not been answered, and not under
 * `prefers-reduced-motion`. The answer is kept in the browser (`localStorage`, `ds-light-tilt`), so a reader is asked once and not at every visit: a yes is listened to at once next time, and if the
 * browser has forgotten it, the next tap asks again; a no is not asked again. Put one by the page's main picture.
 */
export function TiltButton() {
  const [asks, setAsks] = useState(false)

  useEffect(() => {
    setAsks(tiltIsAskable())
    return acquireLightInput()
  }, [])

  if (!asks) return null
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={() => {
        void requestTilt().then(() => setAsks(false))
      }}
    >
      La lyset følge telefonen
    </Button>
  )
}
