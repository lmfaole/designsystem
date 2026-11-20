import type { Meta, StoryObj } from "@storybook/react-vite"

import { LineChart } from "../../../src/components/line-chart"

const months = ["jan", "feb", "mar", "apr", "mai", "jun", "jul", "aug"]
const line = (base: number, step: number) => months.map((label, index) => ({ label, value: base + index * step + (index % 3) * 4 }))

const meta = {
  title: "Components/Charts/LineChart",
  component: LineChart,
  tags: ["autodocs"],
  args: { ariaLabel: "Avspillinger per måned", height: 240, series: [{ name: "Musikk", data: line(40, 8) }, { name: "Podkast", data: line(30, 3) }, { name: "Film", data: line(20, 1) }] },
  parameters: { docs: { description: { component: `### Use it when

up to four things moved together over the same axis: a trend for each, compared.

### Do not use it when

there is one series (\`AreaChart\`), more than four (a table or a ranking), or the reader needs exact values (\`showTable\`, or a table).

### Accessibility

**Handled by the component**

- The chart is one image (\`role="img"\`) named by \`ariaLabel\` ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- The values are a \`ChartTable\` with a column per series and a dash where one has no value, never a zero ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- The first line is solid and the others dashed in other patterns, each named at its last point, so no line is told by colour ([1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color))
- Not a tab stop; the tooltip only repeats the table ([2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard))

**You check**

- \`ariaLabel\` says what is counted and over what period, not «Diagram» ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- A \`summary\` that states the message (the finding, not only the numbers) ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- Series names are short and distinct; they are drawn on the chart and head the table's columns ([2.4.6 Headings and Labels](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels))

### Content

A title that states the message and a subtitle with unit and period (\`ChartCard\`). Short series names.

### Related

\`AreaChart\`, \`StackedColumnChart\`, \`Sparkline\`, guide «Data visualisation»` } } },
} satisfies Meta<typeof LineChart>
export default meta
type Story = StoryObj<typeof meta>

/** Three lines, solid and dashed, each named at its last point. */
export const Default: Story = {}
/** The smallest comparison: two lines. */
export const TwoLines: Story = { args: { series: [{ name: "Musikk", data: line(40, 8) }, { name: "Podkast", data: line(30, 3) }] } }
/** The most lines allowed, all four dash patterns. */
export const FourLines: Story = { args: { series: [{ name: "Musikk", data: line(40, 8) }, { name: "Podkast", data: line(30, 3) }, { name: "Film", data: line(20, 1) }, { name: "TV", data: line(10, 5) }] } }
/** A column per series in a table anyone can open. */
export const ShowTable: Story = { args: { showTable: true } }
/** A series with no values: a sentence in the chart's place. */
export const Empty: Story = { args: { series: [{ name: "Musikk", data: [] }] } }
