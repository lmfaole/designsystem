import type { Meta, StoryObj } from "@storybook/react-vite"

import { RankedBarChart } from "../../../src/components/ranked-bar-chart"

const meta = {
  title: "Components/Charts/RankedBarChart",
  component: RankedBarChart,
  tags: ["autodocs"],
  args: { data: [{ label: "Alfa", value: 42 }, { label: "Beta", value: 31 }, { label: "Gamma", value: 18 }, { label: "Delta", value: 7 }], ariaLabel: "Mest spilt", valueLabel: "Avspillinger" },
  parameters: { docs: { description: { component: `### Use it when

things are ranked by one number, longest first (most played, biggest cost).

### Do not use it when

the order is not the point (\`ColumnChart\`), or there are more than ten bars.

### Accessibility

**Handled by the component**

- The chart is one image (\`role="img"\`) named by \`ariaLabel\` ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- The values are a \`ChartTable\` in the same order as the bars, read by a screen reader or opened with \`showTable\` ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- Each bar has its name as text on the axis; one series, so no legend to match by colour ([1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color))
- Not a tab stop; the tooltip only repeats the table, so nothing needs a pointer ([2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard))
- Bars take their colour from the theme tokens, in light and dark ([1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast))

**You check**

- \`ariaLabel\` says what is counted and over what period, not «Diagram» ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- The data is sorted longest first; the component draws the order it is given ([1.3.2 Meaningful Sequence](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence))
- A \`summary\` that states the message (the finding, not only the numbers) ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- At most ten bars, and the page says where the rest are

### Content

Names are the strongest part; show at most ten and say where the rest is.

### Related

\`ColumnChart\`, \`ChartCard\`, \`Rows\`` } }, },
} satisfies Meta<typeof RankedBarChart>
export default meta
type Story = StoryObj<typeof meta>

/** Bars longest first, each named on the axis. */
export const Default: Story = {}
/** The visible summary under the chart, the text that states the message. */
export const WithSummary: Story = { args: { summary: "Søylediagram. Avspillinger, 12 verdier. Høyest mar (402), lavest des (210). Økte fra 210 til 380." } }
/** The values in the bars' order, in a table anyone can open. */
export const ShowTable: Story = { args: { showTable: true } }
/** No data: a sentence in the chart's place. */
export const Empty: Story = { args: { data: [] } }
