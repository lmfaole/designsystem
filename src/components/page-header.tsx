import type { ReactNode } from "react"

import { Inline, Stack } from "./layout"
import { Heading, Text } from "./text"

/**
 * A page's own `<h1>` (the one page-title look of `Heading`) and an optional one-line lead-in, above its content, with
 * room for the page's controls beside the title. The room under it is fixed.
 */
export function PageHeader({ title, lead, actions }: { title: string; lead?: string | undefined; /** Buttons or menus shown alongside the title. */ actions?: ReactNode }) {
  return (
    <header className="mb-6">
      <Stack gap="sm">
        <Inline gap="md" justify="between">
          <Heading level={1}>{title}</Heading>
          {actions}
        </Inline>
        {lead ? (
          <Stack width="prose">
            <Text size="sm" tone="muted">
              {lead}
            </Text>
          </Stack>
        ) : null}
      </Stack>
    </header>
  )
}
