import type { ReactNode } from "react"

import { Icon } from "./icon"

/**
 * The error of one field, in words with a symbol and a hidden «Feil:» first for a screen reader: what `TextField`, `ChoiceCards`,
 * `CheckboxList` and `ListField` show under their label, tied to the field by `id` (`<name>-error`) in its `aria-describedby`.
 */
export function FieldError({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} data-error="" className="text-destructive flex items-start gap-1 text-sm font-medium">
      <Icon name="warning" size="sm" tone="destructive" />
      <span>
        <span className="sr-only">Feil: </span>
        <span data-error-message="">{children}</span>
      </span>
    </p>
  )
}
