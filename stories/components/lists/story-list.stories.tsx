import type { Meta, StoryObj } from "@storybook/react-vite"

import { StoryList } from "../../../src/components/story-list"

const meta = {
  title: "Components/Lists/StoryList",
  component: StoryList,
  tags: ["autodocs"],
  args: { stories: [{ key: "1", href: "https://example.com", title: "A large link out to another site", byline: "example.com · 12 poeng" }, { key: "2", href: "https://example.com", title: "A second story", byline: "example.org · 3 poeng" }] },
  parameters: { docs: { description: { component: `### Use it when

longer stories with a title and a line about where they are from and when.

### Do not use it when

short list rows (\`Rows\`).

### Accessibility

**Handled by the component**

- An ordered list, each story a link with its byline after it ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships), [1.3.2 Meaningful Sequence](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence)).
- Each link says it leaves the site: the external symbol and «(eksternt nettsted)» for a screen reader ([2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context)).
- Each link is at least 24 px high ([2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum)).

**You check**

- \`title\` is the story's own title, so the link says what it opens ([2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context)).
- The order means something (an \`ol\`): a heading before the list says what it is ordered by ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)).

### Content

The line under the title says the source and the time.

### Related

\`HeadlineList\`, \`Time\`` } }, },
} satisfies Meta<typeof StoryList>
export default meta
type Story = StoryObj<typeof meta>

/** Two stories as large links, each with its byline under it. */
export const Default: Story = {}
