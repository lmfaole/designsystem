"use client"

import { useEffect, useRef } from "react"

/**
 * The part of `NavBar` that runs in the browser, drawn inside it (nothing to see): on a phone, where the places of a long bar scroll sideways, it brings the current place into view
 * when the page opens (where `scroll-initial-target` has not already), and marks the bar `data-more-start` / `data-more-end` while there is more to that side, which fades that edge.
 * Without it (an Astro page draws the bar without hydrating it) the bar still scrolls, and the place cut at the edge shows there is more.
 */
export function NavBarScroll() {
  const marker = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const list = marker.current?.closest("nav")?.querySelector("ul")
    if (list === null || list === undefined) return
    const mark = () => {
      const scrolls = list.scrollWidth > list.clientWidth + 1
      list.toggleAttribute("data-more-start", scrolls && list.scrollLeft > 1)
      list.toggleAttribute("data-more-end", scrolls && list.scrollLeft + list.clientWidth < list.scrollWidth - 1)
    }
    const current = list.querySelector<HTMLElement>("[aria-current=page]")?.closest("li")
    if (current !== null && current !== undefined && list.scrollWidth > list.clientWidth) {
      const left = current.offsetLeft - list.offsetLeft
      if (left < list.scrollLeft || left + current.offsetWidth > list.scrollLeft + list.clientWidth) list.scrollLeft = left - (list.clientWidth - current.offsetWidth) / 2
    }
    mark()
    list.addEventListener("scroll", mark, { passive: true })
    const observer = new ResizeObserver(mark)
    observer.observe(list)
    return () => {
      list.removeEventListener("scroll", mark)
      observer.disconnect()
      list.removeAttribute("data-more-start")
      list.removeAttribute("data-more-end")
    }
  }, [])
  return <span ref={marker} hidden />
}
