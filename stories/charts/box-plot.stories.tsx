import type { Meta, StoryObj } from "@storybook/react-vite"

import { BoxPlot } from "../../src/components/box-plot"
import { sampleLengths } from "./_data"

const meta = {
  title: "Charts/BoxPlot",
  component: BoxPlot,
  tags: ["autodocs"],
  args: {
    groups: [
      { name: "Musikk", values: [...sampleLengths(120, 38, 22, 1), 140] },
      { name: "Podkast", values: sampleLengths(80, 55, 50, 2) },
      { name: "Film", values: sampleLengths(60, 112, 36, 3) },
      { name: "TV", values: sampleLengths(70, 44, 14, 4) },
    ],
    valueName: "Lengde (min)",
    unit: "min",
    ariaLabel: "Lengde etter slags medium",
  },
  parameters: { docs: { description: { component: `**Use it when** the spread of values in several groups should be compared, not only their middle: a mean hides whether a group is tight or wild.

**Do not use it when** the readers have never seen one and nothing explains it (the story has a sentence that does; keep it), a group has fewer than five values (a list), or there is one group (\`Histogram\`).

**Accessibility.** One image with a label; the five numbers of each group are a table (\`showTable\`), outliers counted in the summary. The box is the middle half, the line the median, the whiskers Tukey's (1.5 box lengths), dots single values. One to eight groups, in the order given, horizontal so the names read as words. Not a tab stop.

**Content.** Group names short; the unit in the label.

**Related.** \`Histogram\`, \`RankedBarChart\`` } } },
} satisfies Meta<typeof BoxPlot>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const ShowTable: Story = { args: { showTable: true } }
export const Empty: Story = { args: { groups: [] } }
