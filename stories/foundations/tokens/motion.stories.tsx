import type { Meta, StoryObj } from "@storybook/react-vite"

import { ValueToken } from "../../tokens"

const meta = { title: "Foundations/Tokens/Motion", tags: ["autodocs", "!manifest"], parameters: { docs: { description: { component: `Durations, easings and distances of \`motion.css\`, named by purpose: instant 100 ms, fast 150, enter 250, exit 200, reveal 300, slow 400, data 700 and live 2400; the easings enter, exit, standard, spring and linear; a distance of 0.75 rem and a stagger of 40 ms. The old names (\`base\`, \`ease-out\`, \`ease-in\`) stay as aliases. All durations are 0.01 ms under \`prefers-reduced-motion\`.

**Use them** through \`Reveal\`, \`CountUp\` and the staggered entrances; a page never writes a duration of its own.

### Related

guide «Motion», \`Reveal\`, \`CountUp\`` } } } } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const DurationInstant: Story = { render: () => <ValueToken name="motion-duration-instant" /> }
export const DurationFast: Story = { render: () => <ValueToken name="motion-duration-fast" /> }
export const DurationEnter: Story = { render: () => <ValueToken name="motion-duration-enter" /> }
export const DurationExit: Story = { render: () => <ValueToken name="motion-duration-exit" /> }
export const DurationReveal: Story = { render: () => <ValueToken name="motion-duration-reveal" /> }
export const DurationSlow: Story = { render: () => <ValueToken name="motion-duration-slow" /> }
export const DurationData: Story = { render: () => <ValueToken name="motion-duration-data" /> }
export const DurationLive: Story = { render: () => <ValueToken name="motion-duration-live" /> }
export const EaseEnter: Story = { render: () => <ValueToken name="motion-ease-enter" /> }
export const EaseExit: Story = { render: () => <ValueToken name="motion-ease-exit" /> }
export const EaseStandard: Story = { render: () => <ValueToken name="motion-ease-standard" /> }
export const EaseSpring: Story = { render: () => <ValueToken name="motion-ease-spring" /> }
export const EaseInOut: Story = { render: () => <ValueToken name="motion-ease-in-out" /> }
export const Distance: Story = { render: () => <ValueToken name="motion-distance" /> }
export const Stagger: Story = { render: () => <ValueToken name="motion-stagger" /> }
