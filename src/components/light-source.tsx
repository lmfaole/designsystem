"use client"

import { useEffect } from "react"

import { acquireLightInput } from "../lib/light-input"

/**
 * What moves the page's one light (`lib/light.ts`, `light.css`): the pointer, and, on a phone that tells how it is held, its tilt (`lib/light-input.ts`). It draws nothing, and every lit
 * `Picture size="hero"` and `NowPlayingCard` carries one, so a page needs none of its own; any number of them is the same as one. To let a reader of an iPhone switch the tilt on (iOS asks first), put a
 * `TiltButton` by the main picture. Under `prefers-reduced-motion` nothing moves the light, so it stays where it is.
 */
export function LightSource() {
  useEffect(() => acquireLightInput(), [])
  return null
}
