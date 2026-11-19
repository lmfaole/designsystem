import type { Meta, StoryObj } from "@storybook/react-vite"

import { DataCell } from "../../src/components/data-cell"
import { Table, TableBody, TableRow } from "../../src/components/ui/table"

const meta = {
  title: "Tables/DataCell",
  component: DataCell,
  tags: ["autodocs"],
  args: { children: "Alfa" },
  decorators: [(Story) => <Table><TableBody><TableRow><Story /></TableRow></TableBody></Table>],
  parameters: { docs: { description: { component: `### Use it when

a cell of text in a \`Table\`: plain or muted, medium or normal, with prose that may wrap.

### Do not use it when

a column of figures (\`NumberCell\`).

### Accessibility

**Handled by the component**

- A real table cell (\`td\`) in the table's structure ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- \`tone="muted"\` uses the muted text token ([1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum))

**You check**

- The column has a header (\`TableHead\`, or \`SrTableHead\` when none is shown) ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- \`muted\` or \`medium\` is not the only way a cell's meaning is told ([1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color))
- Long prose uses \`wrap\`, so a phone does not scroll the table sideways for one cell ([1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow))

### Content

An empty cell stays empty.

### Related

\`Table\`, \`NumberCell\`` } }, },
} satisfies Meta<typeof DataCell>
export default meta
type Story = StoryObj<typeof meta>

/** A plain text cell. */
export const Default: Story = {}
/** The muted tone, for secondary text. */
export const Muted: Story = { args: { tone: "muted" } }
/** Medium weight, for the cell that names the row. */
export const Medium: Story = { args: { weight: "medium" } }
/** Figures of one width in a text cell. */
export const Numeric: Story = { args: { numeric: true, children: "1 234" } }
