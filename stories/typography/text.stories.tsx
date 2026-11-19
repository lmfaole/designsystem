import type { Meta, StoryObj } from "@storybook/react-vite"

import { Text } from "../../src/components/text"

const meta = {
  title: "Typography/Text",
  component: Text,
  tags: ["autodocs"],
  args: { children: "Blåbærsyltetøy på skiva." },
  parameters: { docs: { description: { component: `**Use it when** running text in the few forms the system has: size, tone, weight.

**Do not use it when** a heading (\`Heading\`) or a label next to a field (\`TextField\`).

**Accessibility.** Real paragraphs; muted text still meets 4.5:1.

**Content.** Plain words, active voice, «du» to the reader.

**Related.** \`Heading\`, \`Lines\`, \`Markdown\`` } }, },
} satisfies Meta<typeof Text>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Small: Story = { args: { size: "sm" } }
export const Large: Story = { args: { size: "lg" } }
export const Muted: Story = { args: { tone: "muted" } }
export const Destructive: Story = { args: { tone: "destructive" } }
export const Semibold: Story = { args: { weight: "semibold" } }
export const Numeric: Story = { args: { numeric: true, children: "1 111 8 888" } }
export const Truncated: Story = { args: { truncate: true, children: "One long line that is cut with an ellipsis when there is not room for all of it, however long it goes on, and on, and on, and on, and on, and on, and on" }, decorators: [(Story) => <div className="max-w-sm"><Story /></div>] }
