import type { ReactNode } from "react"

import { PAGE_COLUMN, PAGE_PADDING_Y } from "../lib/page-width"

/**
 * How an app puts things next to and under each other without a class of its own (`docs/UI-COMPONENTS.md`): every choice
 * is one of a few named steps, so two pages cannot end up with spacings that almost match. The classes are written out
 * whole, since Tailwind reads them as text.
 */
const GAPS = { none: "gap-0", xs: "gap-1", sm: "gap-2", md: "gap-4", lg: "gap-6", xl: "gap-8" } as const
const ALIGN = { center: "items-center", baseline: "items-baseline" } as const
const JUSTIFY = { start: "justify-start", between: "justify-between" } as const
const COLUMNS = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4",
  4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6",
  /** Parts of a page side by side: as many as fit at least 28rem each, the rest under. */
  sections: "grid-cols-[repeat(auto-fit,minmax(min(100%,28rem),1fr))]",
  /** Charts: two or three across on a desktop. */
  charts: "grid-cols-[repeat(auto-fit,minmax(min(100%,24rem),1fr))]",
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
export function Inline({ as: Tag = "div", gap = "sm", align = "center", justify = "start", children, ...rest }: BoxProps & { align?: keyof typeof ALIGN; justify?: keyof typeof JUSTIFY }) {
  return (
    <Tag className={`flex min-w-0 flex-wrap ${GAPS[gap]} ${ALIGN[align]} ${JUSTIFY[justify]}`} {...rest}>
      {children}
    </Tag>
  )
}

/** Things in columns: a number is the count on a desktop and grows on a very wide screen, `tiles`, `cards`, `sections` and `charts` fit as many as there is room for. */
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
    <Tag className={`${PAGE_COLUMN} grid content-start ${PAGE_PADDING_Y} ${GAPS[gap]}`} {...rest}>
      {children}
    </Tag>
  )
}

/**
 * A rail beside the main content on a wide screen (facts, a cover, the numbers) and above it on a narrow one. The rail
 * comes first in the document and stays in view while the main content scrolls. The container query follows the room
 * the page has, not the screen.
 */
export function Split({ rail, children, gap = "xl" }: { rail: ReactNode; children: ReactNode; gap?: Gap }) {
  return (
    <div className="@container min-w-0">
      <div className={`grid min-w-0 items-start ${GAPS[gap]} @4xl:grid-cols-[minmax(16rem,22rem)_minmax(0,1fr)]`}>
        <aside className="grid min-w-0 content-start gap-4 @4xl:sticky @4xl:top-4">{rail}</aside>
        <div className="grid min-w-0 content-start gap-6">{children}</div>
      </div>
    </div>
  )
}
