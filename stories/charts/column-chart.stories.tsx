import type { Meta, StoryObj } from "@storybook/react-vite"

import { ColumnChart } from "../../src/components/column-chart"
import { MONTHS } from "../sample"

const meta = {
  title: "Charts/ColumnChart",
  component: ColumnChart,
  tags: ["autodocs"],
  args: { data: MONTHS, ariaLabel: "Avspillinger per måned", valueLabel: "Avspillinger", height: 240 },
} satisfies Meta<typeof ColumnChart>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const LabelEvery2: Story = { args: { labelEvery: 2 } }
