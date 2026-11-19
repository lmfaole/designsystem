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
  parameters: { docs: { description: { component: `### Use it when

two measures of the same things might go together, and the question is whether and how strongly (length and rating, age and plays).

### Do not use it when

one axis is a category (\`ColumnChart\`), there are fewer than three points (a table), or the reader may take the trend for a cause.

### Accessibility

**Handled by the component**

- The chart is one image (\`role="img"\`) named by \`ariaLabel\` ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- Both axes are named in words above the chart ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- The trend line is dashed, not only coloured ([1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color))
- Dots have a foreground ring, so they keep 3:1 where they are translucent ([1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast))
- A summary is written by default, with r², the strength in words and that a relation is not a cause ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- Every point is a row of a \`ChartTable\`, read by a screen reader or opened with \`showTable\` ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- Not a tab stop; the tooltip only repeats the table, so nothing needs a pointer ([2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard))

**You check**

- \`ariaLabel\` names both measures ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- \`xName\` and \`yName\` carry their units ([2.4.6 Headings and Labels](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels))
- Points have a \`label\`, or the table's rows are only «Punkt 1», «Punkt 2» ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))

### Content

Axis names with units. Title says the finding: «Lengre album får litt høyere vurdering».

### Related

\`LineChart\`, \`Histogram\`, guide «Data visualisation»` } } },
} satisfies Meta<typeof ScatterChart>
export default meta
type Story = StoryObj<typeof meta>

/** Sixty points with the dashed trend line and the summary with r². */
export const Default: Story = {}
/** The points alone, with the trend line turned off. */
export const NoTrend: Story = { args: { trend: false } }
/** Each point as a row of a table anyone can open. */
export const ShowTable: Story = { args: { showTable: true, points: points.slice(0, 12) } }
/** No points: a sentence in the chart's place. */
export const Empty: Story = { args: { points: [] } }
