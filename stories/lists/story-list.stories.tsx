import type { Meta, StoryObj } from "@storybook/react-vite"

import { StoryList } from "../../src/components/story-list"

const meta = {
  title: "Lists/StoryList",
  component: StoryList,
  tags: ["autodocs"],
  args: { stories: [{ key: "1", href: "https://example.com", title: "A large link out to another site", byline: "example.com · 12 poeng" }, { key: "2", href: "https://example.com", title: "A second story", byline: "example.org · 3 poeng" }] },
  parameters: { docs: { description: { component: `**Use it when** longer stories with a title and a line about where they are from and when.

**Do not use it when** short list rows (\`Rows\`).

**Accessibility.** Real links with the title as text.

**Content.** The line under the title says the source and the time.

**Related.** \`HeadlineList\`, \`Time\`` } }, },
} satisfies Meta<typeof StoryList>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
