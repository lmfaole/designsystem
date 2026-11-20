import type { Meta, StoryObj } from "@storybook/react-vite"

import { SrTableHead } from "../../../src/components/sr-table-head"

const meta = {
  title: "Components/Tables/SrTableHead",
  component: SrTableHead,
  tags: ["autodocs"],
  args: { columns: ["Navn", "Antall"] },
  parameters: { docs: { description: { component: `### Use it when

a table has no header the page shows, but a screen reader needs one.

### Do not use it when

a table that has a visible header (\`TableHeader\`).

### Accessibility

**Handled by the component**

- A real \`thead\` of \`th scope="col"\` cells, visually hidden, so each cell is read with its column's name ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))

**You check**

- \`columns\` match the table's columns, in the same order and number ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- Used only where the page shows no header; a visible one is better ([2.4.6 Headings and Labels](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels))

### Content

The header names each column.

### Related

\`Table\`, \`ChartTable\`` } }, },
} satisfies Meta<typeof SrTableHead>
export default meta
type Story = StoryObj<typeof meta>

/** Nothing shows: the header is there only for a screen reader. */
export const Default: Story = { decorators: [(Story) => <table><Story /></table>] }
