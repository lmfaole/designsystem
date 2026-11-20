"use client"

import { useEffect } from "react"

type Control = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement

const isControl = (element: Element): element is Control => element instanceof HTMLInputElement || element instanceof HTMLSelectElement || element instanceof HTMLTextAreaElement

/** The server's answer to a step: `{ "errors": { "field": "Norsk melding" } }`, anything else is no errors. */
const errorsOf = (data: unknown): [string, string][] => {
  if (typeof data !== "object" || data === null || !("errors" in data)) return []
  const errors = data.errors
  if (typeof errors !== "object" || errors === null) return []
  return Object.entries(errors).filter((entry): entry is [string, string] => typeof entry[1] === "string" && entry[1] !== "")
}

const withoutErrorIds = (value: string | null): string =>
  (value ?? "")
    .split(/\s+/)
    .filter((token) => token !== "" && !token.endsWith("-error"))
    .join(" ")

/** Makes the `FirstRun` with `id` a wizard; returns what undoes it. */
function enhance(id: string, modal: boolean): () => void {
  const dialog = document.getElementById(id)
  if (!(dialog instanceof HTMLDialogElement)) return () => undefined
  const form = dialog.querySelector("form")
  const steps = [...dialog.querySelectorAll<HTMLElement>("[data-step]")]
  const back = dialog.querySelector<HTMLButtonElement>("[data-first-run-back]")
  const next = dialog.querySelector<HTMLButtonElement>("[data-first-run-next]")
  const done = dialog.querySelector<HTMLButtonElement>("[data-first-run-done]")
  if (form === null || back === null || next === null || done === null || steps.length === 0) return () => undefined
  const progress = dialog.querySelector<HTMLElement>("[data-first-run-progress]")
  const count = dialog.querySelector<HTMLElement>("[data-first-run-count]")
  const segments = [...dialog.querySelectorAll<HTMLElement>("[data-first-run-segment]")]
  const template = dialog.querySelector("template[data-first-run-error]")
  const url = dialog.dataset["validateUrl"]
  let index = Math.max(
    0,
    steps.findIndex((step) => step.dataset["step"] === dialog.dataset["initialStep"]),
  )
  let busy = false
  let checked = false

  const heading = (step: HTMLElement | undefined) => step?.querySelector<HTMLElement>("[data-step-heading]") ?? null

  const show = (to: number, direction: "forward" | "back" | "none", focus: boolean) => {
    index = to
    dialog.dataset["direction"] = direction
    steps.forEach((step, at) => {
      step.hidden = at !== to
    })
    back.hidden = to === 0
    next.hidden = to === steps.length - 1
    done.hidden = to !== steps.length - 1
    segments.forEach((segment, at) => segment.toggleAttribute("data-done", at <= to))
    if (count !== null) {
      count.textContent = `${to + 1} av ${steps.length}`
      count.hidden = false
    }
    if (progress !== null) progress.hidden = false
    dialog.scrollTo({ top: 0 })
    if (focus) heading(steps[to])?.focus({ preventScroll: true })
  }

  const clearErrors = (step: HTMLElement) => {
    for (const error of step.querySelectorAll("[data-error]")) error.remove()
    for (const element of step.querySelectorAll("[aria-invalid]")) element.removeAttribute("aria-invalid")
    for (const element of step.querySelectorAll("[aria-describedby]")) {
      const kept = withoutErrorIds(element.getAttribute("aria-describedby"))
      if (kept === "") element.removeAttribute("aria-describedby")
      else element.setAttribute("aria-describedby", kept)
    }
  }

  /** The error under its field, as the server draws it, or under the step's heading where the field is not in the step; returns the field to focus. */
  const showError = (step: HTMLElement, name: string, message: string): HTMLElement | null => {
    // Drawn on the server, the model is in the template's content; drawn by React in the browser, it is a child of the template.
    const model = template instanceof HTMLTemplateElement ? (template.content.firstElementChild ?? template.firstElementChild)?.cloneNode(true) : null
    if (!(model instanceof HTMLElement)) return null
    model.querySelector("[data-error-message]")?.replaceChildren(message)
    const found = form.elements.namedItem(name)
    const controls = (found instanceof RadioNodeList ? [...found] : found === null ? [] : [found]).filter((element): element is Control => element instanceof Element && isControl(element) && step.contains(element))
    const first = controls[0]
    if (first === undefined) {
      model.id = `${id}-${step.dataset["step"] ?? ""}-${name}-error`
      step.querySelector("[data-step-errors]")?.append(model)
      return null
    }
    model.id = `${name}-error`
    const holder = first.closest("[data-field]")
    const described = holder instanceof HTMLFieldSetElement ? holder : first
    if (holder instanceof HTMLFieldSetElement) holder.lastElementChild?.before(model)
    else first.before(model)
    for (const control of controls) control.setAttribute("aria-invalid", "true")
    described.setAttribute("aria-describedby", `${withoutErrorIds(described.getAttribute("aria-describedby"))} ${model.id}`.trim())
    return first
  }

  /** The browser's own checks of the step's fields, then the server's (`validateUrl`); true when it may be left. */
  const validate = async (step: HTMLElement): Promise<boolean> => {
    const controls = [...step.querySelectorAll("input, select, textarea")].filter(isControl)
    const invalid = controls.find((control) => !control.checkValidity())
    if (invalid !== undefined) {
      invalid.reportValidity()
      return false
    }
    if (url === undefined || url === "") return true
    const names = new Set(controls.map((control) => control.name).filter((name) => name !== ""))
    const body = new FormData()
    for (const [key, value] of new FormData(form)) if (names.has(key)) body.append(key, value)
    body.append("validate", step.dataset["step"] ?? "")
    let data: unknown = null
    try {
      const response = await fetch(url, { method: "POST", body, headers: { accept: "application/json" }, credentials: "same-origin" })
      data = await response.json()
    } catch {
      // Not reached, or not understood: the server checks everything again at the end.
      return true
    }
    clearErrors(step)
    const errors = errorsOf(data)
    if (errors.length === 0) return true
    const fields = errors.map(([name, message]) => showError(step, name, message))
    const target = fields.find((field) => field !== null) ?? heading(step)
    target?.focus()
    return false
  }

  const forward = async () => {
    if (busy) return
    busy = true
    next.setAttribute("aria-busy", "true")
    next.setAttribute("aria-disabled", "true")
    const step = steps[index]
    const ok = step === undefined ? false : await validate(step)
    busy = false
    next.removeAttribute("aria-busy")
    next.removeAttribute("aria-disabled")
    if (ok && index < steps.length - 1) show(index + 1, "forward", true)
  }
  const backward = () => {
    if (index > 0) show(index - 1, "back", true)
  }
  const onNext = () => void forward()

  // Enter in a field goes on to the next step, as «Neste»; on the last it sends the form, as «Ferdig».
  const onKey = (event: KeyboardEvent) => {
    const target = event.target
    if (event.key !== "Enter" || !(target instanceof HTMLInputElement) || index === steps.length - 1) return
    if (["checkbox", "radio", "button", "submit"].includes(target.type)) return
    event.preventDefault()
    void forward()
  }

  // «Ferdig»: every step by the browser's checks (showing the first that fails), the last one by the server's too, and then it is sent.
  const onSubmit = (event: SubmitEvent) => {
    if (checked || (event.submitter instanceof HTMLButtonElement && event.submitter.name === "skip")) return
    event.preventDefault()
    const failing = steps.findIndex((step) => [...step.querySelectorAll("input, select, textarea")].filter(isControl).some((control) => !control.checkValidity()))
    if (failing !== -1 && failing !== index) {
      show(failing, failing < index ? "back" : "forward", false)
    }
    const step = steps[failing === -1 ? index : failing]
    if (step === undefined) return
    void validate(step).then((ok) => {
      if (!ok || failing !== -1) return
      checked = true
      form.requestSubmit(done)
    })
  }

  // Esc does not leave it: «Hopp over» is the way out, and it says so to the server.
  const onCancel = (event: Event) => event.preventDefault()

  dialog.toggleAttribute("data-enhanced", true)
  show(index, "none", false)
  back.addEventListener("click", backward)
  next.addEventListener("click", onNext)
  form.addEventListener("keydown", onKey)
  form.addEventListener("submit", onSubmit)
  dialog.addEventListener("cancel", onCancel)
  const madeModal = modal && dialog.open && !dialog.matches(":modal")
  if (madeModal) {
    dialog.close()
    dialog.showModal()
    heading(steps[index])?.focus({ preventScroll: true })
  }

  return () => {
    back.removeEventListener("click", backward)
    next.removeEventListener("click", onNext)
    form.removeEventListener("keydown", onKey)
    form.removeEventListener("submit", onSubmit)
    dialog.removeEventListener("cancel", onCancel)
    dialog.removeAttribute("data-enhanced")
    delete dialog.dataset["direction"]
    for (const step of steps) step.hidden = false
    back.hidden = true
    next.hidden = true
    done.hidden = false
    if (count !== null) count.hidden = true
    if (progress !== null) progress.hidden = true
    if (madeModal) {
      dialog.close()
      dialog.show()
    }
  }
}

/**
 * What makes a `FirstRun` a wizard in the browser, found by its `id`: one step at a time with «Trinn 2 av 7» and a bar, «Tilbake» and «Neste», focus on each step's heading, each
 * step checked before the next (the browser's own checks, then `validateUrl` with the step's fields and `validate=<step>`, answered `{ "errors": { "field": "melding" } }`, shown under
 * the fields), and a modal (`showModal`: the page behind is inert and does not scroll, focus stays in it, Esc does nothing). Draws nothing. Two parts, so the server draws the wizard with
 * any fields in it, and only this and the previews are scripts. `modal={false}` keeps it in the page (a picture of it in the docs).
 */
export function FirstRunEnhancer({ id = "first-run", modal = true }: { id?: string; modal?: boolean }) {
  useEffect(() => enhance(id, modal), [id, modal])
  return null
}
