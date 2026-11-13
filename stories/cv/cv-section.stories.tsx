import type { Meta, StoryObj } from "@storybook/react-vite"

import { CvEmployer, CvEntry, CvLinkList, CvList, CvNote, CvProject, CvProjects, CvRole, CvSection } from "../../src/components/cv-list"
import { ExternalLink } from "../../src/components/external-link"

const meta = {
  title: "CV/CvSection",
  component: CvSection,
  tags: ["autodocs"],
  subcomponents: { CvList, CvEntry, CvEmployer, CvRole, CvProjects, CvProject, CvNote, CvLinkList },
  args: { title: "Utdanning", children: null },
} satisfies Meta<typeof CvSection>
export default meta
type Story = StoryObj<typeof meta>

export const Education: Story = {
  args: { title: "Utdanning", children: <CvList><CvEntry period="2010–2013" title="Bachelor" meta="Universitetet" text="Noe om studiet." /></CvList> },
}
export const Experience: Story = {
  args: {
    title: "Erfaring",
    children: (
      <CvList>
        <CvEmployer name="Firma AS" place="Oslo">
          <CvRole title="Utvikler" period="2020–nå" description="Bygger ting.">
            <CvProjects label="Prosjekter">
              <CvProject title="Prosjekt" url="example.com" description="Et prosjekt."><CvNote>Siste commit i går.</CvNote></CvProject>
            </CvProjects>
          </CvRole>
        </CvEmployer>
      </CvList>
    ),
  },
}
export const Links: Story = { args: { title: "Lenker", children: <CvLinkList><li><ExternalLink href="https://example.com">GitHub</ExternalLink></li></CvLinkList> } }
