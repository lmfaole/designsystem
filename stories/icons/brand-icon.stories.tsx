import type { Meta, StoryObj } from "@storybook/react-vite"

import { BrandIcon } from "../../src/components/brand-icon"
import { Inline } from "../../src/components/layout"
import { Text } from "../../src/components/text"
import { BRAND_MARKS, type BrandName } from "../../src/lib/brand-marks"

const meta = {
  title: "Icons/BrandIcon",
  component: BrandIcon,
  tags: ["autodocs"],
  parameters: { docs: { description: { component: "The mark of a service a link goes to. A closed set (GitHub, Spotify, Bluesky, Mastodon, Steam, PlayStation) from Simple Icons (CC0). It is not an `Icon`: it keeps the service's shape, follows the text colour and always says the service's name unless the words beside it do (`decorative`). LinkedIn is not here: Simple Icons no longer carries it, so a link to it uses its words." } } },
} satisfies Meta<typeof BrandIcon>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { name: "github" } }

export const All: Story = {
  args: { name: "github" },
  render: () => (
    <Inline gap="lg">
      {(Object.keys(BRAND_MARKS) as BrandName[]).map((name) => (
        <Inline key={name} gap="xs"><BrandIcon name={name} size="lg" decorative /><Text size="sm">{name}</Text></Inline>
      ))}
    </Inline>
  ),
}
