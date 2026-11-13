import type { Meta, StoryObj } from "@storybook/react-vite"

import { RankedBarChart } from "../../src/components/ranked-bar-chart"

const meta = {
  title: "Charts/RankedBarChart",
  component: RankedBarChart,
  tags: ["autodocs"],
  args: { data: [{ label: "Alfa", value: 42 }, { label: "Beta", value: 31 }, { label: "Gamma", value: 18 }, { label: "Delta", value: 7 }], ariaLabel: "Mest spilt", valueLabel: "Avspillinger" },
} satisfies Meta<typeof RankedBarChart>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
