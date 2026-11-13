import type { Meta, StoryObj } from "@storybook/react-vite"

import { ValueToken } from "../tokens"

/** Durations, easings and distances of `motion.css`. All collapse to ~0 under `prefers-reduced-motion`. */
const meta = { title: "Tokens/Motion", tags: ["autodocs"] } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const DurationInstant: Story = { render: () => <ValueToken name="motion-duration-instant" /> }
export const DurationFast: Story = { render: () => <ValueToken name="motion-duration-fast" /> }
export const DurationBase: Story = { render: () => <ValueToken name="motion-duration-base" /> }
export const DurationSlow: Story = { render: () => <ValueToken name="motion-duration-slow" /> }
export const DurationLive: Story = { render: () => <ValueToken name="motion-duration-live" /> }
export const EaseOut: Story = { render: () => <ValueToken name="motion-ease-out" /> }
export const EaseIn: Story = { render: () => <ValueToken name="motion-ease-in" /> }
export const EaseInOut: Story = { render: () => <ValueToken name="motion-ease-in-out" /> }
export const Distance: Story = { render: () => <ValueToken name="motion-distance" /> }
export const Stagger: Story = { render: () => <ValueToken name="motion-stagger" /> }
