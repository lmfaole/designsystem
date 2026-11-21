import { approach, lightFromPointer, lightFromTilt, lightStore, restFrom, settled, type Light, type TiltRest } from "./light"
import { browserStorage, resolveTiltPreference, writeTiltPreference } from "./light-preference"

/**
 * What moves the page's light, once for the whole page however many parts ask (`LightSource`, `TiltButton`, every lit `Picture`): the pointer, and the tilt of a phone. The light is smoothed in a
 * loop that runs only while it is still moving, and written as `--light-x` and `--light-y` on the root. Under `prefers-reduced-motion` nothing moves it. On a phone that asks first (iOS) a tilt
 * the reader has already allowed is listened to without asking again; if nothing arrives (iOS forgets), the next tap anywhere asks, since that is what the browser wants a permission asked in.
 * The visitor's choice on `<html>` (`data-tilt="on|off"`, `lib/preferences`) comes before what the browser has kept: with `off` the tilt is not listened to at all, not even where no one is asked
 * (Android).
 */

type Permission = { requestPermission?: () => Promise<"granted" | "denied"> }
type Ask = () => Promise<"granted" | "denied">

const permissionCall = (): Ask | null => {
  const call = (window.DeviceOrientationEvent as unknown as Permission | undefined)?.requestPermission
  return typeof call === "function" ? call.bind(window.DeviceOrientationEvent) : null
}

/** True on a phone or a tablet that must be asked before it tells how it is held, and has not been answered yet: where a button for it is worth showing. */
export function tiltIsAskable(): boolean {
  if (typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false
  return permissionCall() !== null && window.matchMedia("(pointer: coarse)").matches && tiltPreference() === null
}

/** The answer that counts now: the page's `data-tilt` first, then what the browser has kept. */
function tiltPreference() {
  return resolveTiltPreference(document.documentElement.dataset.tilt, browserStorage())
}

let users = 0
let stop: (() => void) | null = null
let frame = 0
let last = 0
let tilted = false
// How the phone is held, learned from the readings: the light moves with a tilt away from it, not with the angle the hand happens to hold.
let rest: TiltRest | null = null
let lastTilt = 0
let listening = false

function wake(): void {
  if (frame !== 0) return
  last = performance.now()
  frame = requestAnimationFrame(tick)
}

function tick(now: number): void {
  frame = 0
  lightStore.current = approach(lightStore.current, lightStore.target, now - last)
  last = now
  const root = document.documentElement
  root.style.setProperty("--light-x", lightStore.current.x.toFixed(3))
  root.style.setProperty("--light-y", lightStore.current.y.toFixed(3))
  for (const listener of lightStore.listeners) listener()
  if (!settled(lightStore.current, lightStore.target)) frame = requestAnimationFrame(tick)
}

function onPointer(event: PointerEvent): void {
  if (tilted) return
  lightStore.target = lightFromPointer(event.clientX, event.clientY, window.innerWidth, window.innerHeight)
  wake()
}

function onTilt(event: DeviceOrientationEvent): void {
  if (event.beta === null || event.gamma === null) return
  tilted = true
  rest = restFrom(rest, event.beta, event.gamma, event.timeStamp - lastTilt)
  lastTilt = event.timeStamp
  lightStore.target = lightFromTilt(event.beta, event.gamma, rest)
  wake()
}

function listenToTilt(): void {
  if (listening) return
  listening = true
  window.addEventListener("deviceorientation", onTilt, { passive: true })
}

/**
 * What this device can do with its tilt: `ask` (it must ask first, iOS), `free` (a phone that tells without asking, Android), `none` (a desktop, or no sensor), `still` (`prefers-reduced-motion`:
 * nothing moves the light). For a control that offers it (`TiltPreview`).
 */
export function tiltSupport(): "ask" | "free" | "none" | "still" {
  if (typeof window === "undefined") return "none"
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "still"
  if (!("DeviceOrientationEvent" in window) || !window.matchMedia("(pointer: coarse)").matches) return "none"
  return permissionCall() === null ? "free" : "ask"
}

/** Puts the light at a place for a while, as a pointer would (a preview that shows how it moves). Nothing under `prefers-reduced-motion`, and nothing while a tilt is moving it. */
export function aimLight(light: Light): void {
  if (tilted || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
  lightStore.target = light
  wake()
}

/** Asks the reader's phone for how it is held, and keeps the answer. Call it from a tap: that is the only place the browser lets it be asked. */
export async function requestTilt(): Promise<boolean> {
  const ask = permissionCall()
  let answer: "granted" | "denied" = "granted"
  if (ask !== null) {
    try {
      answer = await ask()
    } catch {
      answer = "denied"
    }
  }
  writeTiltPreference(browserStorage(), answer === "granted" ? "on" : "denied")
  if (answer === "granted") listenToTilt()
  return answer === "granted"
}

function start(): () => void {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => undefined
  window.addEventListener("pointermove", onPointer, { passive: true })
  let timer = 0
  const regrant = () => {
    window.removeEventListener("pointerdown", regrant)
    void requestTilt()
  }
  const preference = tiltPreference()
  if (document.documentElement.dataset.tilt === "off") {
    // The visitor said no in the app's settings: the pointer moves the light, the phone does not.
  } else if (permissionCall() === null) listenToTilt()
  else if (preference === "on") {
    listenToTilt()
    // Allowed before: if nothing comes, the browser has forgotten, and the next tap (a gesture) asks again.
    timer = window.setTimeout(() => {
      if (!tilted) window.addEventListener("pointerdown", regrant, { once: true })
    }, 1500)
  }
  return () => {
    window.clearTimeout(timer)
    window.removeEventListener("pointermove", onPointer)
    window.removeEventListener("pointerdown", regrant)
    window.removeEventListener("deviceorientation", onTilt)
    listening = false
    tilted = false
    rest = null
    if (frame !== 0) cancelAnimationFrame(frame)
    frame = 0
  }
}

/** Starts moving the light for as long as something wants it; the returned function lets go, and the last to let go stops it. */
export function acquireLightInput(): () => void {
  users += 1
  if (users === 1) stop = start()
  return () => {
    users -= 1
    if (users === 0) {
      stop?.()
      stop = null
    }
  }
}
