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
  /** A small picture of what the choice gives (`ThemeSample`, a drawing): looked at, not used, so nothing in it can be pressed. */
  preview?: ReactNode
}

/**
 * One choice of a few, as native radio buttons on cards under each other: the whole card is the label, so it is a large target, and the
 * chosen one is marked by its border and the radio itself, never by colour alone. For a setting with two to five values that are worth a
 * word each (the theme, the effects); a long list is a `NativeSelect`. `value` is the one chosen when the page is drawn. Works without
 * JavaScript; the arrow keys move between the choices as in any radio group. `error` is the server's word, as in `TextField`.
 */
export function ChoiceCards({ name, legend, value, options, hint, error }: { name: string; legend: string; value?: string; options: readonly ChoiceCardOption[]; hint?: string; error?: string }) {
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
    </fieldset>
  )
}
