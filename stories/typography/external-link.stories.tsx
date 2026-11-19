import type { Meta, StoryObj } from "@storybook/react-vite"

import { ExternalLink } from "../../src/components/external-link"

const meta = {
  title: "Typography/ExternalLink",
  component: ExternalLink,
  tags: ["autodocs"],
  args: { href: "https://example.com", children: "example.com" },
  parameters: { docs: { description: { component: `### Use it when

a link out to another site, in running text or as a pill among a thing's other places.

### Do not use it when

a link that stays in the app (\`TextLink\`, \`CardLink\`).

### Accessibility

Marked with the symbol and read as external; \`rel\` is not a prop because it is a safety property.

### Content

Names the place: «GitHub», not «Klikk her».

### Related

\`LinkButton\`, \`TextLink\`` } }, },
} satisfies Meta<typeof ExternalLink>
export default meta
type Story = StoryObj<typeof meta>

export const Text: Story = {}
export const Pill: Story = { args: { look: "pill" } }
