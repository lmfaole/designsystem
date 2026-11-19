import type { Meta, StoryObj } from "@storybook/react-vite"

import { StackedColumnChart } from "../../src/components/stacked-column-chart"
import { MONTHS } from "../sample"

const meta = {
  title: "Charts/StackedColumnChart",
  component: StackedColumnChart,
  tags: ["autodocs"],
  args: { ariaLabel: "Per måned og sjanger", height: 260, series: ["Rock", "Jazz", "Pop"], data: MONTHS.slice(0, 6).flatMap((m, i) => [
    { label: m.label, series: "Rock", value: m.value }, { label: m.label, series: "Jazz", value: (i * 5) % 11 }, { label: m.label, series: "Pop", value: 8 + i },
  ]) },
  parameters: { docs: { description: { component: `### Use it when

a total is split into a few parts over time (listening per genre per month).

### Do not use it when

there are more than five parts (fold the rest into «Annet») or only one series (\`ColumnChart\`).

### Accessibility

**Handled by the component**

- The chart is one image (\`role="img"\`) named by \`ariaLabel\` ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- The values are a \`ChartTable\` with a column per series, read by a screen reader or opened with \`showTable\` ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- Every series is named in a visible legend list, and parts are separated by a gap ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- Which part is which is in the tooltip and the table, not only in the colour ([1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color))
- Not a tab stop; the tooltip only repeats the table ([2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard))

**You check**

- \`ariaLabel\` says what is counted and over what period, not «Diagram» ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- A \`summary\` that states the message (the finding, not only the numbers) ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- Colours you pass in \`colors\` keep 3:1 against the background and the part next to them ([1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast))
- At most five series, the rest folded into «Annet»

### Content

Name the series on the chart before a legend. Units and period in the title.

### Related

\`ColumnChart\`, \`DonutChart\`, \`ChartCard\`` } }, },
} satisfies Meta<typeof StackedColumnChart>
export default meta
type Story = StoryObj<typeof meta>

/** Three parts per month with the legend beside or under. */
export const Default: Story = {}
/** The visible summary under the chart, the text that states the message. */
export const WithSummary: Story = { args: { summary: "Søylediagram. Avspillinger, 12 verdier. Høyest mar (402), lavest des (210). Økte fra 210 til 380." } }
/** A column per series in a table anyone can open. */
export const ShowTable: Story = { args: { showTable: true } }
/** No data: a sentence in the chart's place. */
export const Empty: Story = { args: { data: [] } }
