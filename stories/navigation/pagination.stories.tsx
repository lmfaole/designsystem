import type { Meta, StoryObj } from "@storybook/react-vite"

import { Pagination } from "../../src/components/pagination"

const meta = {
  title: "Navigation/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  args: { current: 6, total: 12, hrefFor: (page: number) => `?side=${page}` },
  parameters: { docs: { description: { component: `### Use it when

a long list has an address for each page (\`?side=3\`), so a page can be bookmarked and shared.

### Do not use it when

a short list with a clear sort and filters would do, or the list is endless (a \`VirtualTbody\` or a progressive count keeps one page).

### Accessibility

**Handled by the component**

- A \`nav\` named by \`label\` («Sidenummer»), with the pages as a list of real links ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)).
- Each number is named «Side 6»; «Forrige» and «Neste» are in words, with their icons hidden ([2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context), [1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content)).
- The current page is \`aria-current="page"\`, and also bordered and medium weight ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships), [1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color)).
- A gap «…» is hidden from screen readers ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)).
- Its own focus ring on every link ([2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible)).
- Each target is at least 36 px ([2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum)).
- It wraps instead of scrolling sideways, and nothing is drawn for one page ([1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow)).

**You check**

- \`label\` tells two paginations on one page apart ([2.4.6 Headings and Labels](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels)).
- \`hrefFor\` gives each page its own address, and the page's \`title\` says which page it is ([2.4.2 Page Titled](https://www.w3.org/WAI/WCAG22/Understanding/page-titled)).

### Content

The words are «Forrige» and «Neste»; page numbers are labelled «Side 6» for a screen reader.

### Related

\`VirtualTbody\`, \`FilterChips\`, \`SubPages\`` } } },
} satisfies Meta<typeof Pagination>
export default meta
type Story = StoryObj<typeof meta>

/** Page 6 of 12: «Forrige», «Neste» and a gap on each side of the pages around the current one. */
export const Middle: Story = {}
/** The first page: no «Forrige». */
export const First: Story = { args: { current: 1 } }
/** The last page: no «Neste». */
export const Last: Story = { args: { current: 12 } }
/** Three pages: every number shown, no gap. */
export const Few: Story = { args: { total: 3, current: 2 } }
/** One page: nothing is drawn. */
export const One: Story = { args: { total: 1 } }
