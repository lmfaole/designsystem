import type { Meta, StoryObj } from "@storybook/react-vite"

import { useState } from "react"
import { SegmentedToggle } from "../../src/components/segmented-toggle"

const meta = {
  title: "Navigation/SegmentedToggle",
  component: SegmentedToggle,
  tags: ["autodocs"],
  args: { value: "month", onChange: () => {}, options: [{ value: "month", label: "Per måned" }, { value: "year", label: "Per år" }] },
  parameters: { docs: { description: { component: `**Use it when** an either/or view switch (per month or per year) where exactly one is on.

**Do not use it when** narrowing a list (\`FilterChips\`) or navigating between pages (\`NavBar\`).

**Accessibility.** A group of buttons; the one that is on is the \`default\` variant, the others are outlined.

**Content.** Short labels that name the views.

**Related.** \`FilterChips\`, \`NavBar\`` } }, },
} satisfies Meta<typeof SegmentedToggle>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: function Render(args) {
    const [value, setValue] = useState(args.value)
    return <SegmentedToggle {...args} value={value} onChange={setValue} />
  },
}
