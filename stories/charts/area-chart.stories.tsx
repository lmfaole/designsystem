import type { Meta, StoryObj } from "@storybook/react-vite"

import { AreaChart } from "../../src/components/area-chart"
import { MONTHS } from "../sample"

const meta = {
  title: "Charts/AreaChart",
  component: AreaChart,
  tags: ["autodocs"],
  args: { data: MONTHS, ariaLabel: "Utvikling over tid", valueLabel: "Avspillinger", height: 240 },
  parameters: { docs: { description: { component: `**Use it when** a value changes over time or along an ordered axis (months, hours).

**Do not use it when** there are more than five series (use a table), or the reader needs exact values (add the table, or use a \`FactList\`).

**Accessibility.** The chart draws; the numbers are in a \`ChartTable\` for a screen reader, and \`ariaLabel\` names the chart. Never told by shade alone.

**Content.** A title that says what it shows with the unit and the period. Data oldest first.

**Related.** \`ColumnChart\`, \`StackedColumnChart\`, \`ChartCard\`, guide «Data visualisation»` } }, },
} satisfies Meta<typeof AreaChart>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
