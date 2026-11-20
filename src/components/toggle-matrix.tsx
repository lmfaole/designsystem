import { FieldError } from "./field-error"
import { Text } from "./text"

export type ToggleMatrixAxis = { id: string; label: string }

/**
 * Which of a list are on in each of a few groups, as native checkboxes: the sections shown in each part of the day. `rows` are the things (the sections), `columns` the groups
 * (the parts of the day). Each column is a group of its own, named by the column, with a checkbox for each row named by the row, sent as `name="<namePrefix>.<columnId>"` with
 * the row's id as its value, once per ticked box (`formData.getAll("show.morgen")`): a column with none ticked sends nothing, so the server reads it as «none» only from a form
 * that had the matrix. `values` are the rows ticked in each column when the page is drawn.
 *
 * From the width of a small tablet it is a table: the rows down the side, the columns across the top, a box in each cell. On a phone each column stands under the other as a
 * list, like `CheckboxList`. The same boxes in both (one set, laid out by CSS grid and subgrid), drawn on the server, so it works without JavaScript.
 */
export function ToggleMatrix({ legend, rows, columns, namePrefix, values = {}, hint, error }: { legend: string; rows: readonly ToggleMatrixAxis[]; columns: readonly ToggleMatrixAxis[]; namePrefix: string; values?: Readonly<Record<string, readonly string[]>>; hint?: string; error?: string }) {
  const hintId = `${namePrefix}-hint`
  const errorId = `${namePrefix}-error`
  const described = [hint === undefined ? null : hintId, error === undefined ? null : errorId].filter((id) => id !== null).join(" ")
  const span = rows.length + 1
  return (
    <fieldset id={namePrefix} className="grid min-w-0 gap-2" aria-describedby={described === "" ? undefined : described} data-field="">
      <legend className="mb-1 text-sm font-medium">{legend}</legend>
      {hint === undefined ? null : (
        <Text size="sm" tone="muted" id={hintId}>
          {hint}
        </Text>
      )}
      {error === undefined ? null : <FieldError id={errorId}>{error}</FieldError>}
      <div
        className={`grid gap-3 sm:grid-cols-(--toggle-matrix-columns) sm:gap-0 sm:overflow-hidden sm:rounded-lg sm:border ${error === undefined ? "sm:border-border" : "sm:border-destructive"}`}
        style={{ "--toggle-matrix-columns": `minmax(0, 1fr) repeat(${columns.length}, minmax(4.5rem, max-content))`, "--toggle-matrix-rows": span }}
      >
        {/* The names of the rows down the side of the table: for the eye only, since each box carries its row's name. */}
        <div aria-hidden="true" className="hidden sm:row-span-(--toggle-matrix-rows) sm:grid sm:grid-rows-subgrid">
          <span className="bg-muted/40 border-border border-b" />
          {rows.map((row) => (
            <span key={row.id} className="border-border flex items-center border-b px-3 py-2.5 font-medium last:border-b-0">
              {row.label}
            </span>
          ))}
        </div>
        {columns.map((column) => {
          const titleId = `${namePrefix}-${column.id}-title`
          const ticked = values[column.id] ?? []
          return (
            <div key={column.id} role="group" aria-labelledby={titleId} className="grid gap-1 sm:row-span-(--toggle-matrix-rows) sm:grid-rows-subgrid sm:gap-0">
              <span id={titleId} className="text-sm font-medium sm:bg-muted/40 sm:border-border sm:flex sm:items-center sm:justify-center sm:border-b sm:px-2 sm:py-2 sm:text-center">
                {column.label}
              </span>
              <ul className={`divide-border bg-background divide-y rounded-lg border sm:contents ${error === undefined ? "border-border" : "border-destructive"}`}>
                {rows.map((row) => (
                  <li key={row.id} className="sm:border-border sm:grid sm:border-b sm:last:border-b-0">
                    <label className="hover:bg-muted/40 has-focus-visible:ring-ring flex cursor-pointer items-center gap-3 px-3 py-2.5 has-focus-visible:ring-2 has-focus-visible:ring-inset sm:justify-center">
                      <input type="checkbox" name={`${namePrefix}.${column.id}`} value={row.id} defaultChecked={ticked.includes(row.id)} aria-invalid={error === undefined ? undefined : true} className="accent-primary size-4 shrink-0" />
                      <span className="font-medium sm:sr-only">{row.label}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </fieldset>
  )
}
