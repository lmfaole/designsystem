import type { Meta, StoryObj } from "@storybook/react-vite"

import { LiveDot } from "../../src/components/live-dot"

const meta = {
  title: "Feedback/LiveDot",
  component: LiveDot,
  tags: ["autodocs"],
  parameters: { docs: { description: { component: `**Use it when** something is live and updates by itself (a feed, a status).

**Do not use it when** the page merely loads fresh data, or as the only sign that something is live (say «live» in text).

**Accessibility.** Decoration only and hidden from assistive technology. It is still, not pulsing, for anyone who asks for less motion.

**Content.** Always say «Live» in text next to it.

**Related.** \`Time\`, \`Banner\`` } }, },
} satisfies Meta<typeof LiveDot>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
