import type { Meta, StoryObj } from "@storybook/react-vite"

import { ColumnChart } from "../../../src/components/column-chart"
import { MONTHS } from "../../sample"

const meta = {
  title: "Components/Charts/ColumnChart",
  component: ColumnChart,
  tags: ["autodocs"],
  args: { data: MONTHS, ariaLabel: "Avspillinger per måned", valueLabel: "Avspillinger", height: 240 },
  parameters: { docs: { description: { component: `### Use it when

a few categories are compared, left to right in a fixed order (hours, weekdays, months).

### Do not use it when

the categories are ranked by size (\`RankedBarChart\`), or there are more than ten.

### Accessibility

**Handled by the component**

- The chart is one image (\`role="img"\`) named by \`ariaLabel\` ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- The exact values are a \`ChartTable\` with row and column headers, read by a screen reader or opened by anyone with \`showTable\` («Vis tallene») ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- Not a tab stop; the tooltip only repeats the table, so nothing needs a pointer ([2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard))
- Every column is in the table, also those \`labelEvery\` leaves unlabelled on the axis ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- Columns take their colour from the theme tokens, in light and dark ([1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast))

**You check**

- \`ariaLabel\` says what is counted and over what period, not «Diagram» ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- A \`summary\` that states the message (the finding, not only the numbers) ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- A \`color\` you pass keeps 3:1 against the background ([1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast))
- \`valueLabel\` names what is counted; it heads the table's column ([2.4.6 Headings and Labels](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels))

### Content

Labels are short. The title says what is counted and in what unit.

### Related

\`RankedBarChart\`, \`AreaChart\`, \`ChartCard\`` } }, },
} satisfies Meta<typeof ColumnChart>
export default meta
type Story = StoryObj<typeof meta>

/** Twelve months, every column labelled. */
export const Default: Story = {}
/** A crowded axis thinned to every second label. */
export const LabelEvery2: Story = { args: { labelEvery: 2 } }
/** The visible summary under the chart, the text that states the message. */
export const WithSummary: Story = { args: { summary: "Søylediagram. Avspillinger, 12 verdier. Høyest mar (402), lavest des (210). Økte fra 210 til 380." } }
/** The «Vis tallene» table anyone can open, not only a screen reader. */
export const ShowTable: Story = { args: { showTable: true } }
/** No data: a sentence in the chart's place, at its height. */
export const Empty: Story = { args: { data: [] } }
