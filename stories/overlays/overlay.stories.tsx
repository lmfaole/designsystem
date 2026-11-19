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

A modal \`dialog\`: focus is trapped, the page behind is inert, Esc closes it and so does a tap outside.

### Content

A title that says what it is.

### Related

\`CommandButton\`, \`ImageLightbox\`` } }, },
} satisfies Meta<typeof Overlay>
export default meta
type Story = StoryObj<typeof meta>

const open = (id: string) => <Button asChild variant="outline"><CommandButton command="show-modal" commandFor={id} look="zoom" label="Åpne">Åpne</CommandButton></Button>
export const Dialog: Story = { args: { id: "dialog-demo" }, render: (args) => <>{open("dialog-demo")}<Overlay {...args} /></> }
export const Sheet: Story = { args: { id: "sheet-demo", variant: "sheet", title: "A sheet" }, render: (args) => <>{open("sheet-demo")}<Overlay {...args} /></> }
export const HiddenTitle: Story = { args: { id: "hidden-demo", hideTitle: true }, render: (args) => <>{open("hidden-demo")}<Overlay {...args} /></> }
