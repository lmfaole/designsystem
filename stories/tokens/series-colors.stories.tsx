import type { Meta, StoryObj } from "@storybook/react-vite"

import { ColorToken } from "../tokens"

const meta = { title: "Tokens/Series colours", tags: ["autodocs"], parameters: { docs: { description: { component: `Six hues of one lightness, one for each series of a chart that is given colours of its own (lighter in dark mode). They meet 3:1 on the page (5.2 to 6.5:1 in light and 9.4 to 10.4:1 in dark).

**Use them** when a chart needs colours (a thing that has a colour of its own). They carry no meaning and are never used for a state.

**Do not** use them to tell series apart without naming the series on the chart.

**Related.** \`StackedColumnChart\`, \`DonutChart\`, guide «Data visualisation»` } } } } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Series1: Story = { render: () => <ColorToken name="series-1" /> }
export const Series2: Story = { render: () => <ColorToken name="series-2" /> }
export const Series3: Story = { render: () => <ColorToken name="series-3" /> }
export const Series4: Story = { render: () => <ColorToken name="series-4" /> }
export const Series5: Story = { render: () => <ColorToken name="series-5" /> }
export const Series6: Story = { render: () => <ColorToken name="series-6" /> }
