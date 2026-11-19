import type { Meta, StoryObj } from "@storybook/react-vite"

import { ValueToken } from "../tokens"

const meta = { title: "Tokens/Motion", tags: ["autodocs", "!manifest"], parameters: { docs: { description: { component: `Durations, easings and distances of \`motion.css\`: instant 100 ms, fast 150, base 250, slow 450 and live 2400, three easings, a distance of 0.75 rem and a stagger of 60 ms. All durations are 0.01 ms under \`prefers-reduced-motion\`.

**Use them** through \`Reveal\`, \`CountUp\` and the staggered entrances; a page never writes a duration of its own.

### Related

guide «Motion», \`Reveal\`, \`CountUp\`` } } } } satisfies Meta
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
