import type { ReactNode } from "react"

import { PAGE_COLUMN, PAGE_PADDING_Y, READING_COLUMN } from "../lib/page-width"

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

/**
 * Things in columns, for what is LOOKED AT and not read: pictures (`tiles`), cards of equal weight (`cards`), charts (`charts`),
 * a few figures. A number is the count on a desktop and grows on a very wide screen; the named ones fit as many as there is
 * room for. Never for text, lists or the sections of a page: those stand under each other in the reading column (README, rule 7).
 */
export function Grid({ as: Tag = "div", gap = "md", columns = 2, children, ...rest }: BoxProps & { columns?: keyof typeof COLUMNS }) {
  return (
    <Tag className={`grid min-w-0 ${GAPS[gap]} ${COLUMNS[columns]}`} {...rest}>
      {children}
    </Tag>
  )
}

/** The column every page stands in (`PAGE_COLUMN`), with the page's parts under each other, in the reading column (`width="reading"`, the default) or across the page area (`"wide"`). */
export function PageColumn({ as: Tag = "div", gap = "lg", width = "reading", children, ...rest }: BoxProps & { width?: "reading" | "wide" }) {
  return (
    <Tag className={`${PAGE_COLUMN} ${PAGE_PADDING_Y}`} {...rest}>
      <div className={`grid content-start ${GAPS[gap]} ${width === "reading" ? READING_COLUMN : ""}`}>{children}</div>
    </Tag>
  )
}

/**
 * The main content and a PANE beside it from the `expanded` width class up (the page has 56rem of room), under or above it below that:
 * the extra width of a desktop goes to the pane, while the main content keeps the reading column's 48rem. Put it in a
 * `PageLayout width="pane"`; in the default reading column there is never room, so it stays one column.
 *
 * - `position="start"` (the default): the pane is WHO the page is about, a cover and its facts and the link out; it comes first in the
 *   document and on a phone, and at the left on a desktop, where it stays in view while the main content scrolls.
 * - `position="end"`: the pane SUPPORTS the main content (related things, help, a summary); it comes after it in the document and on a
 *   phone, and at the right on a desktop.
 *
 * Never a second list to read and never navigation: the main content is read from top to bottom, the pane is looked up.
 */
export function Split({ rail, children, gap = "xl", position = "start" }: { rail: ReactNode; children: ReactNode; gap?: Gap; position?: "start" | "end" }) {
  const pane = <aside className="grid min-w-0 content-start gap-4 @4xl:sticky @4xl:top-4">{rail}</aside>
  const main = <div className="grid min-w-0 content-start gap-6">{children}</div>
  const columns = position === "start" ? "@4xl:grid-cols-[minmax(16rem,20rem)_minmax(0,48rem)]" : "@4xl:grid-cols-[minmax(0,48rem)_minmax(16rem,20rem)]"
  return (
    <div className="@container min-w-0">
      <div className={`grid min-w-0 items-start ${GAPS[gap]} ${columns}`}>
        {position === "start" ? pane : main}
        {position === "start" ? main : pane}
      </div>
    </div>
  )
}
