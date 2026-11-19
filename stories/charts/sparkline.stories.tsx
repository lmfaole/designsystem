import type { Meta, StoryObj } from "@storybook/react-vite"

import { Sparkline } from "../../src/components/sparkline"
import { Text } from "../../src/components/text"

const meta = {
  title: "Charts/Sparkline",
  component: Sparkline,
  tags: ["autodocs"],
  args: { values: [4, 6, 5, 9, 12, 10, 14], label: "Avspillinger siste sju dager: økte fra 4 til 14" },
  parameters: { docs: { description: { component: `### Use it when

a number on a row or a summary needs its shape over time: how it moved, beside how big it is (a count with its trend).

### Do not use it when

the reader needs to read values (use \`AreaChart\` or \`ColumnChart\`), there are fewer than three values (the number is the better chart: nothing is drawn), or it would stand alone without the number.

### Accessibility

**Handled by the component**

- A plain \`svg\` with \`role="img"\`, named by \`label\` ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- Drawn in the text's own colour, so it keeps the contrast of the text around it ([1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast))
- Nothing to focus and no tooltip, so nothing needs a pointer ([2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard))

**You check**

- \`label\` says what is counted, the period and how it moved («økte fra 4 til 14») ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- The number it belongs to is written next to it as text ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- With fewer than three values nothing is drawn, so the text around it still makes sense alone ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))

### Content

The label names what it counts, the period and the movement. Put the number next to it, in words.

### Related

\`AreaChart\`, \`SummaryBar\`, \`Time\`` } } },
} satisfies Meta<typeof Sparkline>
export default meta
type Story = StoryObj<typeof meta>

/** A rising week, with its last point marked. */
export const Default: Story = {}
/** A falling line and a label that says so. */
export const Falling: Story = { args: { values: [14, 12, 13, 9, 7, 6], label: "Falt fra 14 til 6" } }
/** No change: a flat line at the middle. */
export const Flat: Story = { args: { values: [5, 5, 5, 5], label: "Uendret på 5" } }
/** Two values: nothing is drawn. */
export const TooFew: Story = { args: { values: [3, 4] } }
/** In use, word-sized beside the number it belongs to. */
export const BesideANumber: Story = { render: (args) => (<Text as="span" size="lg">14 avspillinger <Sparkline {...args} /></Text>) }
