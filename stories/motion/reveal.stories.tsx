import type { Meta, StoryObj } from "@storybook/react-vite"

import { Reveal } from "../../src/components/reveal"
import { Text } from "../../src/components/text"

const meta = {
  title: "Motion/Reveal",
  component: Reveal,
  tags: ["autodocs"],
  parameters: { docs: { description: { component: `### Use it when

one block rises into place when it first shows.

### Do not use it when

content that changes on a refetch, a sort or a filter, or more than once per mount.

### Accessibility

Movement only, no fade; off under \`prefers-reduced-motion\`.

### Related

\`CountUp\`, \`Stagger\`, guide «Motion»` } }, },
} satisfies Meta<typeof Reveal>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { children: <Text>This block rises into place (movement only, no fade).</Text> } }
