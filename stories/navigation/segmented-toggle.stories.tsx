import type { Meta, StoryObj } from "@storybook/react-vite"

import { useState } from "react"
import { SegmentedToggle } from "../../src/components/segmented-toggle"

const meta = {
  title: "Navigation/SegmentedToggle",
  component: SegmentedToggle,
  tags: ["autodocs"],
  args: { value: "month", onChange: () => {}, options: [{ value: "month", label: "Per måned" }, { value: "year", label: "Per år" }] },
} satisfies Meta<typeof SegmentedToggle>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: function Render(args) {
    const [value, setValue] = useState(args.value)
    return <SegmentedToggle {...args} value={value} onChange={setValue} />
  },
}
