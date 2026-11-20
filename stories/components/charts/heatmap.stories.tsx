import type { Meta, StoryObj } from "@storybook/react-vite"

import { Heatmap, type HeatCell } from "../../../src/components/heatmap"
import { seeded } from "./_data"

const rows = ["man.", "tir.", "ons.", "tor.", "fre.", "lør.", "søn."]
const hours = Array.from({ length: 24 }, (_, hour) => String(hour).padStart(2, "0"))
const random = seeded(11)
const cells: HeatCell[] = rows.flatMap((row, day) =>
  hours.map((column, hour) => {
    const evening = Math.exp(-(((hour - 21) / 3) ** 2))
    const commute = Math.exp(-(((hour - 8) / 1.5) ** 2)) * (day < 5 ? 1 : 0.2)
    return { row, column, value: hour < 6 ? (random() < 0.2 ? 1 : 0) : Math.round((evening * 30 + commute * 22) * random() * (day >= 5 ? 1.3 : 1)) }
  }),
)

const meta = {
  title: "Components/Charts/Heatmap",
  component: Heatmap,
  tags: ["autodocs"],
  args: { rows, columns: hours, cells, ariaLabel: "Avspillinger etter ukedag og time", unit: "avspillinger", rowName: "Ukedag", labelEvery: 3 },
  parameters: { docs: { description: { component: `### Use it when

two categories meet and the reader is looking for the pattern: weekday by hour, category by month.

### Do not use it when

the reader must read exact numbers (a table; or \`showValues\` for a matrix of at most about 7 × 12), or one of the axes is not a category.

### Accessibility

**Handled by the component**

- The matrix is one image named by \`ariaLabel\`; the cells are hidden from a screen reader ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- A summary is written by default (\`summariseHeatMatrix\`) ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- The matrix is also a \`ChartTable\` with a dash for no data, read by a screen reader or opened with \`showTable\` ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- The step is not the only cue: each cell has a title with its value, and \`showValues\` writes it in the cell ([1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color))
- Step greys and cell borders keep 3:1; a cell with no data is empty, never the palest step ([1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast))
- A wide matrix scrolls inside a named region in the tab order, not the page ([1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow))

**You check**

- \`ariaLabel\` says what is counted and over what period, not «Diagram» ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- \`rowName\` and the column labels name the axes; they head the table ([2.4.6 Headings and Labels](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels))
- With \`showValues\`, the numbers keep 4.5:1 on every step in both themes ([1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum))
- The scroll box shows its focus in your theme ([2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible))

### Content

The unit in the plural, short axis labels (\`labelEvery\` thins a crowded axis).

### Related

\`CalendarHeatmap\`, \`ColumnChart\`` } } },
} satisfies Meta<typeof Heatmap>
export default meta
type Story = StoryObj<typeof meta>

/** Weekday by hour, the axis thinned to every third hour. */
export const Default: Story = {}
/** The matrix as a table anyone can open. */
export const ShowTable: Story = { args: { showTable: true } }
/** A small matrix with the number written in each cell. */
export const WithValues: Story = { args: { columns: hours.slice(16, 24), cells: cells.filter((cell) => Number(cell.column) >= 16), labelEvery: 1, showValues: true } }
/** No data: a sentence in the chart's place. */
export const Empty: Story = { args: { cells: [] } }
