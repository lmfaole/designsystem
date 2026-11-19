import type { Meta, StoryObj } from "@storybook/react-vite"

import { Logo } from "../../src/components/logos"
import { square } from "../sample"

const meta = {
  title: "Media/Logo",
  component: Logo,
  tags: ["autodocs"],
  args: { name: "Studio", src: square(30, "S") },
  parameters: { docs: { description: { component: `### Use it when

one maker's or source's mark with a light plate so dark logos show.

### Do not use it when

decoration.

### Accessibility

The name is the text alternative.

### Related

\`Logos\`, \`Picture\`` } }, },
} satisfies Meta<typeof Logo>
export default meta
type Story = StoryObj<typeof meta>

export const Plate: Story = {}
export const Bare: Story = { args: { plate: false } }
