import type { Meta, StoryObj } from "@storybook/react-vite"

import { DatedLinkTable } from "../../src/components/dated-link-table"

const meta = {
  title: "Lists/DatedLinkTable",
  component: DatedLinkTable,
  tags: ["autodocs"],
  args: { dayHead: "Dag", titleHead: "Tittel", rows: [{ key: "1", day: "12. nov.", href: "https://example.com", title: "A link out", source: "example.com" }, { key: "2", day: "11. nov.", href: "https://example.com", title: "Another", source: "example.org" }] },
  parameters: { docs: { description: { component: `### Use it when

a table of links with the date each came out: releases, reports.

### Do not use it when

things that have a page of their own in the app (\`Rows\`).

### Accessibility

**Handled by the component**

- A real table with a header row from \`dayHead\` and \`titleHead\`, so each cell is read with its column ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)).
- The day comes before the title in the DOM, and the source after it, the order they are read in ([1.3.2 Meaningful Sequence](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence)).
- Long titles wrap instead of widening the table ([1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow)).
- Each title link is at least 24 px high ([2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum)).

**You check**

- \`dayHead\` and \`titleHead\` name the columns ([2.4.6 Headings and Labels](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels)).
- The links are NOT marked as external (no symbol, no screen reader text): say near the table that they lead to other sites ([2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context)).
- The table has no caption: put a heading right before it that says what it lists ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)).

### Content

The date as the page words it.

### Related

\`Rows\`, \`Table\`, \`Time\`` } }, },
} satisfies Meta<typeof DatedLinkTable>
export default meta
type Story = StoryObj<typeof meta>

/** Two links out, each with its day in front and its source under the title. */
export const Default: Story = {}
