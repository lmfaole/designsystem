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
  parameters: { docs: { description: { component: `### Use it when

the spread of values in several groups should be compared, not only their middle: a mean hides whether a group is tight or wild.

### Do not use it when

the readers have never seen one and nothing explains it (the story has a sentence that does; keep it), a group has fewer than five values (a list), or there is one group (\`Histogram\`).

### Accessibility

**Handled by the component**

- The chart is one image (\`role="img"\`) named by \`ariaLabel\` ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- A sentence under it says how to read a box, and a summary (yours or the default) gives each group's spread and outliers ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- The five numbers of each group are a \`ChartTable\` with headers, read by a screen reader or opened with \`showTable\` ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- Not a tab stop and no tooltip, so nothing needs a pointer ([2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard))
- Boxes and whiskers are drawn in \`--foreground\` ([1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast))

**You check**

- \`ariaLabel\` and \`valueName\` say what is measured, with its unit ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- Group names are short and distinct; they head the table's rows ([2.4.6 Headings and Labels](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels))
- A \`summary\` you write states the finding ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))

### Content

Group names short; the unit in the label.

### Related

\`Histogram\`, \`RankedBarChart\`` } } },
} satisfies Meta<typeof BoxPlot>
export default meta
type Story = StoryObj<typeof meta>

/** Four groups, the reading sentence and the default summary with outliers. */
export const Default: Story = {}
/** The five numbers of each group as a table anyone can open. */
export const ShowTable: Story = { args: { showTable: true } }
/** No values: a sentence in the chart's place. */
export const Empty: Story = { args: { groups: [] } }
