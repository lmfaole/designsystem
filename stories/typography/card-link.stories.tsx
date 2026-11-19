import type { Meta, StoryObj } from "@storybook/react-vite"

import { CardLink } from "../../src/components/card-link"

const meta = {
  title: "Typography/CardLink",
  component: CardLink,
  tags: ["autodocs"],
  args: { href: "#", children: "Ridley Scott" },
  parameters: { docs: { description: { component: `### Use it when

a name that has a page: a link in a row or a card.

### Do not use it when

a link out (\`ExternalLink\`).

### Accessibility

A real link; \`block\` fills the line when it holds a picture and a text.

### Content

The name of the thing.

### Related

\`TextLink\`, \`Rows\`` } }, },
} satisfies Meta<typeof CardLink>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Strong: Story = { args: { look: "strong" } }
export const Block: Story = { args: { look: "block" } }
