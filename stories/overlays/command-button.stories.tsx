import type { Meta, StoryObj } from "@storybook/react-vite"

import { CommandButton } from "../../src/components/command-button"
import { Overlay } from "../../src/components/overlay"

const meta = {
  title: "Overlays/CommandButton",
  component: CommandButton,
  tags: ["autodocs"],
  args: { command: "show-modal", commandFor: "cmd-demo", label: "Åpne", look: "zoom", children: "Åpne" },
} satisfies Meta<typeof CommandButton>
export default meta
type Story = StoryObj<typeof meta>

export const Zoom: Story = { render: (args) => <><CommandButton {...args} /><Overlay id="cmd-demo" variant="dialog" title="Target">Opened by the button.</Overlay></> }
