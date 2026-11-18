import type { Meta, StoryObj } from "@storybook/react-vite"

import { Icon } from "../../src/components/icon"
import { Inline } from "../../src/components/layout"
import { Button } from "../../src/components/ui/button"

const meta = {
  title: "Icons/Icon",
  component: Icon,
  tags: ["autodocs"],
  args: { name: "pull-request" },
  argTypes: { name: { control: "select" } },
} satisfies Meta<typeof Icon>
export default meta
type Story = StoryObj<typeof meta>

/** Decorative by default: hidden from a screen reader, since the words beside it say the same. */
export const Default: Story = {}

export const Sizes: Story = {
  render: (args) => (
    <Inline gap="md">
      <Icon {...args} size="sm" />
      <Icon {...args} size="md" />
      <Icon {...args} size="lg" />
    </Inline>
  ),
}

export const Tones: Story = {
  args: { name: "warning" },
  render: (args) => (
    <Inline gap="md">
      <Icon {...args} tone="inherit" />
      <Icon {...args} tone="muted" />
      <Icon {...args} tone="destructive" />
      <Icon {...args} tone="primary" />
    </Inline>
  ),
}

/** Where an icon stands alone and carries the meaning, it gets a `label` for a screen reader. */
export const Labelled: Story = { args: { name: "issue", label: "Issue" } }

/** On a `Button`, `slot` spaces the icon from the text. */
export const OnAButton: Story = {
  render: () => (
    <Inline gap="md">
      <Button variant="outline">
        <Icon name="refresh" slot="start" />
        Oppdater
      </Button>
      <Button variant="outline">
        Åpne
        <Icon name="external" slot="end" />
      </Button>
      <Button variant="outline" size="icon" aria-label="Innstillinger">
        <Icon name="settings" />
      </Button>
    </Inline>
  ),
}
