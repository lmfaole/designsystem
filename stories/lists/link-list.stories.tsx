import type { Meta, StoryObj } from "@storybook/react-vite"

import { LinkList } from "../../src/components/fact-list"

const meta = {
  title: "Lists/LinkList",
  component: LinkList,
  tags: ["autodocs"],
  args: { links: [["IMDb", "https://example.com"], ["Wikipedia", "https://example.com"], ["Missing", null]] },
  parameters: { docs: { description: { component: `**Use it when** a few links to a thing's other places, on one line.

**Do not use it when** links that continue in the app (\`SubPages\`).

**Accessibility.** Each link out is marked as external.

**Content.** Each link names the place («GitHub», not «Les mer»).

**Related.** \`ExternalLink\`, \`LinkButton\`` } }, },
} satisfies Meta<typeof LinkList>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
