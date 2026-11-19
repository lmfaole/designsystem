import type { Meta, StoryObj } from "@storybook/react-vite"

import { HeadlineList } from "../../src/components/headline-list"

const meta = {
  title: "Lists/HeadlineList",
  component: HeadlineList,
  tags: ["autodocs"],
  args: { headlines: [{ key: "1", href: "https://example.com", title: "A headline from elsewhere", note: "example.com · i dag" }, { key: "2", href: "https://example.com", title: "Another one", note: "example.org · i går" }] },
  parameters: { docs: { description: { component: `### Use it when

a list of headlines with a source and a time: news, a feed.

### Do not use it when

things the reader operates (\`Rows\`).

### Accessibility

**Handled by the component**

- An ordered list of links ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)).
- Each link is an \`ExternalLink\`: the external symbol and «(eksternt nettsted)» for a screen reader ([2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context)).
- The note follows the title in the DOM, so it is read after it ([1.3.2 Meaningful Sequence](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence)).
- Long headlines wrap instead of scrolling sideways ([1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow)).

**You check**

- \`title\` is the headline itself, so the link says what it opens ([2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context)).
- \`note\` names the source and the time in words.
- The order means something (an \`ol\`): a heading before the list says what it is ordered by ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)).

### Content

The title is the strongest part; the source and the time follow.

### Related

\`StoryList\`, \`Time\`, \`Rows\`` } }, },
} satisfies Meta<typeof HeadlineList>
export default meta
type Story = StoryObj<typeof meta>

/** Two headlines out to other sites, each with the external mark and its muted note. */
export const Default: Story = {}
