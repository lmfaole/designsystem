"use client"

import { useEffect, useEffectEvent, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react"
import type { PointerEvent as ReactPointerEvent } from "react"
import { flushSync } from "react-dom"

import type { IconName } from "../lib/icons"
import { moveTo } from "../lib/reorder"
import { Icon } from "./icon"
import { Text } from "./text"
import { Button } from "./ui/button"

export type ReorderItem = { id: string; label: string; description?: string; icon?: IconName }

const subscribe = () => () => undefined

type Drag = { id: string; startY: number; startTop: number; y: number; from: number }

/** A motion token in milliseconds (`150ms` → 150); under reduced motion the tokens are next to nothing, so the movement is too. */
const motionMs = (element: Element, token: string): number => {
  const value = getComputedStyle(element).getPropertyValue(token).trim()
  const number = Number.parseFloat(value)
  if (Number.isNaN(number)) return 0
  return value.endsWith("ms") ? number : number * 1000
}

/**
 * The order of a short list, chosen by the visitor: the sections of a front page. Each row has a handle to drag (a mouse, a pen or a finger) and «Flytt opp» and «Flytt ned»
 * buttons (named with the item, for the keyboard and a screen reader); a polite live region says «Været flyttet til plass 2 av 5». The order is sent in one hidden field, `name`,
 * as comma ids (`order=vaer,transport,github`), read on the server with `orderSections` (`lib/preferences`).
 *
 * A client component with plain props (strings only), so it is drawn on the server and hydrated in Next.js, and is an island in Astro (`client:load`). Without JavaScript (or
 * before it runs) there is no handle, and the buttons are submit buttons `name="move" value="<id>:up|down"`: the app's endpoint applies `applyMove(order, move)` (`lib/reorder`)
 * to the submitted order, saves it and redirects back to the page. With JavaScript they are plain buttons that move the row in place.
 */
export function ReorderList({ name, legend, items, hint }: { name: string; legend: string; items: readonly ReorderItem[]; hint?: string }) {
  const [order, setOrder] = useState<readonly ReorderItem[]>(items)
  // False on the server and while hydrating, so the first render is the server's; true after.
  const enhanced = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  )
  const [message, setMessage] = useState("")
  const [dragging, setDragging] = useState<string | null>(null)
  const list = useRef<HTMLOListElement>(null)
  // The order as the handlers have made it, ahead of the render that shows it.
  const latest = useRef(order)
  const drag = useRef<Drag | null>(null)
  const before = useRef<Map<string, number> | null>(null)
  const focusAfter = useRef<{ id: string; direction: "up" | "down" } | null>(null)
  const hintId = `${name}-hint`

  const row = (id: string): HTMLLIElement | null => {
    for (const element of list.current?.children ?? []) if (element instanceof HTMLLIElement && element.dataset["id"] === id) return element
    return null
  }

  /** Where every row is now, so the rows that move can be moved from there (FLIP). */
  const remember = () => {
    const tops = new Map<string, number>()
    for (const element of list.current?.children ?? []) if (element instanceof HTMLLIElement) tops.set(element.dataset["id"] ?? "", element.offsetTop)
    before.current = tops
  }

  /** The dragged row under the pointer, wherever the list has put it. */
  const follow = () => {
    const current = drag.current
    const element = current === null ? null : row(current.id)
    if (current === null || element === null) return
    element.style.translate = `0 ${current.y - current.startY - (element.offsetTop - current.startTop)}px`
  }

  const announce = (id: string) => {
    const at = latest.current.findIndex((item) => item.id === id)
    const item = latest.current[at]
    if (item !== undefined) setMessage(`${item.label} flyttet til plass ${at + 1} av ${latest.current.length}`)
  }

  /** After the order has changed: the dragged row under the pointer, the others moved from where they were, and the focus back on the button that moved a row. */
  const settle = useEffectEvent((shown: readonly ReorderItem[]) => {
    const tops = before.current
    before.current = null
    follow()
    const ul = list.current
    if (tops !== null && ul !== null) {
      const duration = motionMs(ul, "--motion-duration-fast")
      for (const item of shown) {
        const element = row(item.id)
        if (element === null || item.id === drag.current?.id) continue
        const delta = (tops.get(item.id) ?? element.offsetTop) - element.offsetTop
        if (delta !== 0 && duration > 1) element.animate([{ translate: `0 ${delta}px` }, { translate: "0 0" }], { duration, easing: "ease-out" })
      }
    }
    const wanted = focusAfter.current
    focusAfter.current = null
    if (wanted !== null) {
      const buttons = row(wanted.id)?.querySelectorAll<HTMLButtonElement>("[data-move]")
      const target = [...(buttons ?? [])].toSorted((a, b) => Number(b.dataset["move"] === wanted.direction) - Number(a.dataset["move"] === wanted.direction)).find((button) => !button.disabled)
      target?.focus()
    }
  })

  useLayoutEffect(() => settle(order), [order])

  const move = (id: string, direction: "up" | "down") => {
    const from = latest.current.findIndex((item) => item.id === id)
    const to = direction === "up" ? from - 1 : from + 1
    if (from === -1 || to < 0 || to >= latest.current.length) return
    remember()
    focusAfter.current = { id, direction }
    const next = moveTo(latest.current, from, to)
    latest.current = next
    setOrder(next)
    announce(id)
  }

  const onMove = useEffectEvent((event: PointerEvent) => {
    const current = drag.current
    const element = current === null ? null : row(current.id)
    if (current === null || element === null) return
    current.y = event.clientY
    follow()
    const index = latest.current.findIndex((item) => item.id === current.id)
    const middle = element.offsetTop + element.offsetHeight / 2 + current.y - current.startY - (element.offsetTop - current.startTop)
    const previous = element.previousElementSibling
    const next = element.nextElementSibling
    let to = index
    if (next instanceof HTMLElement && middle > next.offsetTop + next.offsetHeight / 2) to = index + 1
    else if (previous instanceof HTMLElement && middle < previous.offsetTop + previous.offsetHeight / 2) to = index - 1
    if (to === index) return
    remember()
    const moved = moveTo(latest.current, index, to)
    latest.current = moved
    // At once, so the next move of the pointer measures the rows where they now are.
    flushSync(() => setOrder(moved))
  })

  const onEnd = useEffectEvent(() => {
    const current = drag.current
    drag.current = null
    setDragging(null)
    if (current === null) return
    const element = row(current.id)
    if (element !== null) {
      const offset = Number.parseFloat(element.style.translate.split(" ")[1] ?? "0") || 0
      element.style.translate = ""
      const duration = motionMs(element, "--motion-duration-fast")
      if (offset !== 0 && duration > 1) element.animate([{ translate: `0 ${offset}px` }, { translate: "0 0" }], { duration, easing: "ease-out" })
    }
    if (latest.current.findIndex((item) => item.id === current.id) !== current.from) announce(current.id)
  })

  // On the window while a row is dragged, not captured by the handle: the list may move the row (and its handle) in the page meanwhile.
  useEffect(() => {
    if (dragging === null) return
    const pointerMove = (event: PointerEvent) => onMove(event)
    const end = () => onEnd()
    window.addEventListener("pointermove", pointerMove)
    window.addEventListener("pointerup", end)
    window.addEventListener("pointercancel", end)
    return () => {
      window.removeEventListener("pointermove", pointerMove)
      window.removeEventListener("pointerup", end)
      window.removeEventListener("pointercancel", end)
    }
  }, [dragging])

  const onPointerDown = (event: ReactPointerEvent<HTMLSpanElement>, id: string) => {
    if (event.button !== 0 || drag.current !== null) return
    const element = row(id)
    if (element === null) return
    event.preventDefault()
    drag.current = { id, startY: event.clientY, startTop: element.offsetTop, y: event.clientY, from: latest.current.findIndex((item) => item.id === id) }
    // At once, so the window listens before the pointer moves on.
    flushSync(() => setDragging(id))
  }

  return (
    <fieldset id={name} className="grid min-w-0 gap-2" aria-describedby={hint === undefined ? undefined : hintId} data-field="" data-reorder-list="" data-enhanced={enhanced ? "" : undefined}>
      <legend className="mb-1 text-sm font-medium">{legend}</legend>
      {hint === undefined ? null : (
        <Text size="sm" tone="muted" id={hintId}>
          {hint}
        </Text>
      )}
      <input type="hidden" name={name} value={order.map((item) => item.id).join(",")} />
      <ol ref={list} className="divide-border bg-background border-border relative divide-y rounded-lg border">
        {order.map((item, index) => (
          <li
            key={item.id}
            data-id={item.id}
            data-dragging={dragging === item.id ? "" : undefined}
            className="bg-background data-dragging:ring-ring relative flex items-center gap-2 py-1.5 pr-1.5 pl-3 first:rounded-t-lg last:rounded-b-lg data-dragging:z-10 data-dragging:rounded-lg data-dragging:shadow-lg data-dragging:ring-2"
          >
            <span
              aria-hidden="true"
              hidden={!enhanced}
              data-reorder-handle=""
              onPointerDown={(event) => onPointerDown(event, item.id)}
              className="text-muted-foreground hover:text-foreground -ml-1.5 grid size-11 shrink-0 cursor-grab touch-none place-items-center rounded-md select-none in-data-dragging:cursor-grabbing"
            >
              <Icon name="drag" />
            </span>
            {item.icon === undefined ? null : <Icon name={item.icon} tone="muted" />}
            <span className="grid min-w-0 flex-1 gap-0.5 py-1">
              <span className="font-medium">{item.label}</span>
              {item.description === undefined ? null : (
                <Text as="span" size="sm" tone="muted">
                  {item.description}
                </Text>
              )}
            </span>
            <span className="flex shrink-0 gap-1">
              {(["up", "down"] as const).map((direction) => (
                <Button
                  key={direction}
                  variant="ghost"
                  size="icon-lg"
                  data-move={direction}
                  disabled={direction === "up" ? index === 0 : index === order.length - 1}
                  aria-label={`Flytt ${item.label} ${direction === "up" ? "opp" : "ned"}`}
                  {...(enhanced ? { type: "button" as const, onClick: () => move(item.id, direction) } : { type: "submit" as const, name: "move", value: `${item.id}:${direction}` })}
                >
                  <Icon name={direction === "up" ? "arrow-up" : "arrow-down"} />
                </Button>
              ))}
            </span>
          </li>
        ))}
      </ol>
      <p className="sr-only" aria-live="polite" aria-atomic="true" data-reorder-status="">
        {message}
      </p>
    </fieldset>
  )
}
