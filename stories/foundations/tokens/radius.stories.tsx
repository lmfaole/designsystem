import type { Meta, StoryObj } from "@storybook/react-vite"

import { RadiusToken } from "../../tokens"

const meta = { title: "Foundations/Tokens/Radius", tags: ["autodocs", "!manifest"], parameters: { docs: { description: { component: `\`--radius\` (0.625 rem) and the steps Tailwind gets from it: \`sm\` 0.6, \`md\` 0.8, \`lg\` 1, \`xl\` 1.4, \`2xl\` 1.8, \`3xl\` 2.2 and \`4xl\` 2.6 times the base.

**Use them** through the components, which each pick their step. Things of one kind have one radius, and a box inside another has a smaller one.

### Related

\`Card\`, \`Badge\`, \`Banner\`` } } } } satisfies Meta
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
