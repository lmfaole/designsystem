import type { Meta, StoryObj } from "@storybook/react-vite"

import { NumberCell, NumberHead } from "../../../src/components/number-cell"
import { Table, TableBody, TableHeader, TableRow } from "../../../src/components/ui/table"

const meta = {
  title: "Components/Tables/NumberCell",
  component: NumberCell,
  tags: ["autodocs"],
  subcomponents: { NumberHead },
  args: { children: "1 234" },
  decorators: [(Story) => <Table><TableHeader><TableRow><NumberHead>Antall</NumberHead></TableRow></TableHeader><TableBody><TableRow><Story /></TableRow></TableBody></Table>],
  parameters: { docs: { description: { component: `### Use it when

a column of figures that line up: digits of one width, to the right.

### Do not use it when

text (\`DataCell\`).

### Accessibility

**Handled by the component**

- \`NumberCell\` is a real \`td\` and \`NumberHead\` a real \`th\` ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- Head and figures are right-aligned together, so the header stands over its numbers ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))

**You check**

- The column uses \`NumberHead\`, and it names the unit ([2.4.6 Headings and Labels](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels))
- Figures are formatted in nb-NO, with a real minus sign (−)

### Content

Figures formatted in nb-NO; a minus is −.

### Related

\`Table\`, \`DataCell\`` } }, },
} satisfies Meta<typeof NumberCell>
export default meta
type Story = StoryObj<typeof meta>

/** A figure under its right-aligned head. */
export const Default: Story = {}
