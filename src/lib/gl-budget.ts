/**
 * How many WebGL surfaces a page may have at once. A browser keeps a few contexts alive and drops the oldest when a page asks for more (the picture on it then goes blank), and each one costs memory and battery.
 * Whatever draws in WebGL asks for a slot first and lets go of it when it stops; a surface that gets none shows its CSS version instead, which every one of them has. Pure, so a test pins it.
 */

export const MAX_GL_SURFACES = 4

let used = 0

/** A slot, and the function that gives it back (once); `null` where the page already has `max` surfaces. */
export function acquireGlSlot(max: number = MAX_GL_SURFACES): (() => void) | null {
  if (used >= max) return null
  used += 1
  let given = false
  return () => {
    if (given) return
    given = true
    used -= 1
  }
}

export const glSlotsInUse = (): number => used
