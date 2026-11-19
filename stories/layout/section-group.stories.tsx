import type { Meta, StoryObj } from "@storybook/react-vite"

import { SectionGroup, SubSection } from "../../src/components/page-section"
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
  parameters: { docs: { description: { component: `**Use it when** several sections belong together under one title with an icon.

**Do not use it when** one section, or sections that are side by side (they stand under each other).

**Accessibility.** The group title is a heading and each subsection one level down.

**Content.** The title says what the sections have in common.

**Related.** \`PageSection\`, \`Stack\`` } }, },
} satisfies Meta<typeof SectionGroup>
export default meta
type Story = StoryObj<typeof meta>

/** The subsections stand under each other, in the order they matter. Never side by side. */
export const Default: Story = {}
