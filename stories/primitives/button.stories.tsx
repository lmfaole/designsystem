import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "../../src/components/ui/button"
import { Icon as IconGlyph } from "../../src/components/icon"

const meta = {
  title: "Primitives/Button",
  component: Button,
  tags: ["autodocs"],
  args: { children: "Button" },
  parameters: { docs: { description: { component: `**Use it when** an action that changes something or sends something: save, send, copy.

**Do not use it when** going to another page (\`LinkButton\`, \`TextLink\`).

**Accessibility.** A real button with a visible label; the focus ring is never removed.

**Content.** A verb: «Lagre», «Opprett», with the thing when it is not clear.

**Related.** \`LinkButton\`, \`ButtonGroup\`, \`CommandButton\`` } }, },
} satisfies Meta<typeof Button>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Outline: Story = { args: { variant: "outline" } }
export const Secondary: Story = { args: { variant: "secondary" } }
export const Ghost: Story = { args: { variant: "ghost" } }
export const Destructive: Story = { args: { variant: "destructive" } }
export const Link: Story = { args: { variant: "link" } }
export const Small: Story = { args: { size: "sm" } }
export const Large: Story = { args: { size: "lg" } }
export const Icon: Story = { args: { size: "icon", "aria-label": "Last ned", children: <IconGlyph name="download" /> } }
export const WithIcon: Story = { args: { children: <><IconGlyph name="download" slot="start" />Last ned</> } }
export const Disabled: Story = { args: { disabled: true } }
