/**
 * The dot beside something live. It pulses twice when it arrives and is then still (no loop over five seconds, WCAG 2.2.2).
 * Decoration for the eye only, so it is hidden from assistive tech: say "live" in text next to it. It is still from the start
 * for anyone who asks for less motion.
 */
export function LiveDot() {
  return <span aria-hidden="true" className="motion-live inline-block size-2 rounded-full bg-primary" />
}
