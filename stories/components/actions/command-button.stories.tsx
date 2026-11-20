import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, waitFor, within } from "storybook/test"

import { CommandButton } from "../../../src/components/command-button"
import { Overlay } from "../../../src/components/overlay"

const meta = {
  title: "Components/Actions/CommandButton",
  component: CommandButton,
  tags: ["autodocs"],
  args: { command: "show-modal", commandFor: "cmd-demo", label: "Åpne", look: "zoom", children: "Åpne" },
  parameters: { docs: { description: { component: `### Use it when

a button opens or closes a dialog or popover by its id, with no state to keep.

### Do not use it when

navigation (a link) or an action that changes data.

### Accessibility

**Handled by the component**

- A native \`<button type="button">\`, reached and pressed from the keyboard ([2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard))
- Named by \`label\` (\`aria-label\`) for a screen reader ([4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value))
- Works through the browser's invoker commands before scripts load, with a click handler for browsers without them ([2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard))
- When the dialog closes, the browser returns focus to it ([2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order))

**You check**

- \`label\` contains the words that are visible on the button ([2.5.3 Label in Name](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name))
- The content says what opens; an icon alone needs a \`label\` that says it ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content), [2.4.6 Headings and Labels](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels))
- A visible focus style and room to hit it, from \`Button\` or the content you put in it ([2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible), [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum))
- \`commandFor\` is the id of a dialog or popover that is on the page ([4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value))

### Content

The button says what opens.

### Related

\`Overlay\`, \`ImageLightbox\`` } }, },
} satisfies Meta<typeof CommandButton>
export default meta
type Story = StoryObj<typeof meta>

/** A zoom button opening a dialog; the play test checks opening, closing and focus return. */
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
