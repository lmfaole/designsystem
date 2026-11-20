"use client"

import { useEffect, useState } from "react"

import { approach, lightFromPointer, lightFromTilt, lightStore, settled } from "../lib/light"
import { Button } from "./ui/button"

type TiltPermission = { requestPermission?: () => Promise<"granted" | "denied"> }

/**
 * What moves the page's one light (`lib/light.ts`, `light.css`): the pointer, and the tilt of a phone. Put one on a page that has something lit (`Picture disc`,
 * `NowPlayingCard` carry their own). It draws nothing, except on a phone that asks first (iOS wants a tap before it tells how it is held): then one small button, «La lyset følge telefonen».
 * Under `prefers-reduced-motion` nothing moves the light, so it stays where it is.
 */
export function LightSource() {
  const [asks, setAsks] = useState(false)
  const [tilting, setTilting] = useState(false)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let frame = 0
    let last = 0
    let tilted = false
    const root = document.documentElement
    const tick = (now: number) => {
      frame = 0
      lightStore.current = approach(lightStore.current, lightStore.target, now - last)
      last = now
      root.style.setProperty("--light-x", lightStore.current.x.toFixed(3))
      root.style.setProperty("--light-y", lightStore.current.y.toFixed(3))
      if (!settled(lightStore.current, lightStore.target)) frame = requestAnimationFrame(tick)
    }
    const wake = () => {
      if (frame !== 0) return
      last = performance.now()
      frame = requestAnimationFrame(tick)
    }
    const onPointer = (event: PointerEvent) => {
      if (tilted) return
      lightStore.target = lightFromPointer(event.clientX, event.clientY, window.innerWidth, window.innerHeight)
      wake()
    }
    const onTilt = (event: DeviceOrientationEvent) => {
      if (event.beta === null || event.gamma === null) return
      tilted = true
      lightStore.target = lightFromTilt(event.beta, event.gamma)
      wake()
    }
    window.addEventListener("pointermove", onPointer, { passive: true })
    const needsAsk = typeof (window.DeviceOrientationEvent as unknown as TiltPermission | undefined)?.requestPermission === "function"
    // Only a phone or a tablet is held: a desktop browser may have the permission call too, and has a pointer to follow.
    if (needsAsk && window.matchMedia("(pointer: coarse)").matches) setAsks(true)
    if (!needsAsk || tilting) window.addEventListener("deviceorientation", onTilt, { passive: true })
    return () => {
      window.removeEventListener("pointermove", onPointer)
      window.removeEventListener("deviceorientation", onTilt)
      if (frame !== 0) cancelAnimationFrame(frame)
    }
  }, [tilting])

  if (!asks || tilting) return null
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={() => {
        const request = (window.DeviceOrientationEvent as unknown as TiltPermission).requestPermission
        void request?.()
          .then((answer) => {
            if (answer === "granted") setTilting(true)
          })
          .catch(() => undefined)
      }}
    >
      La lyset følge telefonen
    </Button>
  )
}
