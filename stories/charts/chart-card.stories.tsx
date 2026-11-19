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

The title is a heading; the description says what is counted and how to read it.

### Content

Title says what the chart shows; the line under it says what is counted and over what period.

### Related

\`AreaChart\`, \`ColumnChart\`, \`PageSection\`` } }, },
} satisfies Meta<typeof ChartCard>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Empty: Story = { args: { empty: true, emptyMessage: "Ingenting å vise ennå." } }
