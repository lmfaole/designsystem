import type { Meta, StoryObj } from "@storybook/react-vite"

import { BrandIcon } from "../../src/components/brand-icon"
import { Inline } from "../../src/components/layout"
import { Text } from "../../src/components/text"
import { BRAND_MARKS, type BrandName } from "../../src/lib/brand-marks"

const meta = {
  title: "Icons/BrandIcon",
  component: BrandIcon,
  tags: ["autodocs"],
  parameters: { docs: { description: { component: `### Use it when

A link goes to a service a reader knows by its mark: GitHub, Spotify, Bluesky, Mastodon, Steam, PlayStation.

### Do not use it when

The thing is a meaning, not a service (\`Icon\`), or the service is not in the closed set (use its name in words; LinkedIn is not in Simple Icons any more).

### Accessibility

It says the service's name to a screen reader unless the words beside it already do (\`decorative\`). It is the text colour, so it keeps the contrast of its text and survives forced colours.

### Content

The name of the service, as the service writes it.

### Related

\`Icon\`, \`ExternalLink\`, guide «Colour and state»` } } },
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
