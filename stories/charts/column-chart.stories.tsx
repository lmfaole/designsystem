import type { Meta, StoryObj } from "@storybook/react-vite"

import { ColumnChart } from "../../src/components/column-chart"
import { MONTHS } from "../sample"

const meta = {
  title: "Charts/ColumnChart",
  component: ColumnChart,
  tags: ["autodocs"],
  args: { data: MONTHS, ariaLabel: "Avspillinger per måned", valueLabel: "Avspillinger", height: 240 },
  parameters: { docs: { description: { component: `### Use it when

a few categories are compared, left to right in a fixed order (hours, weekdays, months).

### Do not use it when

the categories are ranked by size (\`RankedBarChart\`), or there are more than ten.

### Accessibility

A \`ChartTable\` has the exact values; \`ariaLabel\` names the chart; a tooltip repeats the table and is for a pointer.

### Content

Labels are short. The title says what is counted and in what unit.

### Related

\`RankedBarChart\`, \`AreaChart\`, \`ChartCard\`` } }, },
} satisfies Meta<typeof ColumnChart>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const LabelEvery2: Story = { args: { labelEvery: 2 } }
export const WithSummary: Story = { args: { summary: "Søylediagram. Avspillinger, 12 verdier. Høyest mar (402), lavest des (210). Økte fra 210 til 380." } }
export const ShowTable: Story = { args: { showTable: true } }
export const Empty: Story = { args: { data: [] } }
