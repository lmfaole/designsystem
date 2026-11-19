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

A plain \`svg\` read as an image with its \`label\`, which says what it shows and how it moved («økte fra 4 til 14»); the exact values are wherever the number is explained. No script, no tooltip, nothing to focus.

### Content

The label names what it counts, the period and the movement. Put the number next to it, in words.

### Related

\`AreaChart\`, \`SummaryBar\`, \`Time\`` } } },
} satisfies Meta<typeof Sparkline>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Falling: Story = { args: { values: [14, 12, 13, 9, 7, 6], label: "Falt fra 14 til 6" } }
export const Flat: Story = { args: { values: [5, 5, 5, 5], label: "Uendret på 5" } }
export const TooFew: Story = { args: { values: [3, 4] } }
export const BesideANumber: Story = { render: (args) => (<Text as="span" size="lg">14 avspillinger <Sparkline {...args} /></Text>) }
