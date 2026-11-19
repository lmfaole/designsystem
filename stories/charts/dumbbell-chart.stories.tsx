import type { Meta, StoryObj } from "@storybook/react-vite"

import { DumbbellChart } from "../../src/components/dumbbell-chart"

const meta = {
  title: "Charts/DumbbellChart",
  component: DumbbellChart,
  tags: ["autodocs"],
  args: {
    rows: [
      { label: "Musikk", from: 4820, to: 5360 },
      { label: "Podkast", from: 1210, to: 2240 },
      { label: "Film", from: 96, to: 88 },
      { label: "TV", from: 410, to: 180 },
      { label: "Spill", from: 260, to: 285 },
    ],
    fromLabel: "2024",
    toLabel: "2025",
    ariaLabel: "Timer per medium, 2024 mot 2025",
  },
  parameters: { docs: { description: { component: `### Use it when

several things changed between two moments (a year and the next; before and after) and the question is how much each moved.

### Do not use it when

the things are in different units or sizes by orders of magnitude (the smallest would sit in a heap on one shared axis: use \`ColumnChart\` per thing or percent change), there are more than two moments (\`LineChart\`), more than about twelve things (a table), or a single value against a goal (\`Progress\`).

### Accessibility

**Handled by the component**

- The rows are one image named by \`ariaLabel\`, hidden inside ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- A summary is written by default: how many went up, how many down, the biggest change ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- The start is a ring and the end a filled dot, and the change is written with its sign, so direction is not told by colour ([1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color))
- The values and the change are a \`ChartTable\`, read by a screen reader or opened with \`showTable\` ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- Drawing and table share one order, biggest change first ([1.3.2 Meaningful Sequence](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence))
- Plain HTML with no tab stop or tooltip, so nothing needs a pointer ([2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard))

**You check**

- \`ariaLabel\` names the two moments being compared ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- \`fromLabel\` and \`toLabel\` are the moments' names; they head the table's columns ([2.4.6 Headings and Labels](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels))
- \`formatValue\` includes the unit
- \`keepOrder\` only when your own order carries meaning ([1.3.2 Meaningful Sequence](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence))

### Content

The two moments named in the legend; units in \`formatValue\`.

### Related

\`LineChart\`, \`ColumnChart\`, \`Progress\`` } } },
} satisfies Meta<typeof DumbbellChart>
export default meta
type Story = StoryObj<typeof meta>

/** Rows sorted biggest change first, with rises and falls. */
export const Default: Story = {}
/** The order as given, not sorted by change. */
export const KeepOrder: Story = { args: { keepOrder: true } }
/** Both values and the change as a table anyone can open. */
export const ShowTable: Story = { args: { showTable: true } }
/** No rows: a sentence in the chart's place. */
export const Empty: Story = { args: { rows: [] } }
