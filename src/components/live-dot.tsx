import { cn } from "../lib/utils"

/**
 * The pulsing dot beside something live. Decoration for the eye only, so it is
 * hidden from assistive tech: say "live" in text next to it. It is still, not
 * pulsing, for anyone who asks for less motion.
 */
export function LiveDot({ className }: { className?: string }) {
  return <span aria-hidden="true" className={cn("motion-live inline-block size-2 rounded-full bg-primary", className)} />
}
