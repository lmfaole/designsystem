import type { Meta, StoryObj } from "@storybook/react-vite"

import { ColorToken } from "../tokens"

/** One colour for each series of a multi-series chart; lighter in dark mode. */
const meta = { title: "Tokens/Series colours", tags: ["autodocs"] } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Series1: Story = { render: () => <ColorToken name="series-1" /> }
export const Series2: Story = { render: () => <ColorToken name="series-2" /> }
export const Series3: Story = { render: () => <ColorToken name="series-3" /> }
export const Series4: Story = { render: () => <ColorToken name="series-4" /> }
export const Series5: Story = { render: () => <ColorToken name="series-5" /> }
export const Series6: Story = { render: () => <ColorToken name="series-6" /> }
