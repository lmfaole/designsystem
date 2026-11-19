import type { Meta, StoryObj } from "@storybook/react-vite"

import { HeadlineList } from "../../src/components/headline-list"

const meta = {
  title: "Lists/HeadlineList",
  component: HeadlineList,
  tags: ["autodocs"],
  args: { headlines: [{ key: "1", href: "https://example.com", title: "A headline from elsewhere", note: "example.com · i dag" }, { key: "2", href: "https://example.com", title: "Another one", note: "example.org · i går" }] },
  parameters: { docs: { description: { component: `**Use it when** a list of headlines with a source and a time: news, a feed.

**Do not use it when** things the reader operates (\`Rows\`).

**Accessibility.** Real links; the source and time are muted text after the title.

**Content.** The title is the strongest part; the source and the time follow.

**Related.** \`StoryList\`, \`Time\`, \`Rows\`` } }, },
} satisfies Meta<typeof HeadlineList>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
