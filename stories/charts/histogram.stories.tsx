import type { Meta, StoryObj } from "@storybook/react-vite"

import { Histogram } from "../../src/components/histogram"
import { sampleLengths } from "./_data"

const meta = {
  title: "Charts/Histogram",
  component: Histogram,
  tags: ["autodocs"],
  args: { values: sampleLengths(240, 38, 40, 5), valueName: "Lengde (min)", unit: "min", ariaLabel: "Fordeling av albumlengder", height: 240 },
  parameters: { docs: { description: { component: `**Use it when** there are many values of one thing and the question is their shape: where they pile up, how wide they spread, whether there is a tail.

**Do not use it when** there are fewer than about ten values (a list), the categories are named (\`ColumnChart\`), or several groups are compared (\`BoxPlot\`).

**Accessibility.** One image with a label, a summary with the median and the fullest interval, the counts as a table (\`showTable\`). The bin width is Freedman–Diaconis (follows the spread and the count) with edges that are numbers a person would write; the last bin includes its top edge. Bars touch, since the axis is continuous, and start at zero.

**Content.** Name the value with its unit; the count is «Antall».

**Related.** \`BoxPlot\`, \`ColumnChart\`, \`ScatterChart\`` } } },
} satisfies Meta<typeof Histogram>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const FewBins: Story = { args: { bins: 6 } }
export const ShowTable: Story = { args: { showTable: true } }
export const Empty: Story = { args: { values: [] } }
