import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, waitFor, within } from "storybook/test"

import { CommandButton } from "../../src/components/command-button"
import { Overlay } from "../../src/components/overlay"

const meta = {
  title: "Overlays/CommandButton",
  component: CommandButton,
  tags: ["autodocs"],
  args: { command: "show-modal", commandFor: "cmd-demo", label: "Åpne", look: "zoom", children: "Åpne" },
  parameters: { docs: { description: { component: `### Use it when

a button opens or closes a dialog or popover by its id, with no state to keep.

### Do not use it when

navigation (a link) or an action that changes data.

### Accessibility

Uses the browser's own invoker commands, so it works before scripts load; a click handler covers browsers without them.

### Content

The button says what opens.

### Related

\`Overlay\`, \`ImageLightbox\`` } }, },
} satisfies Meta<typeof CommandButton>
export default meta
type Story = StoryObj<typeof meta>

export const Zoom: Story = {
  render: (args) => <><CommandButton {...args} /><Overlay id="cmd-demo" variant="dialog" title="Target">Opened by the button.</Overlay></>,
  // The button opens the dialog with no script of its own (invoker commands), «Lukk» closes it, and focus goes back to the button.
  // (Esc is the browser's own, which a simulated key does not trigger.)
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button", { name: "Åpne" })
    await userEvent.click(button)
    const dialog = await canvas.findByRole("dialog", { name: "Target" })
    await expect(dialog).toHaveAttribute("open")
    await userEvent.click(within(dialog).getByRole("button", { name: "Lukk" }))
    await waitFor(() => expect(dialog).not.toHaveAttribute("open"))
    await expect(button).toHaveFocus()
  },
}
