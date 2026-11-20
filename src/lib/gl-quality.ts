/**
 * How much a WebGL surface asks of the machine, and how it asks for less on one that cannot keep up: it times its frames, and when the average is too slow it draws at fewer pixels, then every other frame.
 * It only ever asks for less, never for more again, so it does not flap. Pure, so a test pins it.
 */

export interface Quality {
  /** The most device pixels per CSS pixel it draws at. */
  pixelRatio: number
  /** Draws every nth frame. */
  every: number
}

export const FULL: Quality = { pixelRatio: 2, every: 1 }
export const REDUCED: Quality = { pixelRatio: 1.5, every: 1 }
export const LOW: Quality = { pixelRatio: 1, every: 2 }

/** Slower than this on average, in milliseconds a frame (a frame is 16.7 at 60 per second), and it asks for less. */
export const SLOW_MS = 24
/** How many frames are timed before a verdict. */
export const WINDOW = 30

export interface Meter {
  sum: number
  count: number
}

export const START: Meter = { sum: 0, count: 0 }

/** One more timed frame (the milliseconds since the one before, per frame drawn), and the average once `WINDOW` have been timed. A frame slower than a second is a stop (a hidden tab), not a measure. */
export function measure(meter: Meter, frameMs: number): { meter: Meter; average: number | null } {
  if (!(frameMs > 0) || frameMs > 1000) return { meter, average: null }
  const next = { sum: meter.sum + frameMs, count: meter.count + 1 }
  return next.count >= WINDOW ? { meter: START, average: next.sum / next.count } : { meter: next, average: null }
}

/** The quality after a verdict: less where the average is slow, the same otherwise. */
export function nextQuality(current: Quality, average: number): Quality {
  if (average <= SLOW_MS) return current
  if (current.every > 1) return current
  return current.pixelRatio > REDUCED.pixelRatio ? REDUCED : LOW
}
