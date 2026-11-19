import type { Meta, StoryObj } from "@storybook/react-vite"

import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../../src/components/ui/table"

const meta = {
  title: "Primitives/Table",
  component: Table,
  tags: ["autodocs"],
  subcomponents: { TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption },
  parameters: { docs: { description: { component: `### Use it when

several figures are compared down a column.

### Do not use it when

a list of things the reader opens (\`Rows\`) or facts about one thing (\`FactList\`).

### Accessibility

**Handled by the component**

- Native table elements: \`table\`, \`caption\`, \`thead\`, \`tbody\`, \`tfoot\`, \`th\` and \`td\` ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- A wide table scrolls sideways in its wrapper, not the page ([1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow))

**You check**

- A \`TableCaption\` or a heading before it says what the table holds ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- Column headers are \`TableHead\`; a first column that names the row gets \`scope="row"\` ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- The wrapper is not focusable: a table wider than a phone cannot be scrolled by keyboard, so keep it narrow ([2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard))

### Content

Headers are one or two words in sentence case.

### Related

\`DataCell\`, \`NumberCell\`, \`SortHeader\`, \`SrTableHead\`` } }, },
} satisfies Meta<typeof Table>
export default meta
type Story = StoryObj<typeof meta>

/** Every part of a table: caption, header, body and a footer with a sum. */
export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>A table</TableCaption>
      <TableHeader><TableRow><TableHead>Navn</TableHead><TableHead className="text-right">Antall</TableHead></TableRow></TableHeader>
      <TableBody>
        <TableRow><TableCell>Alfa</TableCell><TableCell className="text-right">12</TableCell></TableRow>
        <TableRow><TableCell>Beta</TableCell><TableCell className="text-right">7</TableCell></TableRow>
      </TableBody>
      <TableFooter><TableRow><TableCell>Sum</TableCell><TableCell className="text-right">19</TableCell></TableRow></TableFooter>
    </Table>
  ),
}
