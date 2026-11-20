/** The selector of a native `<select>` whose options are addresses (`PeriodPicker`): the one a page's script listens to. */
export const NAVIGATING_SELECT = "select[data-navigates]"

/** Keys that move the choice of a closed `<select>` one step, each firing `change` on the way (Chrome, Safari on desktop). */
const MOVE_KEYS = new Set(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End", "PageUp", "PageDown"])

/** What a navigating select has seen since it was last left alone: a choice moved by the keyboard and not yet gone to. */
export interface SelectState {
  keyed: boolean
  pending: boolean
}

export type SelectEvent = { type: "keydown"; key: string } | { type: "change" } | { type: "focusout" }

/**
 * Whether the page goes to the chosen option now, and the state after. A choice made with the pointer, or in the open list,
 * goes at once; one stepped to with the arrow keys of a closed select waits for Enter or for focus to leave it, so a keyboard
 * reader can pass the options they did not want (WCAG 3.2.2 On input).
 */
export function decide(state: SelectState, event: SelectEvent): { go: boolean; state: SelectState } {
  switch (event.type) {
    case "keydown":
      if (event.key === "Enter" && state.pending) return { go: true, state: { keyed: false, pending: false } }
      return { go: false, state: { ...state, keyed: MOVE_KEYS.has(event.key) || (event.key.length === 1 && event.key !== " ") } }
    case "change":
      return state.keyed ? { go: false, state: { keyed: false, pending: true } } : { go: true, state: { keyed: false, pending: false } }
    case "focusout":
      return { go: state.pending, state: { keyed: false, pending: false } }
  }
}

/**
 * Makes every `select[data-navigates]` go to the `data-href` of the option chosen (`decide` says when). Listeners on the
 * document, so they cover selects of a page that is plain HTML with no island to hydrate. Returns what removes them.
 */
export function enableNavigatingSelects(doc: Document = document): () => void {
  const states = new WeakMap<HTMLSelectElement, SelectState>()
  const on = (event: Event) => {
    const select = event.target
    if (!(select instanceof HTMLSelectElement) || !select.matches(NAVIGATING_SELECT)) return
    const seen: SelectEvent = event instanceof KeyboardEvent ? { type: "keydown", key: event.key } : event.type === "change" ? { type: "change" } : { type: "focusout" }
    const { go, state } = decide(states.get(select) ?? { keyed: false, pending: false }, seen)
    states.set(select, state)
    const href = select.selectedOptions[0]?.dataset.href
    if (!go || href === undefined) return
    // The next page can take more than a second: the page says it is on its way (dimmed, `aria-busy`) until it arrives.
    busy(doc, true)
    window.location.assign(href)
  }
  // Back to a page kept in the back/forward cache: it is not on its way any more.
  const onShow = (event: PageTransitionEvent) => {
    if (event.persisted) busy(doc, false)
  }
  doc.defaultView?.addEventListener("pageshow", onShow)
  const types = ["keydown", "change", "focusout"] as const
  for (const type of types) doc.addEventListener(type, on)
  return () => {
    for (const type of types) doc.removeEventListener(type, on)
    doc.defaultView?.removeEventListener("pageshow", onShow)
  }
}

function busy(doc: Document, on: boolean): void {
  const main = doc.querySelector("main")
  if (on) main?.setAttribute("aria-busy", "true")
  else main?.removeAttribute("aria-busy")
}
