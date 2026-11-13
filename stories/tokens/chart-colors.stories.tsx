import type { Meta, StoryObj } from "@storybook/react-vite"

import { ColorToken } from "../tokens"

/** The grey ramp of the chart components. */
const meta = { title: "Tokens/Chart colours", tags: ["autodocs"] } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Chart1: Story = { render: () => <ColorToken name="chart-1" /> }
export const Chart2: Story = { render: () => <ColorToken name="chart-2" /> }
export const Chart3: Story = { render: () => <ColorToken name="chart-3" /> }
export const Chart4: Story = { render: () => <ColorToken name="chart-4" /> }
export const Chart5: Story = { render: () => <ColorToken name="chart-5" /> }
