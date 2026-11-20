import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within } from "storybook/test"

import { FoldList } from "../../../src/components/fold-list"

const meta = {
  title: "Components/Lists/FoldList",
  component: FoldList,
  tags: ["autodocs"],
  args: { summary: "Vis alle verdier", items: [{ key: "1", text: "jan: 12" }, { key: "2", text: "feb: 18" }, { key: "3", text: "mar: 9" }] },
  parameters: { docs: { description: { component: `### Use it when

a short list a chart's reader may want to check but not read at first.

### Do not use it when

what matters (it must be on the page at rest; \`Disclosure\` is the general form).

### Accessibility

**Handled by the component**

- A native \`details\` and \`summary\`: it opens with Enter or Space, and the browser tells a screen reader whether it is open ([2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard), [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value)).
- It works without a script.
- The lines are a real list ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)).

**You check**

- \`summary\` says what is inside ([2.4.6 Headings and Labels](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels)).
- Nothing a reader needs is only in the fold: the chart or text at rest carries the point.
- The text is extra small and muted: check its contrast on the background it stands on ([1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum)).

### Content

The summary says what is inside.

### Related

\`Disclosure\`, \`ChartCard\`` } }, },
} satisfies Meta<typeof FoldList>
export default meta
type Story = StoryObj<typeof meta>

/** Folded at rest; its test opens it by the summary and checks the lines appear. */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.queryByText("feb: 18")).not.toBeVisible()
    await userEvent.click(canvas.getByText("Vis alle verdier"))
    await expect(canvas.getByText("feb: 18")).toBeVisible()
  },
}
