import type { Meta, StoryObj } from "@storybook/react-vite"

import { Heatmap, type HeatCell } from "../../src/components/heatmap"
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
  title: "Charts/Heatmap",
  component: Heatmap,
  tags: ["autodocs"],
  args: { rows, columns: hours, cells, ariaLabel: "Avspillinger etter ukedag og time", unit: "avspillinger", rowName: "Ukedag", labelEvery: 3 },
  parameters: { docs: { description: { component: `**Use it when** two categories meet and the reader is looking for the pattern: weekday by hour, category by month.

**Do not use it when** the reader must read exact numbers (a table; or \`showValues\` for a matrix of at most about 7 × 12), or one of the axes is not a category.

**Accessibility.** One image with a label and a summary; each cell has a title; the matrix is also a table (\`showTable\`). Steps are quantiles of the values above zero, greys that keep 3:1; a cell with no data is empty, never the palest step. With \`showValues\` the number is in the cell, and the colour is help only.

**Content.** The unit in the plural, short axis labels (\`labelEvery\` thins a crowded axis).

**Related.** \`CalendarHeatmap\`, \`ColumnChart\`` } } },
} satisfies Meta<typeof Heatmap>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const ShowTable: Story = { args: { showTable: true } }
export const WithValues: Story = { args: { columns: hours.slice(16, 24), cells: cells.filter((cell) => Number(cell.column) >= 16), labelEvery: 1, showValues: true } }
export const Empty: Story = { args: { cells: [] } }
