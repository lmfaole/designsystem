import { FieldError } from "./field-error"
import { Text } from "./text"

export type CheckboxListOption = { value: string; label: string; description?: string }

/**
 * Some of a list, as native checkboxes in one bordered list under each other: what to show on a front page, which kinds to follow.
 * `values` are the ones ticked when the page is drawn. Each row is its label, so the whole row is the target. Sent as the same `name`
 * once per ticked box (`formData.getAll(name)`); none ticked sends nothing, so the server reads an empty list as «none» only from a form
 * that had the list. Works without JavaScript.
 */
export function CheckboxList({ name, legend, values = [], options, hint, error }: { name: string; legend: string; values?: readonly string[]; options: readonly CheckboxListOption[]; hint?: string; error?: string }) {
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
      <ul className={`divide-border bg-background divide-y rounded-lg border ${error === undefined ? "border-border" : "border-destructive"}`}>
        {options.map((option) => (
          <li key={option.value}>
            <label className="hover:bg-muted/40 has-focus-visible:ring-ring flex cursor-pointer items-start gap-3 px-3 py-2.5 has-focus-visible:ring-2 has-focus-visible:ring-inset">
              <input type="checkbox" name={name} value={option.value} defaultChecked={values.includes(option.value)} aria-invalid={error === undefined ? undefined : true} className="accent-primary mt-1 size-4 shrink-0" />
              <span className="grid min-w-0 gap-0.5">
                <span className="font-medium">{option.label}</span>
                {option.description === undefined ? null : (
                  <Text as="span" size="sm" tone="muted">
                    {option.description}
                  </Text>
                )}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </fieldset>
  )
}
