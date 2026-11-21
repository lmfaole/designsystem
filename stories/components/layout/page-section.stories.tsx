import type { Meta, StoryObj } from "@storybook/react-vite"

import { CardLink } from "../../../src/components/card-link"
import { PageColumn } from "../../../src/components/layout"
import { PageHeader } from "../../../src/components/page-header"
import { PageSection } from "../../../src/components/page-section"
import { Rows } from "../../../src/components/rows"
import { Text } from "../../../src/components/text"

const meta = {
  title: "Components/Layout/PageSection",
  component: PageSection,
  tags: ["autodocs"],
  args: { id: "s", title: "Siste", children: null },
  parameters: { docs: { description: { component: `### Use it when

a titled part of a page: an icon, the title and the content, with \`more\` for «Se alle 14». With \`continues\` it is an excerpt of a subpage (the five latest plays of «Historikk»): a card, with one full-width link to the subpage at its foot («Se hele historikken»).

### Do not use it when

the page's title (\`PageHeader\`) or a group of sections (\`SectionGroup\`).

### Accessibility

**Handled by the component**

- A \`section\` named by its title (\`aria-labelledby\`), so it is a region a screen reader can jump to ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)).
- The title is an \`h2\`, or an \`h3\` with \`level={3}\`; its icon is hidden from assistive technology ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships), [1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content)).
- With \`continues\`, the link to the subpage is the last thing in the section, one real link the width of the card and at least 48 px high, with its count read as part of it; the rows keep their own links, so the card is not one big link ([2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context), [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum)).
- The «see all» link follows the title in the DOM and is at least 24 px high ([1.3.2 Meaningful Sequence](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence), [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum)).

**You check**

- \`id\` is unique on the page, or the section is named by the wrong heading ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)).
- \`level\` fits the outline: \`2\` straight under the page's \`h1\`, \`3\` under another heading; parts of a part that belong together are a \`SectionGroup\` with \`SubSection\`s ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)).
- \`title\` says what the section holds ([2.4.6 Headings and Labels](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels)).
- \`continues.label\` names where it goes («Se hele historikken», «Se månedens Wrapped»), never «Se alle» or «Mer» alone ([2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context)).
- \`more.label\` says what it opens in full («Se alle 14 pull requests») ([2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context)).

### Content

A noun that says what is in it («Krever deg», «Issues til deg»).

### Related

\`SectionGroup\`, \`Rows\`, \`SummaryBar\`, \`SubPages\` (several subpages, a settings overview)` } }, },
} satisfies Meta<typeof PageSection>
export default meta
type Story = StoryObj<typeof meta>

/** A title and its content, with no icon and no «see all» link. */
export const Default: Story = { args: { id: "latest", title: "Siste", children: <Text>Content of the section.</Text> } }

/** An icon in front of the title says at a glance what the section is about. */
export const WithIcon: Story = { args: { id: "pulls", title: "Pull requests", icon: "pull-request", children: <Text>Content of the section.</Text> } }

/** A section that shows only the first of a list links to all of it, in the title row. */
export const WithMore: Story = { args: { id: "pulls", title: "Pull requests", icon: "pull-request", more: { href: "#", label: "Se alle 14" }, children: <Text>De tre som trenger deg mest.</Text> } }

const PLAYS = [
  { key: "1", icon: "music", iconLabel: "Låt", body: <CardLink href="#kate" look="strong">Kate Bush – Running Up That Hill</CardLink>, trailing: "12:04" },
  { key: "2", icon: "music", iconLabel: "Låt", body: <CardLink href="#robyn" look="strong">Robyn – Dancing On My Own</CardLink>, trailing: "11:58" },
  { key: "3", icon: "music", iconLabel: "Låt", body: <CardLink href="#susanne" look="strong">Susanne Sundfør – Delirious</CardLink>, trailing: "11:53" },
  { key: "4", icon: "music", iconLabel: "Låt", body: <CardLink href="#aurora" look="strong">Aurora – Runaway</CardLink>, trailing: "11:49" },
  { key: "5", icon: "music", iconLabel: "Låt", body: <CardLink href="#sigrid" look="strong">Sigrid – Strangers</CardLink>, trailing: "11:45" },
] as const

/** An excerpt of a subpage (the five latest plays of «Historikk») is a card: the title, the rows with their own links, and at its foot one link to the subpage. */
export const ContinuesToSubpage: Story = {
  args: { id: "siste", title: "Siste avspillinger", icon: "history", continues: { href: "#historikk", label: "Se hele historikken" }, children: null },
  render: (args) => (
    <PageColumn>
      <PageHeader title="Musikk" lead="De siste avspillingene, fra Last.fm." />
      <PageSection {...args}>
        <Rows lead="icon" rows={PLAYS} />
      </PageSection>
    </PageColumn>
  ),
}

/** With the subpage's icon, the label stands in the rows' text column; the count says how much there is there, quietly at the end. */
export const ContinuesWithCount: Story = {
  ...ContinuesToSubpage,
  args: { id: "siste", title: "Siste avspillinger", icon: "history", children: null, continues: { href: "#historikk", label: "Se hele historikken", icon: "calendar", count: "1 248 avspillinger" } },
}

/** On a phone (400 px): the card fills the column, the long title wraps and the foot keeps its count and chevron on the line. */
export const ContinuesOnAPhone: Story = {
  ...ContinuesWithCount,
  globals: { viewport: { value: "compact", isRotated: false } },
}
