import { Icon } from "./icon"
import { Text } from "./text"

const TYPES = ["text", "search", "email", "url", "number"] as const

/**
 * One native text input with everything the reader needs beside it: the label above (always visible, never a placeholder), a hint
 * for the format, and the error, tied to the input with `aria-describedby`. The error is shown in words with a symbol and begins with
 * a hidden «Feil:» for a screen reader. Validate on submit, not while typing, and give the same words here and in the
 * `FormErrorSummary`. Mark only the minority: `optional` writes «(valgfritt)» when most fields are required. Read-only is shown as text
 * in a `FactList`; avoid `disabled` and say why instead. `name` is the id of the field, so a summary can link to it.
 */
export function TextField({ label, name, type = "text", hint, error, optional = false, defaultValue, autoComplete }: { label: string; name: string; type?: (typeof TYPES)[number]; hint?: string; error?: string; optional?: boolean; defaultValue?: string; autoComplete?: string }) {
  const hintId = `${name}-hint`
  const errorId = `${name}-error`
  const described = [hint === undefined ? null : hintId, error === undefined ? null : errorId].filter((id) => id !== null).join(" ")
  return (
    <div className="grid gap-1">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
        {optional ? <span className="text-muted-foreground font-normal"> (valgfritt)</span> : null}
      </label>
      {hint === undefined ? null : (
        <Text size="sm" tone="muted" id={hintId}>
          {hint}
        </Text>
      )}
      {error === undefined ? null : (
        <p id={errorId} className="text-destructive flex items-start gap-1 text-sm font-medium">
          <Icon name="warning" size="sm" tone="destructive" />
          <span>
            <span className="sr-only">Feil: </span>
            {error}
          </span>
        </p>
      )}
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        autoComplete={autoComplete}
        aria-invalid={error === undefined ? undefined : true}
        aria-describedby={described === "" ? undefined : described}
        className={`border-input bg-background focus-visible:ring-ring h-9 w-full rounded-md border px-3 text-base focus-visible:ring-2 focus-visible:outline-none ${error === undefined ? "" : "border-destructive"}`}
      />
    </div>
  )
}
