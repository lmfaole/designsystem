import type { Meta, StoryObj } from "@storybook/react-vite"

import { DatedEntry, EntryGroup, EntryList, EntrySection, GroupItem, LinkItems, SubItem, SubItems } from "../../src/components/entry-list"
import { ExternalLink } from "../../src/components/external-link"

const meta = {
  title: "Entries/EntrySection",
  component: EntrySection,
  tags: ["autodocs"],
  subcomponents: { EntryList, DatedEntry, EntryGroup, GroupItem, SubItems, SubItem, LinkItems },
  args: { title: "Utdanning", children: null },
} satisfies Meta<typeof EntrySection>
export default meta
type Story = StoryObj<typeof meta>

export const Dated: Story = {
  args: { title: "Utdanning", children: <EntryList><DatedEntry period="2010–2013" title="Bachelor" meta="Universitetet" text="Noe om studiet." /></EntryList> },
}
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
export const Links: Story = { args: { title: "Lenker", children: <LinkItems><li><ExternalLink href="https://example.com">GitHub</ExternalLink></li></LinkItems> } }
