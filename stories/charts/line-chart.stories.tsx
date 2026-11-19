import type { Meta, StoryObj } from "@storybook/react-vite"

import { LineChart } from "../../src/components/line-chart"

const months = ["jan", "feb", "mar", "apr", "mai", "jun", "jul", "aug"]
const line = (base: number, step: number) => months.map((label, index) => ({ label, value: base + index * step + (index % 3) * 4 }))

const meta = {
  title: "Charts/LineChart",
  component: LineChart,
  tags: ["autodocs"],
  args: { ariaLabel: "Avspillinger per måned", height: 240, series: [{ name: "Musikk", data: line(40, 8) }, { name: "Podkast", data: line(30, 3) }, { name: "Film", data: line(20, 1) }] },
  parameters: { docs: { description: { component: `### Use it when

up to four things moved together over the same axis: a trend for each, compared.

### Do not use it when

there is one series (\`AreaChart\`), more than four (a table or a ranking), or the reader needs exact values (\`showTable\`, or a table).

### Accessibility

An image with a label, a table next to it (a dash where a series has no value, never an invented zero), an optional visible \`summary\`; not a tab stop. The first line is solid and the others dashed in other patterns, and each line is named at its last point, so nothing is told by colour alone.

### Content

A title that states the message and a subtitle with unit and period (\`ChartCard\`). Short series names.

### Related

\`AreaChart\`, \`StackedColumnChart\`, \`Sparkline\`, guide «Data visualisation»` } } },
} satisfies Meta<typeof LineChart>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const TwoLines: Story = { args: { series: [{ name: "Musikk", data: line(40, 8) }, { name: "Podkast", data: line(30, 3) }] } }
export const FourLines: Story = { args: { series: [{ name: "Musikk", data: line(40, 8) }, { name: "Podkast", data: line(30, 3) }, { name: "Film", data: line(20, 1) }, { name: "TV", data: line(10, 5) }] } }
export const ShowTable: Story = { args: { showTable: true } }
export const Empty: Story = { args: { series: [{ name: "Musikk", data: [] }] } }
