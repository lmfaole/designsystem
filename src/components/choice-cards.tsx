import type { ReactNode } from "react"

import type { IconName } from "../lib/icons"
import { FieldError } from "./field-error"
import { Icon } from "./icon"
import { Text } from "./text"

export type ChoiceCardOption = {
  value: string
  label: string
  description?: string
  icon?: IconName
  /**
   * A picture of what the choice gives (`ThemeSample`, `EffectsPreview mode`, `TiltPreview mode`): looked at, not used, so nothing in it can be pressed. When every option has one, the cards
   * are `layout="visual"`: the picture is the card.
   */
  preview?: ReactNode
}

/** Side by side where the column has room (its own width, not the screen's): three in a row, otherwise two. */
const columns = (count: number): string => (count === 3 ? "@lg:grid-cols-3" : count > 1 ? "@md:grid-cols-2" : "")

/**
 * One choice of a few, as native radio buttons on cards: the whole card is the label, so it is a large target, and the chosen one is marked by its border, a ring, the radio itself and (as
 * pictures) a check, never by colour alone. For a setting with two to five values that are worth a word each (the theme, the effects); a long list is a `NativeSelect`. `value` is the one chosen
 * when the page is drawn. Works without JavaScript; the arrow keys move between the choices as in any radio group. `error` is the server's word, as in `TextField`.
 *
 * `layout="list"` puts the cards under each other with a small `preview` at the end; `layout="visual"` (the default when every option has a `preview`) makes the picture the card: large on top,
 * the radio, label and description under it, side by side where the column has room and under each other on a phone. Then the choice IS the example: show the effect, the theme, the light, and let
 * it be chosen.
 */
export function ChoiceCards({
  name,
  legend,
  value,
  options,
  hint,
  error,
  layout = options.length > 0 && options.every((option) => option.preview !== undefined) ? "visual" : "list",
}: {
  name: string
  legend: string
  value?: string
  options: readonly ChoiceCardOption[]
  hint?: string
  error?: string
  layout?: "list" | "visual"
}) {
  const hintId = `${name}-hint`
  const errorId = `${name}-error`
  const described = [hint === undefined ? null : hintId, error === undefined ? null : errorId].filter((id) => id !== null).join(" ")
  return (
    <fieldset id={name} className="grid min-w-0 gap-2" aria-describedby={described === "" ? undefined : described} data-field="">
      <legend className="mb-1 text-sm font-medium">{legend}</legend>
      {hint === undefined ? null : (
        <Text size="sm" tone="muted" id={hintId}>
          {hint}
        </Text>
      )}
      {error === undefined ? null : <FieldError id={errorId}>{error}</FieldError>}
      {layout === "visual" ? (
        <div className="@container">
          <div className={`grid gap-3 ${columns(options.length)}`}>
            {options.map((option) => (
              <label
                key={option.value}
                data-choice-card="visual"
                className={`group border-border bg-background hover:border-muted-foreground has-checked:border-primary has-focus-visible:ring-ring has-checked:ring-primary relative grid cursor-pointer content-start gap-3 rounded-xl border p-2 pb-3 transition-colors has-checked:ring-2 has-focus-visible:ring-2 has-focus-visible:ring-offset-2 ${error === undefined ? "" : "border-destructive"}`}
              >
                <span aria-hidden="true" className="grid overflow-hidden rounded-lg">
                  {option.preview}
                </span>
                <span aria-hidden="true" className="bg-primary text-primary-foreground absolute end-3 top-3 hidden size-7 place-items-center rounded-full shadow-sm group-has-checked:grid">
                  <Icon name="done" size="sm" />
                </span>
                <span className="flex items-start gap-3 px-1">
                  <input type="radio" name={name} value={option.value} defaultChecked={option.value === value} aria-invalid={error === undefined ? undefined : true} className="accent-primary mt-1 size-4 shrink-0" />
                  <span className="grid min-w-0 flex-1 gap-0.5">
                    <span className="flex items-center gap-2 font-medium">
                      {option.icon === undefined ? null : <Icon name={option.icon} tone="muted" />}
                      {option.label}
                    </span>
                    {option.description === undefined ? null : (
                      <Text as="span" size="sm" tone="muted">
                        {option.description}
                      </Text>
                    )}
                  </span>
                </span>
              </label>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid gap-2">
          {options.map((option) => (
            <label
              key={option.value}
              className={`border-border bg-background hover:bg-muted/40 has-checked:border-primary has-checked:bg-muted/40 has-focus-visible:ring-ring flex cursor-pointer items-center gap-3 rounded-lg border p-3 has-checked:ring-primary has-checked:ring-1 has-focus-visible:ring-2 ${error === undefined ? "" : "border-destructive"}`}
            >
              <input type="radio" name={name} value={option.value} defaultChecked={option.value === value} aria-invalid={error === undefined ? undefined : true} className="accent-primary size-4 shrink-0" />
              <span className="grid min-w-0 flex-1 gap-0.5">
                <span className="flex items-center gap-2 font-medium">
                  {option.icon === undefined ? null : <Icon name={option.icon} tone="muted" />}
                  {option.label}
                </span>
                {option.description === undefined ? null : (
                  <Text as="span" size="sm" tone="muted">
                    {option.description}
                  </Text>
                )}
              </span>
              {option.preview === undefined ? null : (
                <span aria-hidden="true" className="shrink-0">
                  {option.preview}
                </span>
              )}
            </label>
          ))}
        </div>
      )}
    </fieldset>
  )
}
