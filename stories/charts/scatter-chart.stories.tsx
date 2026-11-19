import type { Meta, StoryObj } from "@storybook/react-vite"

import { ScatterChart } from "../../src/components/scatter-chart"
import { seeded } from "./_data"

const random = seeded(3)
const points = Array.from({ length: 60 }, (_, index) => {
  const length = 20 + random() * 60
  return { x: Math.round(length), y: Math.round((2 + length * 0.04 + (random() - 0.5) * 2.2) * 10) / 10, label: `Album ${index + 1}` }
})

const meta = {
  title: "Charts/ScatterChart",
  component: ScatterChart,
  tags: ["autodocs"],
  args: { points, xName: "Lengde (min)", yName: "Vurdering (1–5)", ariaLabel: "Vurdering mot lengde for album", height: 280 },
  parameters: { docs: { description: { component: `**Use it when** two measures of the same things might go together, and the question is whether and how strongly (length and rating, age and plays).

**Do not use it when** one axis is a category (\`ColumnChart\`), there are fewer than three points (a table), or the reader may take the trend for a cause.

**Accessibility.** One image with a label, **both axes named in words above the chart**, a trend line that is dashed (not only colour) with r² and its strength in the summary, which says a relation is not a cause. Dots are translucent so overlap shows, with a ring so they hold 3:1. Tooltip for a pointer, table (\`showTable\`) for everyone else. Not a tab stop.

**Content.** Axis names with units. Title says the finding: «Lengre album får litt høyere vurdering».

**Related.** \`LineChart\`, \`Histogram\`, guide «Data visualisation»` } } },
} satisfies Meta<typeof ScatterChart>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const NoTrend: Story = { args: { trend: false } }
export const ShowTable: Story = { args: { showTable: true, points: points.slice(0, 12) } }
export const Empty: Story = { args: { points: [] } }
