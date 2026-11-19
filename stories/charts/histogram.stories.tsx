import type { Meta, StoryObj } from "@storybook/react-vite"

import { Histogram } from "../../src/components/histogram"
import { sampleLengths } from "./_data"

const meta = {
  title: "Charts/Histogram",
  component: Histogram,
  tags: ["autodocs"],
  args: { values: sampleLengths(240, 38, 40, 5), valueName: "Lengde (min)", unit: "min", ariaLabel: "Fordeling av albumlengder", height: 240 },
  parameters: { docs: { description: { component: `### Use it when

there are many values of one thing and the question is their shape: where they pile up, how wide they spread, whether there is a tail.

### Do not use it when

there are fewer than about ten values (a list), the categories are named (\`ColumnChart\`), or several groups are compared (\`BoxPlot\`).

### Accessibility

**Handled by the component**

- The chart is one image (\`role="img"\`) named by \`ariaLabel\` ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- A summary is written by default, with the median and the fullest interval ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- The bins and their counts are a \`ChartTable\`, read by a screen reader or opened with \`showTable\` ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- Not a tab stop; the tooltip only repeats the table, so nothing needs a pointer ([2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard))
- Bars take their colour from the theme tokens, in light and dark ([1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast))

**You check**

- \`ariaLabel\` says what the values are, and \`valueName\` has the unit ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- A \`summary\` you write states the shape (where it piles up, the tail) ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))

### Content

Name the value with its unit; the count is «Antall».

### Related

\`BoxPlot\`, \`ColumnChart\`, \`ScatterChart\`` } } },
} satisfies Meta<typeof Histogram>
export default meta
type Story = StoryObj<typeof meta>

/** Bins chosen by Freedman–Diaconis from the data. */
export const Default: Story = {}
/** A number of bins asked for, coarser than the default. */
export const FewBins: Story = { args: { bins: 6 } }
/** Bins and counts as a table anyone can open. */
export const ShowTable: Story = { args: { showTable: true } }
/** No values: a sentence in the chart's place. */
export const Empty: Story = { args: { values: [] } }
