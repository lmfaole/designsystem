import type { Meta, StoryObj } from "@storybook/react-vite"

import { SectionGroup, SubSection } from "../../../src/components/page-section"
import { Rows } from "../../../src/components/rows"
import { Text } from "../../../src/components/text"

const rows = (names: string[]) => <Rows rows={names.map((name) => ({ key: name, body: name, trailing: "i dag" }))} />

const meta = {
  title: "Components/Layout/SectionGroup",
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
  parameters: { docs: { description: { component: `### Use it when

several sections belong together under one title with an icon.

### Do not use it when

one section, or sections that are side by side (they stand under each other).

### Accessibility

**Handled by the component**

- The group is a \`section\` named by its \`h2\`; each \`SubSection\` a \`section\` named by its \`h3\` ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)).
- The subsections stand under each other in DOM order ([1.3.2 Meaningful Sequence](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence)).
- Title icons are hidden from assistive technology ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content)).

**You check**

- Every \`id\` is unique on the page ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)).
- The titles of the subsections tell them apart ([2.4.6 Headings and Labels](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels)).
- Each \`more.label\` says what it opens in full ([2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context)).

### Content

The title says what the sections have in common.

### Related

\`PageSection\`, \`Stack\`` } }, },
} satisfies Meta<typeof SectionGroup>
export default meta
type Story = StoryObj<typeof meta>

/** The subsections stand under each other, in the order they matter. Never side by side. */
export const Default: Story = {}
