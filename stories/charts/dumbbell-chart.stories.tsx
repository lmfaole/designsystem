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

One image with a label and a summary (how many up, how many down, the biggest change); each row writes both values and the change with its sign; the **start is a ring and the end a filled dot**, so direction is not told by colour. A table (\`showTable\`). Biggest change first (\`keepOrder\` keeps yours). Plain HTML, no script.

### Content

The two moments named in the legend; units in \`formatValue\`.

### Related

\`LineChart\`, \`ColumnChart\`, \`Progress\`` } } },
} satisfies Meta<typeof DumbbellChart>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const KeepOrder: Story = { args: { keepOrder: true } }
export const ShowTable: Story = { args: { showTable: true } }
export const Empty: Story = { args: { rows: [] } }
