import { useId } from "react"

import { Icon } from "./icon"
import { Heading, Text } from "./text"
import { TextField } from "./text-field"
import { Button } from "./ui/button"
import type { IconName } from "../lib/icons"

export interface UsernameField {
  /** The form field's name, which the app's endpoint reads (`github`, `lastfm`, `trakt`), and the input's id. */
  name: string
  label: string
  value?: string
  hint?: string
  /** Why the name was not taken («Fant ingen GitHub-bruker med navnet …»), from the endpoint's redirect. */
  error?: string
  autoComplete?: string
  /** An example of a name, never the label. */
  placeholder?: string
}

/**
 * The question an app asks before it shows anything personal: whose data to fetch. A plain HTML form (`method="post"`) to the app's
 * `action`, with no script, so it works on the server and before anything has loaded; the endpoint checks that the name exists, keeps
 * it in a cookie and sends the reader back to `back` (a hidden field), or back with the error to show beside the field. Each field is a
 * `TextField` typed exactly (no capital letter, no spelling check). Say in `body` that only public data is shown and where the name is
 * kept. One form for the names a page needs; an empty field clears its name.
 */
export function UsernameForm({ title, body, action, back, fields, submitLabel = "Hent data", icon = "person", headingLevel = 2 }: { title: string; body?: string; action: string; back: string; fields: readonly UsernameField[]; submitLabel?: string; icon?: IconName; headingLevel?: 2 | 3 }) {
  const titleId = useId()
  return (
    <section aria-labelledby={titleId} className="border-border grid gap-4 rounded-lg border p-4">
      <div className="grid gap-1">
        <div className="flex items-center gap-2">
          <Icon name={icon} tone="muted" />
          <Heading level={headingLevel} look="section" id={titleId}>
            {title}
          </Heading>
        </div>
        {body === undefined ? null : (
          <Text size="sm" tone="muted">
            {body}
          </Text>
        )}
      </div>
      <form method="post" action={action} className="grid justify-items-start gap-4">
        <input type="hidden" name="back" value={back} />
        {fields.map((field) => (
          <div key={field.name} className="w-full">
            <TextField label={field.label} name={field.name} defaultValue={field.value} hint={field.hint} error={field.error} autoComplete={field.autoComplete ?? "off"} placeholder={field.placeholder} verbatim />
          </div>
        ))}
        <Button type="submit">{submitLabel}</Button>
      </form>
    </section>
  )
}
