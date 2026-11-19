import type { Meta, StoryObj } from "@storybook/react-vite"

import { CommandButton } from "../../src/components/command-button"
import { Overlay } from "../../src/components/overlay"

const meta = {
  title: "Overlays/CommandButton",
  component: CommandButton,
  tags: ["autodocs"],
  args: { command: "show-modal", commandFor: "cmd-demo", label: "Åpne", look: "zoom", children: "Åpne" },
  parameters: { docs: { description: { component: `**Use it when** a button opens or closes a dialog or popover by its id, with no state to keep.

**Do not use it when** navigation (a link) or an action that changes data.

**Accessibility.** Uses the browser's own invoker commands, so it works before scripts load; a click handler covers browsers without them.

**Content.** The button says what opens.

**Related.** \`Overlay\`, \`ImageLightbox\`` } }, },
} satisfies Meta<typeof CommandButton>
export default meta
type Story = StoryObj<typeof meta>

export const Zoom: Story = { render: (args) => <><CommandButton {...args} /><Overlay id="cmd-demo" variant="dialog" title="Target">Opened by the button.</Overlay></> }
