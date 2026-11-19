import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"

import { useState } from "react"
import { SegmentedToggle } from "../../src/components/segmented-toggle"

const meta = {
  title: "Navigation/SegmentedToggle",
  component: SegmentedToggle,
  tags: ["autodocs"],
  args: { value: "month", onChange: fn(), options: [{ value: "month", label: "Per måned" }, { value: "year", label: "Per år" }] },
  parameters: { docs: { description: { component: `### Use it when

an either/or view switch (per month or per year) where exactly one is on.

### Do not use it when

narrowing a list (\`FilterChips\`) or navigating between pages (\`NavBar\`).

### Accessibility

A group of buttons; the one that is on is the \`default\` variant and \`aria-pressed\`, the others are outlined. The story's test clicks the other and checks both.

### Content

Short labels that name the views.

### Related

\`FilterChips\`, \`NavBar\`` } }, },
} satisfies Meta<typeof SegmentedToggle>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: function Render(args) {
    const [value, setValue] = useState(args.value)
    return <SegmentedToggle {...args} value={value} onChange={(next) => (setValue(next), args.onChange(next))} />
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("button", { name: "Per måned" })).toHaveAttribute("aria-pressed", "true")
    await userEvent.click(canvas.getByRole("button", { name: "Per år" }))
    await expect(args.onChange).toHaveBeenCalledWith("year")
    await expect(canvas.getByRole("button", { name: "Per år" })).toHaveAttribute("aria-pressed", "true")
    await expect(canvas.getByRole("button", { name: "Per måned" })).toHaveAttribute("aria-pressed", "false")
  },
}
