import type { Meta, StoryObj } from "@storybook/react-vite"

import { Icon } from "../../../src/components/icon"
import { Grid, Stack } from "../../../src/components/layout"
import { Text } from "../../../src/components/text"
import { ICON_GROUPS } from "../../../src/lib/icons"

const meta = {
  title: "Foundations/Icons/Catalogue",
  tags: ["autodocs"],
  parameters: { docs: { description: { component: "Every meaning a page can ask for with `<Icon name=\"…\" />`, by what it means, in groups. The groups and the shapes are generated from `scripts/icon-set.mjs` (`npm run icons`), so the catalogue is never behind. The names are the keys of `ICONS` in `src/lib/icons.ts`. Which of two close meanings to use is in **Icons / Guide** (Choosing between close meanings); a new meaning is added there first, with its group." } } },
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const All: Story = {
  render: () => (
    <Stack gap="xl">
      {ICON_GROUPS.map(([title, names]) => (
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
