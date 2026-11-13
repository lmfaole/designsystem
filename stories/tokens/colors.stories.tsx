import type { Meta, StoryObj } from "@storybook/react-vite"

import { ColorToken } from "../tokens"

/** The base colours of `theme.css`, light and dark. Read live from the page's computed style. */
const meta = { title: "Tokens/Colours", tags: ["autodocs"] } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Background: Story = { render: () => <ColorToken name="background" /> }
export const Foreground: Story = { render: () => <ColorToken name="foreground" /> }
export const Card: Story = { render: () => <ColorToken name="card" /> }
export const CardForeground: Story = { render: () => <ColorToken name="card-foreground" /> }
export const Popover: Story = { render: () => <ColorToken name="popover" /> }
export const PopoverForeground: Story = { render: () => <ColorToken name="popover-foreground" /> }
export const Primary: Story = { render: () => <ColorToken name="primary" /> }
export const PrimaryForeground: Story = { render: () => <ColorToken name="primary-foreground" /> }
export const Secondary: Story = { render: () => <ColorToken name="secondary" /> }
export const SecondaryForeground: Story = { render: () => <ColorToken name="secondary-foreground" /> }
export const Muted: Story = { render: () => <ColorToken name="muted" /> }
export const MutedForeground: Story = { render: () => <ColorToken name="muted-foreground" /> }
export const Accent: Story = { render: () => <ColorToken name="accent" /> }
export const AccentForeground: Story = { render: () => <ColorToken name="accent-foreground" /> }
export const Destructive: Story = { render: () => <ColorToken name="destructive" /> }
export const Border: Story = { render: () => <ColorToken name="border" /> }
export const Input: Story = { render: () => <ColorToken name="input" /> }
export const Ring: Story = { render: () => <ColorToken name="ring" /> }
export const LogoPlate: Story = { render: () => <ColorToken name="logo-plate" /> }
