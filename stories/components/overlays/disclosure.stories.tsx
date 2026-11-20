import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within } from "storybook/test"

import { Disclosure } from "../../../src/components/disclosure"

const meta = {
  title: "Components/Overlays/Disclosure",
  component: Disclosure,
  tags: ["autodocs"],
  args: { summary: "Hele loggen", children: "Linje 1 og linje 2." },
  parameters: { docs: { description: { component: `\`### Use it when

longer content that the reader does not need to decide can stay behind one line: a whole log, the notes of a chart.

### Do not use it when

it holds what matters (it must be on the page at rest, never behind a click), or it should be a page with an address, or it would be nested. It is not an accordion: do not stack many.

### Accessibility

**Handled by the component**

- A native \`<details>\`: the browser exposes the summary as a button with its open or closed state ([4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value))
- Opened and closed from the keyboard, with no script ([2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard))
- The summary shows a focus ring from the \`ring\` token ([2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible))

**You check**

- The summary names what is inside («Hele loggen»), not «Vis mer» ([2.4.6 Headings and Labels](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels))
- Headings inside follow the page's heading order ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- Nothing the reader needs to decide is inside, and disclosures are not nested
- The summary line has room around it where other targets sit close ([2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum))

### Content

The summary says what is inside («Hele loggen»), not «Vis mer».

### Related

\`FoldList\`, \`PageSection\`` } } },
} satisfies Meta<typeof Disclosure>
export default meta
type Story = StoryObj<typeof meta>

/** Closed at rest and opened from its line; the play test checks focus and opening. */
export const Default: Story = {
  // Closed on load, reached with Tab and opened by its line (Enter on it is the browser's own, which a simulated key does not trigger).
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.queryByText("Linje 1 og linje 2.")).not.toBeVisible()
    await userEvent.tab()
    await expect(canvas.getByText("Hele loggen")).toHaveFocus()
    await userEvent.click(canvas.getByText("Hele loggen"))
    await expect(canvas.getByText("Linje 1 og linje 2.")).toBeVisible()
  },
}
