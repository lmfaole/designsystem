import type { Meta, StoryObj } from "@storybook/react-vite"

import { CommandButton } from "../../src/components/command-button"
import { Overlay } from "../../src/components/overlay"
import { Button } from "../../src/components/ui/button"
import { Text } from "../../src/components/text"

const meta = {
  title: "Overlays/Overlay",
  component: Overlay,
  tags: ["autodocs"],
  args: { id: "x", variant: "dialog", title: "A dialog", children: <Text>Esc, the cross or a tap outside closes it.</Text> },
  parameters: { docs: { description: { component: `### Use it when

a dialog or popover that a \`CommandButton\` points at: a picture opened large, a message the reader must answer.

### Do not use it when

what has an address of its own (a page), or a message about the page (\`Banner\`).

### Accessibility

**Handled by the component**

- A modal \`<dialog>\` named by its title (\`aria-labelledby\`), also when the title is hidden ([4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value))
- Focus moves into it, stays in it, and the page behind is inert; Esc closes it ([2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard), [2.1.2 No Keyboard Trap](https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap), [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order))
- The close button is named «Lukk» and is at least 48 px square ([4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value), [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum))
- Opening and closing motion lands at once under reduced motion ([2.3.3 Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions))

**You check**

- The title says what the dialog is, and \`hideTitle\` only where the content says it already ([2.4.6 Headings and Labels](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels))
- Headings inside start below the title (an \`<h2>\`) ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- A tap outside closes it: nothing the reader has typed is lost by that
- Long content scrolls inside it at 320 px wide and 400 % zoom ([1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow))

### Content

A title that says what it is.

### Related

\`CommandButton\`, \`ImageLightbox\`` } }, },
} satisfies Meta<typeof Overlay>
export default meta
type Story = StoryObj<typeof meta>

const open = (id: string) => <Button asChild variant="outline"><CommandButton command="show-modal" commandFor={id} look="zoom" label="Åpne">Åpne</CommandButton></Button>
/** The centred dialog with its visible title and close button. */
export const Dialog: Story = { args: { id: "dialog-demo" }, render: (args) => <>{open("dialog-demo")}<Overlay {...args} /></> }
/** The sheet variant, rising from the bottom of the screen. */
export const Sheet: Story = { args: { id: "sheet-demo", variant: "sheet", title: "A sheet" }, render: (args) => <>{open("sheet-demo")}<Overlay {...args} /></> }
/** The title is read by a screen reader but not drawn. */
export const HiddenTitle: Story = { args: { id: "hidden-demo", hideTitle: true }, render: (args) => <>{open("hidden-demo")}<Overlay {...args} /></> }
