import type { Meta, StoryObj } from "@storybook/react-vite"

import { ColorToken } from "../../tokens"

const meta = { title: "Foundations/Tokens/Chart colours", tags: ["autodocs", "!manifest"], parameters: { docs: { description: { component: `The grey ramp of the chart components, the same in light and dark.

**Use it** for marks that are not given a colour of their own.

**Do not** rely on one step alone for a mark that carries meaning: \`chart-1\` is 1.5:1 on a light page and \`chart-3\` to \`chart-5\` are 2.5, 1.9 and 1.3:1 on a dark one. Name the series on the chart.

### Related

\`AreaChart\`, \`ColumnChart\`, guide «Data visualisation»` } } } } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Chart1: Story = { render: () => <ColorToken name="chart-1" /> }
export const Chart2: Story = { render: () => <ColorToken name="chart-2" /> }
export const Chart3: Story = { render: () => <ColorToken name="chart-3" /> }
export const Chart4: Story = { render: () => <ColorToken name="chart-4" /> }
export const Chart5: Story = { render: () => <ColorToken name="chart-5" /> }
