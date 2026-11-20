import type { Meta, StoryObj } from "@storybook/react-vite"

import { LinkList } from "../../../src/components/fact-list"

const meta = {
  title: "Components/Links/LinkList",
  component: LinkList,
  tags: ["autodocs"],
  args: { links: [["IMDb", "https://example.com"], ["Wikipedia", "https://example.com"], ["Missing", null]] },
  parameters: { docs: { description: { component: `### Use it when

a few links to a thing's other places, on one line.

### Do not use it when

links that continue in the app (\`SubPages\`).

### Accessibility

**Handled by the component**

- Each link is an \`ExternalLink\`: the external symbol, hidden from assistive technology, and «(eksternt nettsted)» for a screen reader ([2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context), [1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content)).
- Pairs without an address, and a line with none left, are not drawn, so no empty link is announced ([4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value)).
- The links wrap onto more lines instead of scrolling sideways ([1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow)).

**You check**

- Each label is the site's name (IMDb, Wikipedia), which says where the link goes ([2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context)).
- The links are a line of small text high, not padded: keep the spacing around them so each meets the 24 px target or its spacing ([2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum)).
- It is a paragraph, not a list: a heading or text before it says what the links are ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)).

### Content

Each link names the place («GitHub», not «Les mer»).

### Related

\`ExternalLink\`, \`LinkButton\`` } }, },
} satisfies Meta<typeof LinkList>
export default meta
type Story = StoryObj<typeof meta>

/** Two links out on one line; the pair without an address («Missing») is left out. */
export const Default: Story = {}
