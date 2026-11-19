import type { Meta, StoryObj } from "@storybook/react-vite"

import { DonutChart } from "../../src/components/donut-chart"

const meta = {
  title: "Charts/DonutChart",
  component: DonutChart,
  tags: ["autodocs"],
  args: { ariaLabel: "Andel per sjanger", formatValue: (value: number) => `${value} avspillinger`, data: [{ label: "Rock", value: 120 }, { label: "Jazz", value: 80 }, { label: "Pop", value: 60 }, { label: "Folk", value: 30 }, { label: "Klassisk", value: 20 }, { label: "Annet", value: 12 }] },
  parameters: { docs: { description: { component: `**Use it when** one whole is split into a few parts and the share is the point.

**Do not use it when** there are more than five parts, or the parts must be compared closely (\`RankedBarChart\`).

**Accessibility.** \`ariaLabel\` names the chart for a screen reader and the legend lists each part with its value; a slice too small to reach is only reachable in the list.

**Content.** Five slices at most, the rest folded into «Annet». Say the share as a number.

**Related.** \`RankedBarChart\`, \`StackedColumnChart\`, \`SummaryBar\`` } }, },
} satisfies Meta<typeof DonutChart>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const KeepThree: Story = { args: { keep: 3 } }
export const WithSummary: Story = { args: { summary: "Ringdiagram. Rock er størst med 38 %, de fem største utgjør 81 %." } }
export const Empty: Story = { args: { data: [] } }
