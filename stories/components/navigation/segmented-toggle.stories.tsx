import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"

import { useState } from "react"
import { SegmentedToggle } from "../../../src/components/segmented-toggle"

const meta = {
  title: "Components/Navigation/SegmentedToggle",
  component: SegmentedToggle,
  tags: ["autodocs"],
  args: { label: "Visning", value: "month", onChange: fn(), options: [{ value: "month", label: "Per måned" }, { value: "year", label: "Per år" }] },
  parameters: { docs: { description: { component: `### Use it when

an either/or view switch (per month or per year) where exactly one is on.

### Do not use it when

narrowing a list (\`FilterChips\`) or navigating between pages (\`NavBar\`).

### Accessibility

**Handled by the component**

- Real buttons in a \`group\` named by \`label\`; the one that is on is \`aria-pressed="true"\`, the others \`"false"\` ([4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value)).
- The one that is on is filled and the others outlined, so it does not rely on colour ([1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color)).
- Enter and Space from the native buttons ([2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard)).
- The focus ring of \`Button\` ([2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible)).
- Each button is 28 px high ([2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum)).

**You check**

- \`label\` says what is switched («Visning»), not what the options are ([2.4.6 Headings and Labels](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels)).
- Each label says the view («Per måned») ([2.4.6 Headings and Labels](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels)).
- What changes below is not announced: it must be what the label promised ([4.1.3 Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages)).

### Content

Short labels that name the views.

### Related

\`FilterChips\`, \`NavBar\`` } }, },
} satisfies Meta<typeof SegmentedToggle>
export default meta
type Story = StoryObj<typeof meta>

/** Two options with the first on; its test clicks the other and checks that `aria-pressed` moves. */
export const Default: Story = {
  render: function Render(args) {
    const [value, setValue] = useState(args.value)
    return <SegmentedToggle {...args} value={value} onChange={(next) => (setValue(next), args.onChange(next))} />
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("group", { name: "Visning" })).toBeInTheDocument()
    await expect(canvas.getByRole("button", { name: "Per måned" })).toHaveAttribute("aria-pressed", "true")
    await userEvent.click(canvas.getByRole("button", { name: "Per år" }))
    await expect(args.onChange).toHaveBeenCalledWith("year")
    await expect(canvas.getByRole("button", { name: "Per år" })).toHaveAttribute("aria-pressed", "true")
    await expect(canvas.getByRole("button", { name: "Per måned" })).toHaveAttribute("aria-pressed", "false")
  },
}
