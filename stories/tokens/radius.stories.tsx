import type { Meta, StoryObj } from "@storybook/react-vite"

import { RadiusToken } from "../tokens"

/** `--radius` and the steps Tailwind gets from it. */
const meta = { title: "Tokens/Radius", tags: ["autodocs"] } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Radius: Story = { render: () => <RadiusToken name="radius" /> }
export const Sm: Story = { render: () => <RadiusToken name="sm" /> }
export const Md: Story = { render: () => <RadiusToken name="md" /> }
export const Lg: Story = { render: () => <RadiusToken name="lg" /> }
export const Xl: Story = { render: () => <RadiusToken name="xl" /> }
export const X2xl: Story = { render: () => <RadiusToken name="2xl" /> }
export const X3xl: Story = { render: () => <RadiusToken name="3xl" /> }
export const X4xl: Story = { render: () => <RadiusToken name="4xl" /> }
