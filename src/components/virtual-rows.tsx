import { type VirtualItem, useVirtualizer, useWindowVirtualizer } from "@tanstack/react-virtual"
import { type ReactNode, type RefObject, useEffect, useLayoutEffect, useRef, useState } from "react"

import { FIRST_ROWS } from "../lib/progressive-count"
import { spacers } from "../lib/virtual-spacers"

/** From this many rows a table draws only the rows near the screen. */
export const VIRTUAL_FROM = 150

/** The space the table leaves between rows (`gap-2`), and the height of a row until the first one has been measured. */
const GAP = 8
const ROW = 48
const OVERSCAN = 8
const TBODY = "grid gap-2"

interface Props {
  rows: ReactNode[]
  tbody: RefObject<HTMLTableSectionElement | null>
}

/** The rows on screen with a spacer above and below, in the flow of the table. */
function Placed({ rows, tbody, items, total, margin }: Props & { items: VirtualItem[]; total: number; margin: number }) {
  const { top, bottom } = spacers(items[0], items.at(-1), total, margin, GAP)
  return (
    <tbody ref={tbody} role="rowgroup" className={TBODY}>
      {top > 0 ? <tr role="presentation" aria-hidden="true" style={{ height: top }} /> : null}
      {items.map((item) => rows[item.index])}
      {bottom > 0 ? <tr role="presentation" aria-hidden="true" style={{ height: bottom }} /> : null}
    </tbody>
  )
}

/** How far the list begins below the top of its scroll area, and how high a row is: both read from the page, so they follow the layout. */
function useGeometry(tbody: Props["tbody"], offsetOf: (element: HTMLElement) => number): { margin: number; size: number } {
  const [geometry, setGeometry] = useState({ margin: 0, size: ROW })
  useLayoutEffect(() => {
    const element = tbody.current
    if (element === null) return
    const margin = Math.round(offsetOf(element))
    const size = Math.round(element.querySelector("tr:not([aria-hidden])")?.getBoundingClientRect().height ?? ROW)
    if (margin !== geometry.margin || size !== geometry.size) setGeometry({ margin, size })
  })
  return geometry
}

interface Measuring {
  measure: () => void
  getVirtualItems: () => VirtualItem[]
  getTotalSize: () => number
}

/** Puts the rows the virtualizer chose on screen, and measures again when a row turns out another height than assumed. */
function Measured({ rows, tbody, virtualizer, margin, size }: Props & { virtualizer: Measuring; margin: number; size: number }) {
  useEffect(() => {
    if (size > 0) virtualizer.measure()
  }, [virtualizer, size])
  return <Placed rows={rows} tbody={tbody} items={virtualizer.getVirtualItems()} total={virtualizer.getTotalSize()} margin={margin} />
}

function ElementRows({ rows, tbody, scroller }: Props & { scroller: HTMLElement }) {
  const { margin, size } = useGeometry(tbody, (element) => element.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop)
  const virtualizer = useVirtualizer({ count: rows.length, getScrollElement: () => scroller, estimateSize: () => size, gap: GAP, overscan: OVERSCAN, scrollMargin: margin })
  return <Measured rows={rows} tbody={tbody} virtualizer={virtualizer} margin={margin} size={size} />
}

function WindowRows({ rows, tbody }: Props) {
  const { margin, size } = useGeometry(tbody, (element) => element.getBoundingClientRect().top + window.scrollY)
  const virtualizer = useWindowVirtualizer({ count: rows.length, estimateSize: () => size, gap: GAP, overscan: OVERSCAN, scrollMargin: margin })
  return <Measured rows={rows} tbody={tbody} virtualizer={virtualizer} margin={margin} size={size} />
}

/**
 * The body of a table of hundreds of rows, drawing only the rows near the screen: inside an overlay (`data-overlay-body`
 * scrolls) it follows that, otherwise the window. The server and the first browser render draw the first rows, as a
 * short list does, and the virtual list takes over once the scroll area is known.
 */
export function VirtualTbody({ rows }: { rows: ReactNode[] }) {
  const tbody = useRef<HTMLTableSectionElement>(null)
  const [scroller, setScroller] = useState<HTMLElement | null | undefined>(undefined)
  useEffect(() => setScroller(tbody.current?.closest<HTMLElement>("[data-overlay-body]") ?? null), [])
  if (scroller === undefined) {
    return (
      <tbody ref={tbody} role="rowgroup" className={TBODY}>
        {rows.slice(0, FIRST_ROWS)}
      </tbody>
    )
  }
  return scroller === null ? <WindowRows rows={rows} tbody={tbody} /> : <ElementRows rows={rows} tbody={tbody} scroller={scroller} />
}
