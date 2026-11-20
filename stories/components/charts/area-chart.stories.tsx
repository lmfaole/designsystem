import type { Meta, StoryObj } from "@storybook/react-vite"

import { AreaChart } from "../../../src/components/area-chart"
import { MONTHS } from "../../sample"

const meta = {
  title: "Components/Charts/AreaChart",
  component: AreaChart,
  tags: ["autodocs"],
  args: { data: MONTHS, ariaLabel: "Utvikling over tid", valueLabel: "Avspillinger", height: 240 },
  parameters: { docs: { description: { component: `### Use it when

a value changes over time or along an ordered axis (months, hours).

### Do not use it when

there are more than five series (use a table), or the reader needs exact values (add the table, or use a \`FactList\`).

### Accessibility

**Handled by the component**

- The chart is one image (\`role="img"\`) named by \`ariaLabel\` ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- The exact values are a \`ChartTable\` with row and column headers, read by a screen reader or opened by anyone with \`showTable\` («Vis tallene») ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- Not a tab stop; the tooltip only repeats the table, so nothing needs a pointer ([2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard))
- Line, area and points take their colour from the theme tokens, in light and dark ([1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast))

**You check**

- \`ariaLabel\` says what is counted and over what period, not «Diagram» ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- A \`summary\` that states the message (the finding, not only the numbers) ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- A \`color\` you pass keeps 3:1 against the background ([1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast))
- \`valueLabel\` names what is counted; it heads the table's column ([2.4.6 Headings and Labels](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels))

### Content

A title that says what it shows with the unit and the period. Data oldest first.

### Related

\`ColumnChart\`, \`StackedColumnChart\`, \`ChartCard\`, guide «Data visualisation»` } }, },
} satisfies Meta<typeof AreaChart>
export default meta
type Story = StoryObj<typeof meta>

/** The area with its line and points, the shape over time. */
export const Default: Story = {}
/** The visible summary under the chart, the text that states the message. */
export const WithSummary: Story = { args: { summary: "Søylediagram. Avspillinger, 12 verdier. Høyest mar (402), lavest des (210). Økte fra 210 til 380." } }
/** The «Vis tallene» table anyone can open, not only a screen reader. */
export const ShowTable: Story = { args: { showTable: true } }
/** No data: a sentence in the chart's place, at its height. */
export const Empty: Story = { args: { data: [] } }
