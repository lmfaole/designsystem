import type { Meta, StoryObj } from "@storybook/react-vite"

import { DatedEntry, EntryGroup, EntryList, EntrySection, GroupItem, LinkItems, SubItem, SubItems } from "../../../src/components/entry-list"
import { ExternalLink } from "../../../src/components/external-link"

const meta = {
  title: "Components/Lists/EntrySection",
  component: EntrySection,
  tags: ["autodocs"],
  subcomponents: { EntryList, DatedEntry, EntryGroup, GroupItem, SubItems, SubItem, LinkItems },
  args: { title: "Utdanning", children: null },
  parameters: { docs: { description: { component: `### Use it when

a long page of dated entries: a CV, a changelog, a history, with groups and items.

### Do not use it when

a list the reader opens (\`Rows\`) or facts about one thing (\`FactList\`).

### Accessibility

**Handled by the component**

- A \`<section>\` named by its \`<h2>\` title ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- Entries are list items, and titles step down from \`<h3>\` to \`<h5>\` for groups, items and sub-items ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- \`SubItems\` is a list named by its \`label\` ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- The period comes before the title in the source, as it is shown ([1.3.2 Meaningful Sequence](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence))

**You check**

- The page has an \`<h1>\` above the sections, so the \`<h2>\`s fit ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- Entries are in date order in the source ([1.3.2 Meaningful Sequence](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence))
- Each \`title\` is unique on the page: the section's id is built from it ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- The items of \`LinkItems\` are \`<li>\` and their words say where they go ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships), [2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context))

### Content

Dates and periods the way the page words them («2010–2013»).

### Related

\`EntryList\`, \`Time\`, \`PageSection\`` } }, },
} satisfies Meta<typeof EntrySection>
export default meta
type Story = StoryObj<typeof meta>

/** A section of dated entries, the period beside each title. */
export const Dated: Story = {
  args: { title: "Utdanning", children: <EntryList><DatedEntry period="2010–2013" title="Bachelor" meta="Universitetet" text="Noe om studiet." /></EntryList> },
}
/** A group with an item and its sub-items: the deepest heading levels. */
export const Grouped: Story = {
  args: {
    title: "Erfaring",
    children: (
      <EntryList>
        <EntryGroup name="Firma AS" place="Oslo">
          <GroupItem title="Utvikler" period="2020–nå" description="Bygger ting.">
            <SubItems label="Prosjekter">
              <SubItem title="Prosjekt" url="example.com" description="Et prosjekt." />
            </SubItems>
          </GroupItem>
        </EntryGroup>
      </EntryList>
    ),
  },
}
/** A row of links in place of entries. */
export const Links: Story = { args: { title: "Lenker", children: <LinkItems><li><ExternalLink href="https://example.com">GitHub</ExternalLink></li></LinkItems> } }
