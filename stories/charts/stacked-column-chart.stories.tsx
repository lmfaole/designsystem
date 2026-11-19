import type { Meta, StoryObj } from "@storybook/react-vite"

import { StackedColumnChart } from "../../src/components/stacked-column-chart"
import { MONTHS } from "../sample"

const meta = {
  title: "Charts/StackedColumnChart",
  component: StackedColumnChart,
  tags: ["autodocs"],
  args: { ariaLabel: "Per måned og sjanger", height: 260, series: ["Rock", "Jazz", "Pop"], data: MONTHS.slice(0, 6).flatMap((m, i) => [
    { label: m.label, series: "Rock", value: m.value }, { label: m.label, series: "Jazz", value: (i * 5) % 11 }, { label: m.label, series: "Pop", value: 8 + i },
  ]) },
  parameters: { docs: { description: { component: `**Use it when** a total is split into a few parts over time (listening per genre per month).

**Do not use it when** there are more than five parts (fold the rest into «Annet») or only one series (\`ColumnChart\`).

**Accessibility.** A \`ChartTable\` has a column per series; parts are separated by a gap, never told by shade alone.

**Content.** Name the series on the chart before a legend. Units and period in the title.

**Related.** \`ColumnChart\`, \`DonutChart\`, \`ChartCard\`` } }, },
} satisfies Meta<typeof StackedColumnChart>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
