import * as React from "react"

import { cn } from "../lib/utils"

type Tag = "div" | "section" | "ul" | "ol" | "dl"

type MotionProps = React.ComponentProps<"div"> & { as?: Tag }

/**
 * One block rising into place when it first shows. Movement only, no fade.
 * Use it once per mount for a block the page arrives on, never for content
 * that changes on a refetch, a sort or a filter (`docs/MOTION.md`).
 */
export function Reveal({ as = "div", className, ...props }: MotionProps) {
  return React.createElement(as, { className: cn("motion-reveal", className), ...props })
}

/**
 * A list or grid whose children rise in one after the other, six steps at
 * most. The same rules as `Reveal`: the first view only.
 */
export function Stagger({ as = "div", className, ...props }: MotionProps) {
  return React.createElement(as, { className: cn("motion-stagger", className), ...props })
}
