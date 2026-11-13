import type { Meta, StoryObj } from "@storybook/react-vite"

import { AreaChart } from "../../src/components/area-chart"
import { MONTHS } from "../sample"

const meta = {
  title: "Charts/AreaChart",
  component: AreaChart,
  tags: ["autodocs"],
  args: { data: MONTHS, ariaLabel: "Utvikling over tid", valueLabel: "Avspillinger", height: 240 },
} satisfies Meta<typeof AreaChart>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
