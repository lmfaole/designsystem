import type { Meta, StoryObj } from "@storybook/react-vite"

import { Heading } from "../../src/components/text"

const meta = {
  title: "Typography/Heading",
  component: Heading,
  tags: ["autodocs"],
  args: { level: 2, children: "A heading" },
  parameters: { docs: { description: { component: `**Use it when** a heading: \`level\` is the element and the look is chosen apart, so the page's outline and its looks are decided separately.

**Do not use it when** bold text that is not a heading (\`Text\`).

**Accessibility.** One \`h1\` per page and no skipped levels.

**Content.** A title is a noun or a short phrase, in sentence case.

**Related.** \`PageHeader\`, \`PageSection\`, \`Text\`` } }, },
} satisfies Meta<typeof Heading>
export default meta
type Story = StoryObj<typeof meta>

export const Page: Story = { args: { level: 1, look: "page" } }
export const Section: Story = { args: { level: 2, look: "section" } }
export const Label: Story = { args: { level: 3, look: "label" } }
export const Item: Story = { args: { level: 3, look: "item" } }
