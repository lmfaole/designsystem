import type { Meta, StoryObj } from "@storybook/react-vite"

import { Logos } from "../../src/components/logos"
import { square } from "../sample"

const meta = {
  title: "Media/Logos",
  component: Logos,
  tags: ["autodocs"],
  args: { logos: [{ name: "Studio A", src: square(30, "A") }, { name: "Studio B", src: square(200, "B") }] },
  parameters: { docs: { description: { component: `**Use it when** the logos of a thing's makers or sources.

**Do not use it when** pictures of people (\`Person\`).

**Accessibility.** Each logo has the name as text.

**Related.** \`Logo\`, \`Picture\`` } }, },
} satisfies Meta<typeof Logos>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
