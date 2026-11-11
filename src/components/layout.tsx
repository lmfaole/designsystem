import type { ReactNode } from "react"

import { PAGE_COLUMN } from "../lib/page-width"

/**
 * How an app puts things next to and under each other without a class of its own (`docs/UI-COMPONENTS.md`): every choice
 * is one of a few named steps, so two pages cannot end up with spacings that almost match. The classes are written out
 * whole, since Tailwind reads them as text.
 */
const GAPS = { none: "gap-0", xs: "gap-1", sm: "gap-2", md: "gap-4", lg: "gap-6", xl: "gap-8" } as const
const ALIGN = { start: "items-start", center: "items-center", baseline: "items-baseline", end: "items-end" } as const
const JUSTIFY = { start: "justify-start", between: "justify-between", end: "justify-end" } as const
const COLUMNS = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
  tiles: "grid-cols-[repeat(auto-fill,minmax(9rem,1fr))]",
  cards: "grid-cols-[repeat(auto-fill,minmax(18rem,1fr))]",
} as const
const WIDTHS = { full: "", prose: "max-w-prose" } as const

export type Gap = keyof typeof GAPS
type Element = "div" | "section" | "ul" | "ol" | "li" | "nav" | "header" | "article" | "main" | "span"

interface BoxProps {
  /** The element: a list of things is a `ul`, a part of the page a `section`. */
  as?: Element
  gap?: Gap
  children?: ReactNode
  id?: string
  "aria-label"?: string
  "aria-labelledby"?: string
}

/** Things under each other. */
export function Stack({ as: Tag = "div", gap = "md", width = "full", children, ...rest }: BoxProps & { width?: keyof typeof WIDTHS }) {
  return (
    <Tag className={`grid min-w-0 content-start ${GAPS[gap]} ${WIDTHS[width]}`} {...rest}>
      {children}
    </Tag>
  )
}

/** Things next to each other, wrapping to a new line when the row is full. */
export function Inline({ as: Tag = "div", gap = "sm", align = "center", justify = "start", wrap = true, children, ...rest }: BoxProps & { align?: keyof typeof ALIGN; justify?: keyof typeof JUSTIFY; wrap?: boolean }) {
  return (
    <Tag className={`flex min-w-0 ${wrap ? "flex-wrap" : ""} ${GAPS[gap]} ${ALIGN[align]} ${JUSTIFY[justify]}`} {...rest}>
      {children}
    </Tag>
  )
}

/** Things in columns: a number is at most that many on a wide screen, `tiles` and `cards` fit as many as there is room for. */
export function Grid({ as: Tag = "div", gap = "md", columns = 2, children, ...rest }: BoxProps & { columns?: keyof typeof COLUMNS }) {
  return (
    <Tag className={`grid min-w-0 ${GAPS[gap]} ${COLUMNS[columns]}`} {...rest}>
      {children}
    </Tag>
  )
}

/** The column every page stands in (`PAGE_COLUMN`), with the page's parts under each other. */
export function PageColumn({ as: Tag = "div", gap = "lg", children, ...rest }: BoxProps) {
  return (
    <Tag className={`${PAGE_COLUMN} grid content-start py-8 ${GAPS[gap]}`} {...rest}>
      {children}
    </Tag>
  )
}
