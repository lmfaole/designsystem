import type { Meta, StoryObj } from "@storybook/react-vite"

import { CountUp } from "../../src/components/count-up"

const meta = {
  title: "Motion/CountUp",
  component: CountUp,
  tags: ["autodocs"],
  args: { value: 12345 },
} satisfies Meta<typeof CountUp>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Formatted: Story = { args: { format: (v: number) => v.toLocaleString("nb-NO") + " avspillinger" } }
