import type { Meta, StoryObj } from "@storybook/react-vite"

import { ChartCard } from "../../src/components/chart-card"
import { ColumnChart } from "../../src/components/column-chart"
import { MONTHS } from "../sample"

const meta = {
  title: "Charts/ChartCard",
  component: ChartCard,
  tags: ["autodocs"],
  args: { title: "Per måned", description: "Antall avspillinger", children: <ColumnChart data={MONTHS} ariaLabel="Per måned" valueLabel="Avspillinger" height={200} /> },
  parameters: { docs: { description: { component: `### Use it when

a chart needs a title, a line about how to read it and an empty state.

### Do not use it when

the chart is the page's only content (use \`PageSection\`), or there is a single number (\`FactList\`).

### Accessibility

**Handled by the component**

- The description is visible text under the title, in the muted token ([1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum))
- With \`empty\`, a sentence takes the chart's place, so nothing is an empty frame ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))

**You check**

- The title is not a heading element: where the page outline needs one, give the card a heading of the right level ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- The title states what the chart shows ([2.4.6 Headings and Labels](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels))
- The chart inside still has its own \`ariaLabel\` ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- \`emptyMessage\` says why there is nothing to chart

### Content

Title says what the chart shows; the line under it says what is counted and over what period.

### Related

\`AreaChart\`, \`ColumnChart\`, \`PageSection\`` } }, },
} satisfies Meta<typeof ChartCard>
export default meta
type Story = StoryObj<typeof meta>

/** A chart with its title and the line that says what is counted. */
export const Default: Story = {}
/** The card's empty state: the sentence in place of the chart. */
export const Empty: Story = { args: { empty: true, emptyMessage: "Ingenting å vise ennå." } }
