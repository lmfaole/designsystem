import type { Meta, StoryObj } from "@storybook/react-vite"

import { SortHeader } from "../../../src/components/sort-header"

const meta = {
  title: "Components/Tables/SortHeader",
  component: SortHeader,
  tags: ["autodocs"],
  decorators: [(Story) => <table><thead><tr><Story /></tr></thead></table>],
  args: { label: "Oppdatert", href: "?sorter=oppdatert", direction: "descending" },
  parameters: { docs: { description: { component: `### Use it when

a table has columns the reader may sort by. The link goes to the same page sorted by this column.

### Do not use it when

the order is the point and fixed (a ranking), or the list is \`Rows\`.

### Accessibility

**Handled by the component**

- A header cell (\`th\`) with \`aria-sort\`, so a screen reader hears which column is sorted and which way ([4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value))
- The control is a real link: it works with a keyboard and without script ([2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard))
- The link shows a focus ring from the ring token ([2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible))
- The link is at least 24 px tall ([2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum))
- The direction arrow is hidden; \`aria-sort\` says it ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))

**You check**

- \`href\` goes to the same page sorted by this column, in the direction to go to next ([2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context))
- Only one column in the table has a \`direction\` other than \`none\` ([4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value))
- It sits in a real table's header row (\`thead\`) ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))

### Content

The label is the column's name. Default to the most recent first, or alphabetical by the first column.

### Related

\`Table\`, \`Pagination\`, \`FilterChips\`` } } },
} satisfies Meta<typeof SortHeader>
export default meta
type Story = StoryObj<typeof meta>

/** The sorted column, descending, with its arrow. */
export const Sorted: Story = {}
/** The arrow turned for ascending. */
export const Ascending: Story = { args: { direction: "ascending" } }
/** A column that can be sorted but is not: no arrow. */
export const Unsorted: Story = { args: { direction: "none" } }
