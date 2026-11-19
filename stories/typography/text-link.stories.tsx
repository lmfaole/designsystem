import type { Meta, StoryObj } from "@storybook/react-vite"

import { TextLink } from "../../src/components/text"

const meta = {
  title: "Typography/TextLink",
  component: TextLink,
  tags: ["autodocs"],
  args: { href: "#", children: "A link" },
  parameters: { docs: { description: { component: `**Use it when** a link that continues in the same place, in running text.

**Do not use it when** a link out (\`ExternalLink\`) or an action that goes somewhere as a button (\`LinkButton\`).

**Accessibility.** A real link with text that says where it goes.

**Content.** Never «Klikk her» or «Les mer».

**Related.** \`ExternalLink\`, \`CardLink\`, \`LinkButton\`` } }, },
} satisfies Meta<typeof TextLink>
export default meta
type Story = StoryObj<typeof meta>

export const Internal: Story = {}
export const External: Story = { args: { external: true, href: "https://example.com" } }
