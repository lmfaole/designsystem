import type { Meta, StoryObj } from "@storybook/react-vite"

import { SrTableHead } from "../../src/components/sr-table-head"

const meta = {
  title: "Tables/SrTableHead",
  component: SrTableHead,
  tags: ["autodocs"],
  args: { columns: ["Navn", "Antall"] },
  parameters: { docs: { description: { component: `### Use it when

a table has no header the page shows, but a screen reader needs one.

### Do not use it when

a table that has a visible header (\`TableHeader\`).

### Accessibility

Read by a screen reader with every cell, never drawn.

### Content

The header names each column.

### Related

\`Table\`, \`ChartTable\`` } }, },
} satisfies Meta<typeof SrTableHead>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { decorators: [(Story) => <table><Story /></table>] }
