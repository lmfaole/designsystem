import type { Meta, StoryObj } from "@storybook/react-vite"

import { Grid, Stack } from "../../src/components/layout"
import { PageSection } from "../../src/components/page-section"
import { Rows } from "../../src/components/rows"
const Box = ({ n }: { n: number }) => <div className="rounded-md border bg-muted px-3 py-2 text-sm">Box {n}</div>
const boxes = (count: number) => Array.from({ length: count }, (_, i) => <Box key={i} n={i + 1} />)

const meta = {
  title: "Layout/Grid",
  component: Grid,
  tags: ["autodocs"],
  args: { children: null },
  parameters: { docs: { description: { component: `### Use it when

things are looked at, not read: pictures, charts, cards of equal weight.

### Do not use it when

the content is text to be read (a grid is read across and then down: \`Stack\`).

### Accessibility

**Handled by the component**

- The children are placed in DOM order, row by row, the order they are read in ([1.3.2 Meaningful Sequence](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence)).
- Number columns drop to one or two on a phone and the named ones fit as many as there is room for, so nothing scrolls sideways at 320 px ([1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow)).
- No semantics of its own: a \`div\`, or the element given as \`as\` ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)).

**You check**

- \`as="ul"\` when the children are a list of things ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)).
- The children are in the order they matter: a grid is read across, then down ([1.3.2 Meaningful Sequence](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence)).
- Text, lists and sections stand in a \`Stack\`, not in columns.

### Related

\`Stack\`, \`Tiles\`, \`Split\`` } }, },
} satisfies Meta<typeof Grid>
export default meta
type Story = StoryObj<typeof meta>

/**
 * Columns are for what is LOOKED AT: pictures, charts, cards of equal weight, a few figures. Text, lists and the sections of a
 * page stand under each other in the reading column (README, rule 7).
 */
export const Columns2: Story = { args: { columns: 2 }, render: (args) => <Grid {...args}>{boxes(6)}</Grid> }
/** Three across on a desktop, fewer on a narrower screen. */
export const Columns3: Story = { args: { columns: 3 }, render: (args) => <Grid {...args}>{boxes(6)}</Grid> }
/** Four across on a desktop and two on a phone: for small figures. */
export const Columns4: Story = { args: { columns: 4 }, render: (args) => <Grid {...args}>{boxes(8)}</Grid> }
/** As many 9rem columns as fit: for pictures. */
export const Tiles: Story = { args: { columns: "tiles" }, render: (args) => <Grid {...args}>{boxes(10)}</Grid> }
/** As many 18rem columns as fit: for cards of equal weight. */
export const Cards: Story = { args: { columns: "cards" }, render: (args) => <Grid {...args}>{boxes(6)}</Grid> }
/** Two or three charts across on a desktop, one on a phone. */
export const Charts: Story = { args: { columns: "charts" }, render: (args) => <Grid {...args}>{boxes(3)}</Grid> }

const rows = (names: string[]) => <Rows rows={names.map((name, index) => ({ key: name, body: name, trailing: `${index + 2}. nov.` }))} />

/**
 * **Ikke:** sections of text side by side. The reader has to choose a path (across, then down?), the second section looks less
 * important than the first though it is not, and each list is too narrow. Read content stands under each other: see the next story.
 */
export const DontSectionsInColumns: Story = {
  tags: ["!manifest"],
  args: { columns: 2 },
  render: (args) => (
    <Grid {...args}>
      <PageSection id="dont-pulls" title="Pull requests">{rows(["Fiks tidssone i værmeldingen", "Utkast: tidslinje"])}</PageSection>
      <PageSection id="dont-issues" title="Issues">{rows(["Feil: TextArea får scroll", "Bedre tomtilstand"])}</PageSection>
    </Grid>
  ),
}

/** **Gjør:** the same sections under each other, in the order they matter: one path, each list the width of the column. */
export const DoSectionsUnderEachOther: Story = {
  render: () => (
    <Stack gap="xl">
      <PageSection id="do-pulls" title="Pull requests">{rows(["Fiks tidssone i værmeldingen", "Utkast: tidslinje"])}</PageSection>
      <PageSection id="do-issues" title="Issues">{rows(["Feil: TextArea får scroll", "Bedre tomtilstand"])}</PageSection>
    </Stack>
  ),
}
