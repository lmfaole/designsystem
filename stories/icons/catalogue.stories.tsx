import type { Meta, StoryObj } from "@storybook/react-vite"

import { Icon } from "../../src/components/icon"
import { Grid, Stack } from "../../src/components/layout"
import { Text } from "../../src/components/text"
import type { IconName } from "../../src/lib/icons"

const GROUPS = [
  ["The work", ["pull-request", "pull-request-draft", "merge", "branch", "issue", "discussion", "question", "changes", "code", "bug", "package", "tag", "tasks"]],
  ["How it stands", ["success", "failure", "warning", "info", "pending", "waiting", "blocked"]],
  ["People and time", ["person", "people", "view", "time", "calendar", "notification"]],
  ["Place and weather", ["place", "sun", "moon", "weather", "clouds", "rain", "snow", "fog", "thunder", "wind", "temperature", "rain-drop"]],
  ["What you can do", ["refresh", "search", "add", "remove", "edit", "delete", "download", "upload", "link", "external", "close", "done", "settings", "favorite", "bookmark", "locked", "unlocked", "idea", "inbox", "home"]],
  ["Direction", ["back", "chevron-down", "chevron-right"]],
] as const satisfies readonly (readonly [string, readonly IconName[]])[]

const meta = {
  title: "Icons/Catalogue",
  tags: ["autodocs"],
  parameters: { docs: { description: { component: "Every meaning a page can ask for with `<Icon name=\"…\" />`, by what it means. The names are the keys of `ICONS` in `src/lib/icons.ts`." } } },
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const All: Story = {
  render: () => (
    <Stack gap="xl">
      {GROUPS.map(([title, names]) => (
        <Stack key={title} gap="md">
          <Text weight="semibold">{title}</Text>
          <Grid columns="tiles" gap="md">
            {names.map((name) => (
              <Stack key={name} gap="xs">
                <Icon name={name} size="lg" />
                <Text size="xs" tone="muted">{name}</Text>
              </Stack>
            ))}
          </Grid>
        </Stack>
      ))}
    </Stack>
  ),
}

/** Fails to compile (`never` is not `true`) while an icon in `ICONS` is missing from the groups above, so the catalogue is never behind. */
type Listed = (typeof GROUPS)[number][1][number]
const _catalogueIsComplete: Exclude<IconName, Listed> extends never ? true : never = true
void _catalogueIsComplete
