import type { Meta, StoryObj } from "@storybook/react-vite"

import { CalendarHeatmap } from "../../src/components/calendar-heatmap"
import { sampleDays } from "./_data"

const meta = {
  title: "Charts/CalendarHeatmap",
  component: CalendarHeatmap,
  tags: ["autodocs"],
  args: { days: sampleDays(), ariaLabel: "Avspillinger per dag i 2026", unit: "avspillinger" },
  parameters: { docs: { description: { component: `### Use it when

the question is rhythm: which days, which weekdays and which stretches had something, over a few months to a year (GitHub's contribution graph is this).

### Do not use it when

the reader needs a total, a trend or a comparison (\`ColumnChart\`, \`LineChart\`), or the period is under a month (a list).

### Accessibility

The grid is one image with a label and a summary text under it; each cell has a title for a pointer; the months are a table (\`showTable\`, «Vis tallene») for a phone and a screen reader, not 365 rows. Four steps from the **quantiles** of the busy days, so one huge day does not turn the rest pale; a day with no row is empty and a row with 0 is zero. The steps are greys that keep 3:1, they are not the only way to read it (title, table, legend), and they survive forced colours. A year is wider than a phone, so the box scrolls sideways, as a region a keyboard can reach.

### Content

Say the unit in the plural: «avspillinger», «commits». Title: what the pattern is, not «Kalender».

### Related

\`Heatmap\` (two categories), \`ColumnChart\`, guide «Data visualisation»` } } },
} satisfies Meta<typeof CalendarHeatmap>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const ShowTable: Story = { args: { showTable: true } }
export const OneMonth: Story = { args: { days: sampleDays().filter((day) => day.date.startsWith("2026-03")) } }
export const Empty: Story = { args: { days: [] } }
