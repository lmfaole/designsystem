import { FieldError } from "./field-error"
import { Text } from "./text"

/**
 * A time of day, as the native `<input type="time">` (the device's own picker, the 24-hour clock in Norwegian), with the label above, a hint and the error as `TextField` has them.
 * `value` is `HH:MM`, and so is what is sent. `step` is in seconds: `900` (the default) for quarters of an hour, `3600` for whole hours; the browser holds a time off the step
 * as invalid, and the server checks it again. Works without JavaScript.
 */
export function TimeField({ name, label, value, step = 900, hint, error, min, max }: { name: string; label: string; value?: string; step?: number; hint?: string; error?: string; min?: string; max?: string }) {
  const hintId = `${name}-hint`
  const errorId = `${name}-error`
  const described = [hint === undefined ? null : hintId, error === undefined ? null : errorId].filter((id) => id !== null).join(" ")
  return (
    <div className="grid justify-items-start gap-1" data-field="">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      {hint === undefined ? null : (
        <Text size="sm" tone="muted" id={hintId}>
          {hint}
        </Text>
      )}
      {error === undefined ? null : <FieldError id={errorId}>{error}</FieldError>}
      <input
        id={name}
        name={name}
        type="time"
        defaultValue={value}
        step={step}
        min={min}
        max={max}
        aria-invalid={error === undefined ? undefined : true}
        aria-describedby={described === "" ? undefined : described}
        className={`border-muted-foreground bg-background focus-visible:ring-ring h-9 min-w-32 rounded-md border px-3 text-base tabular-nums focus-visible:ring-2 focus-visible:outline-none ${error === undefined ? "" : "border-destructive"}`}
      />
    </div>
  )
}
