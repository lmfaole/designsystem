import type { Meta, StoryObj } from "@storybook/react-vite"

import { DonutChart } from "../../../src/components/donut-chart"

const meta = {
  title: "Components/Charts/DonutChart",
  component: DonutChart,
  tags: ["autodocs"],
  args: { ariaLabel: "Andel per sjanger", formatValue: (value: number) => `${value} avspillinger`, data: [{ label: "Rock", value: 120 }, { label: "Jazz", value: 80 }, { label: "Pop", value: 60 }, { label: "Folk", value: 30 }, { label: "Klassisk", value: 20 }, { label: "Annet", value: 12 }] },
  parameters: { docs: { description: { component: `### Use it when

one whole is split into a few parts and the share is the point.

### Do not use it when

there are more than five parts, or the parts must be compared closely (\`RankedBarChart\`).

### Accessibility

**Handled by the component**

- The ring is hidden from a screen reader; the figure is named by \`ariaLabel\` ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- The legend is a visible list with each part's name and share (and its value with \`formatValue\`), so no part is told by colour alone ([1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color))
- Parts past \`keep\` fold into one «Andre», so the list stays short and complete ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- No tab stop and no tooltip: everything is text ([2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard))

**You check**

- \`ariaLabel\` names the whole that is split ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- A \`summary\` that states the message (the finding, not only the numbers) ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- \`formatValue\` includes the unit («12 avspillinger»)
- Slice colours you set (\`--donut-base\`, a slice's \`color\`) keep 3:1 against their neighbours ([1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast))

### Content

Five slices at most, the rest folded into «Annet». Say the share as a number.

### Related

\`RankedBarChart\`, \`StackedColumnChart\`, \`SummaryBar\`` } }, },
} satisfies Meta<typeof DonutChart>
export default meta
type Story = StoryObj<typeof meta>

/** Six parts: five slices and the rest folded into «Andre». */
export const Default: Story = {}
/** Fewer own slices, more folded into «Andre». */
export const KeepThree: Story = { args: { keep: 3 } }
/** The visible summary that names the biggest share. */
export const WithSummary: Story = { args: { summary: "Ringdiagram. Rock er størst med 38 %, de fem største utgjør 81 %." } }
/** No data: a sentence in the chart's place. */
export const Empty: Story = { args: { data: [] } }
