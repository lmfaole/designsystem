import type { ReactNode } from "react"

import type { IconName } from "../lib/icons"
import { FieldError } from "./field-error"
import { Icon } from "./icon"
import { Text } from "./text"
import { Button } from "./ui/button"

export type FirstRunStep = {
  /** Names the step: its anchor (`#<id>-<step>`), what `initialStep` and the server's `validate` say. */
  id: string
  title: string
  /** A sentence or two on what the step is for. */
  body?: string
  icon?: IconName
  /** The step's fields: the native ones (`TextField`, `ChoiceCards`, `CheckboxList`, `ListField`) and the previews (`EffectsPreview`, `TiltPreview`). */
  content?: ReactNode
}

/**
 * The first visit's introduction: the whole screen, a few calm steps where the visitor makes the app theirs (a username, what to show, the theme, the effects), and one form
 * (`method="post"` to `action`) that the server reads at the end, with the page to go back to in `back`. The server draws it `open` when the `seen` cookie lacks it, so nothing
 * flashes. Without JavaScript every step stands under the other in one scrolling page with one «Ferdig»; with `FirstRunEnhancer` (by `id`) it is a modal with one step at a time,
 * «Trinn 2 av 7» and a bar, «Tilbake» and «Neste», each step checked by `validateUrl` before the next. «Hopp over» (`skip=1`, without the browser's checks) leaves it for good at any
 * step. `initialStep` is where it opens (after the server found an error there); without JavaScript the server's redirect adds `#<id>-<step>` to scroll to it. Its look and
 * motion are in `first-run.css`.
 */
export function FirstRun({ id = "first-run", open, title, action, back, steps, initialStep, submitLabel = "Ferdig", nextLabel = "Neste", backLabel = "Tilbake", skipLabel = "Hopp over", validateUrl }: { id?: string; open: boolean; title: string; action: string; back: string; steps: readonly FirstRunStep[]; initialStep?: string; submitLabel?: string; nextLabel?: string; backLabel?: string; skipLabel?: string; validateUrl?: string }) {
  const titleId = `${id}-title`
  return (
    <dialog id={id} open={open} closedby="none" aria-labelledby={titleId} data-first-run="" data-initial-step={initialStep} data-validate-url={validateUrl}>
      <form method="post" action={action} data-first-run-form="">
        <input type="hidden" name="back" value={back} />
        <header data-first-run-header="">
          <div data-first-run-column="" className="grid gap-2">
            <div className="flex items-baseline justify-between gap-4">
              <p id={titleId} className="min-w-0 truncate font-medium">
                {title}
              </p>
              <Text as="span" size="sm" tone="muted" numeric>
                <span data-first-run-count="" hidden />
              </Text>
            </div>
            <div data-first-run-progress="" aria-hidden="true" hidden className="flex gap-1">
              {steps.map((step) => (
                <span key={step.id} data-first-run-segment="" className="bg-muted data-done:bg-primary h-1 flex-1 rounded-full transition-colors duration-(--motion-duration-reveal)" />
              ))}
            </div>
          </div>
        </header>
        <div data-first-run-steps="" data-first-run-column="">
          {steps.map((step, index) => (
            <section key={step.id} id={`${id}-${step.id}`} data-step={step.id} aria-labelledby={`${id}-${step.id}-title`} className="grid content-start gap-6">
              <div className="grid justify-items-start gap-4">
                {step.icon === undefined ? null : (
                  <span className="bg-muted text-foreground grid size-12 place-items-center rounded-full">
                    <Icon name={step.icon} size="lg" />
                  </span>
                )}
                <h2 id={`${id}-${step.id}-title`} tabIndex={-1} data-step-heading="" className="grid gap-1 outline-none">
                  <span className="text-muted-foreground text-sm font-medium">
                    Trinn {index + 1} av {steps.length}
                    <span className="sr-only">: </span>
                  </span>
                  <span className="font-heading text-2xl font-semibold tracking-tight text-balance sm:text-3xl">{step.title}</span>
                </h2>
                {step.body === undefined ? null : (
                  <Text size="lg" tone="muted">
                    {step.body}
                  </Text>
                )}
                <div data-step-errors="" className="empty:hidden" />
              </div>
              {step.content === undefined ? null : <div className="grid gap-6">{step.content}</div>}
            </section>
          ))}
        </div>
        <footer data-first-run-footer="">
          <div data-first-run-column="" className="grid gap-1">
            <div className="flex items-center gap-2">
              <Button type="button" variant="ghost" size="lg" data-first-run-back="" hidden>
                <Icon name="arrow-left" slot="start" />
                {backLabel}
              </Button>
              <span className="flex-1" />
              <Button type="button" size="lg" data-first-run-next="" hidden>
                {nextLabel}
                <Icon name="arrow-right" slot="end" />
              </Button>
              <Button type="submit" size="lg" data-first-run-done="">
                {submitLabel}
                <Icon name="done" slot="end" />
              </Button>
            </div>
            <div className="flex justify-center">
              <Button type="submit" name="skip" value="1" formNoValidate variant="link" size="sm" className="text-muted-foreground">
                {skipLabel}
              </Button>
            </div>
          </div>
        </footer>
        {/* The model of an error from the server, for the enhancer to copy under a field. Not a <template>: React draws a template's children into the element on the client but into its
            content on the server, so it would not hydrate. Hidden, it is not seen, read or sent. */}
        <div hidden data-first-run-error="">
          <FieldError id={`${id}-error-model`}>{null}</FieldError>
        </div>
      </form>
    </dialog>
  )
}
