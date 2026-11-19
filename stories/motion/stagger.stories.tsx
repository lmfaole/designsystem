import type { Meta, StoryObj } from "@storybook/react-vite"

import { Stagger } from "../../src/components/reveal"

const meta = {
  title: "Motion/Stagger",
  component: Stagger,
  tags: ["autodocs"],
  args: { children: null },
  parameters: { docs: { description: { component: `### Use it when

items enter one after another when a page arrives.

### Do not use it when

content that changes after load.

### Accessibility

Movement only; off under \`prefers-reduced-motion\`.

### Related

\`Reveal\`, guide «Motion»` } }, },
} satisfies Meta<typeof Stagger>
export default meta
type Story = StoryObj<typeof meta>

export const List: Story = { args: { as: "ul", children: [1, 2, 3, 4].map((n) => <li key={n}>Item {n}</li>) } }
