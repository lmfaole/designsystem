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

**Handled by the component**

- The grid is one image named by \`ariaLabel\`; the cells and labels are hidden from a screen reader ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- A summary is written by default (\`summariseCalendar\`) ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- The months are a \`ChartTable\` (sum, days with something), read by a screen reader or opened with \`showTable\` ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- The step is not the only cue: each cell has a title with its value, and the table has the numbers ([1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color))
- Step greys and cell borders keep 3:1 ([1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast))
- A year scrolls sideways inside its own box, so the page itself does not ([1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow))
- That box is a named region in the tab order, so a keyboard can scroll it ([2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard))

**You check**

- \`ariaLabel\` says what is counted and over what period, not «Diagram» ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- \`unit\` reads right in the plural, and as \`{ one, many }\` where a count of one occurs
- The scroll box shows its focus in your theme ([2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible))

### Content

Say the unit in the plural: «avspillinger», «commits». Title: what the pattern is, not «Kalender».

### Related

\`Heatmap\` (two categories), \`ColumnChart\`, guide «Data visualisation»` } } },
} satisfies Meta<typeof CalendarHeatmap>
export default meta
type Story = StoryObj<typeof meta>

/** A year of days, scrolling sideways inside its own box on a phone. */
export const Default: Story = {}
/** The months as a table anyone can open, not 365 rows. */
export const ShowTable: Story = { args: { showTable: true } }
/** A short period, to see how few weeks look. */
export const OneMonth: Story = { args: { days: sampleDays().filter((day) => day.date.startsWith("2026-03")) } }
/** No days: a sentence in the chart's place. */
export const Empty: Story = { args: { days: [] } }
