import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "../../../src/components/ui/button"
import { Icon as IconGlyph } from "../../../src/components/icon"

const meta = {
  title: "Components/Actions/Button",
  component: Button,
  tags: ["autodocs"],
  args: { children: "Button" },
  parameters: { docs: { description: { component: `### Use it when

an action that changes something or sends something: save, send, copy.

### Do not use it when

going to another page (\`LinkButton\`, \`TextLink\`).

### Accessibility

**Handled by the component**

- A native \`<button>\`: focusable, and pressed with Enter and Space ([2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard))
- Its text is its accessible name, and \`disabled\` is the native attribute, exposed as such ([4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value))
- A focus ring in the \`ring\` token on keyboard focus ([2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible))
- Every size is at least 24 by 24px ([2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum))
- Text and fill are paired theme tokens (\`primary\` and \`primary-foreground\`, …) ([1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum))

**You check**

- The text says what happens («Lagre», «Last ned»), not «OK» ([2.4.6 Headings and Labels](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels))
- \`size="icon"\` gets an \`aria-label\` that says the action ([4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value))
- An \`aria-label\` on a button with visible text starts with that text ([2.5.3 Label in Name](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name))
- A disabled button cannot be focused: say near it why it is not available ([3.3.2 Labels or Instructions](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions))
- Going to another page is a link (\`LinkButton\`), not a button ([4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value))

### Content

A verb: «Lagre», «Opprett», with the thing when it is not clear.

### Related

\`LinkButton\`, \`ButtonGroup\`, \`CommandButton\`` } }, },
} satisfies Meta<typeof Button>
export default meta
type Story = StoryObj<typeof meta>

/** The primary action: the filled look. */
export const Default: Story = {}
/** A secondary action with an outline, the most used look. */
export const Outline: Story = { args: { variant: "outline" } }
/** A quieter fill, for an action beside the primary one. */
export const Secondary: Story = { args: { variant: "secondary" } }
/** No fill or border until hover, for actions in dense places. */
export const Ghost: Story = { args: { variant: "ghost" } }
/** An action that deletes or cannot be undone. */
export const Destructive: Story = { args: { variant: "destructive" } }
/** A button that looks like a link but still does something. */
export const Link: Story = { args: { variant: "link" } }
/** The small size, at least 24px tall. */
export const Small: Story = { args: { size: "sm" } }
/** The large size. */
export const Large: Story = { args: { size: "lg" } }
/** Icon only: the `aria-label` is its name. */
export const Icon: Story = { args: { size: "icon", "aria-label": "Last ned", children: <IconGlyph name="download" /> } }
/** An icon before the text, spaced by `slot="start"`. */
export const WithIcon: Story = { args: { children: <><IconGlyph name="download" slot="start" />Last ned</> } }
/** The native disabled state: faded and not focusable. */
export const Disabled: Story = { args: { disabled: true } }
