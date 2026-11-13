import type { Meta, StoryObj } from "@storybook/react-vite"

import { DonutChart } from "../../src/components/donut-chart"

const meta = {
  title: "Charts/DonutChart",
  component: DonutChart,
  tags: ["autodocs"],
  args: { ariaLabel: "Andel per sjanger", formatValue: (value: number) => `${value} avspillinger`, data: [{ label: "Rock", value: 120 }, { label: "Jazz", value: 80 }, { label: "Pop", value: 60 }, { label: "Folk", value: 30 }, { label: "Klassisk", value: 20 }, { label: "Annet", value: 12 }] },
} satisfies Meta<typeof DonutChart>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const KeepThree: Story = { args: { keep: 3 } }
