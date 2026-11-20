/**
 * The system's one light. A light has a place: `x` and `y` run from -1 to 1 across the screen (x to the right, y down), and it is where the light is
 * FROM, so a light at the upper left (the default) throws shadows to the lower right. What lets a surface shine or throw a shadow reads it: CSS
 * through `--light-x` and `--light-y` (`light.css`), the WebGL disc straight from the store. The light follows the pointer, and on a phone its tilt
 * (`LightSource`); without either it stays where it is. Pure, so a test pins it.
 */

export interface Light {
  x: number
  y: number
}

/** The upper left, a little high: how a page is lit when nothing moves the light. */
export const DEFAULT_LIGHT: Light = { x: -0.5, y: -0.7 }

const clamp = (value: number, low = -1, high = 1): number => Math.min(Math.max(value, low), high)

/** The light at the pointer: where it is on the screen, from -1 at one edge to 1 at the other. A screen with no size gives the default. */
export function lightFromPointer(clientX: number, clientY: number, width: number, height: number): Light {
  if (!(width > 0) || !(height > 0)) return DEFAULT_LIGHT
  return { x: clamp((clientX / width) * 2 - 1), y: clamp((clientY / height) * 2 - 1) }
}

/**
 * The light from how a phone is held (`deviceorientation`): `gamma` is the tilt to the sides and `beta` the tilt forward, both in degrees. The phone held as it is read
 * (about 45° forward) gives the default's height; tilting it moves the light across the screen, as light that stays where it is would move across a tilted surface.
 * A reading that is not a number (a desktop browser sends nulls) gives the default.
 */
export function lightFromTilt(beta: number | null, gamma: number | null): Light {
  if (beta === null || gamma === null || !Number.isFinite(beta) || !Number.isFinite(gamma)) return DEFAULT_LIGHT
  return { x: clamp(0 - gamma / 35), y: clamp((beta - 45) / -35 - 0.35) }
}

/** A step of the light towards where it should be, at a pace that does not depend on the frame rate: it covers half the distance in `halfLifeMs`. */
export function approach(current: Light, target: Light, elapsedMs: number, halfLifeMs = 120): Light {
  if (!(elapsedMs > 0)) return current
  const share = 1 - Math.pow(0.5, elapsedMs / halfLifeMs)
  return { x: current.x + (target.x - current.x) * share, y: current.y + (target.y - current.y) * share }
}

/** Where a shadow of height `distance` falls: away from the light. */
export function shadowOffset(light: Light, distance: number): Light {
  return { x: -light.x * distance, y: -light.y * distance }
}

/** The direction the light comes from, in radians (0 is to the right, a quarter turn is down). */
export const lightAngle = (light: Light): number => Math.atan2(light.y, light.x)

/** True for a light that has not moved enough to be seen: where a smoothing loop may rest. */
export const settled = (a: Light, b: Light): boolean => Math.abs(a.x - b.x) < 0.002 && Math.abs(a.y - b.y) < 0.002

/**
 * The light every part of a page shares: `target` is where the sources (pointer, tilt) want it and `current` where it is, smoothed. `LightSource` moves them; the CSS
 * variables and the WebGL discs read `current`. One per bundle, so an island of its own sees the same light as the rest of the page.
 */
export const lightStore: { target: Light; current: Light; listeners: Set<() => void> } = { target: DEFAULT_LIGHT, current: DEFAULT_LIGHT, listeners: new Set() }
