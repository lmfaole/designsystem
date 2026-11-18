import type { Meta, StoryObj } from "@storybook/react-vite"

import { Grid } from "../../src/components/layout"
import { PageSection, SectionGroup, SubSection } from "../../src/components/page-section"
import { Rows } from "../../src/components/rows"
import { Text } from "../../src/components/text"

const rows = (names: string[]) => <Rows rows={names.map((name) => ({ key: name, body: name, trailing: "i dag" }))} />

const meta = {
  title: "Layout/SectionGroup",
  component: SectionGroup,
  tags: ["autodocs"],
  subcomponents: { SubSection },
  args: {
    id: "pulls",
    title: "Pull requests",
    icon: "pull-request",
    children: [
      <SubSection key="a" id="blocked" title="Blokkert" icon="warning">{rows(["Fiks tidssone", "Ny knapp"])}</SubSection>,
      <SubSection key="b" id="ready" title="Klar til merge" icon="merge">{rows(["Tiles-komponent"])}</SubSection>,
      <SubSection key="c" id="waiting" title="Venter på andre" icon="waiting"><Text size="sm" tone="muted">Ingen.</Text></SubSection>,
    ],
  },
} satisfies Meta<typeof SectionGroup>
export default meta
type Story = StoryObj<typeof meta>

/** One cell of the grid, the subsections under each other, beside another section. */
export const Cell: Story = {
  render: (args) => (
    <Grid columns="sections" gap="xl">
      <SectionGroup {...args} />
      <PageSection id="weather" title="Vær">{rows(["09:00 Skyet", "12:00 Klarvær"])}</PageSection>
    </Grid>
  ),
}

/** The whole row, the subsections side by side as far as there is room. */
export const Row: Story = {
  args: { width: "row" },
  render: (args) => (
    <Grid columns="sections" gap="xl">
      <SectionGroup {...args} />
      <PageSection id="weather" title="Vær">{rows(["09:00 Skyet", "12:00 Klarvær"])}</PageSection>
    </Grid>
  ),
}
