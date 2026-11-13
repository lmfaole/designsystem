import type { Meta, StoryObj } from "@storybook/react-vite"

import { BackdropCard } from "../src/components/backdrop-card"
import { CommandButton } from "../src/components/command-button"
import { CountUp } from "../src/components/count-up"
import { CoverLightbox } from "../src/components/cover-lightbox"
import { Cover } from "../src/components/cover"
import { CvEmployer, CvEntry, CvLinkList, CvList, CvNote, CvProject, CvProjects, CvRole, CvSection } from "../src/components/cv-list"
import { DataCell } from "../src/components/data-cell"
import { EntityPage } from "../src/components/entity-page"
import { ErrorMessage } from "../src/components/error-message"
import { ErrorPage } from "../src/components/error-page"
import { ExternalLink } from "../src/components/external-link"
import { Stack } from "../src/components/layout"
import { LiveDot } from "../src/components/live-dot"
import { NotFoundPage } from "../src/components/not-found-page"
import { NumberCell, NumberHead } from "../src/components/number-cell"
import { Overlay } from "../src/components/overlay"
import { PageHeader } from "../src/components/page-header"
import { PageLayout } from "../src/components/page-layout"
import { PageLinks } from "../src/components/page-links"
import { PageSection } from "../src/components/page-section"
import { PeriodPicker } from "../src/components/period-picker"
import { Reveal, Stagger } from "../src/components/reveal"
import { SegmentedToggle } from "../src/components/segmented-toggle"
import { ServerErrorPage } from "../src/components/server-error-page"
import { Text } from "../src/components/text"
import { CreatorLogo } from "../src/components/creator-marks"
import { Button } from "../src/components/ui/button"
import { Table, TableBody, TableHeader, TableRow } from "../src/components/ui/table"
import { Gamepad2, LayoutGrid, Settings } from "../src/lib/icons"
import { useState } from "react"
import { poster } from "./sample"

const meta = { title: "Pages/Page parts", parameters: { layout: "fullscreen" } } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Layout: Story = {
  name: "PageLayout, PageHeader, PageSection",
  render: () => (
    <PageLayout>
      <PageHeader title="Musikk" lead="Det jeg har hørt på den siste tiden." actions={<Button variant="outline" size="sm">Innstillinger</Button>} />
      <Stack gap="xl">
        <PageSection id="latest" title="Siste"><Text>Content of the section.</Text></PageSection>
        <PageSection id="top" title="Mest spilt"><Text tone="muted">Another section.</Text></PageSection>
      </Stack>
    </PageLayout>
  ),
}

export const Links: Story = {
  name: "PageLinks",
  render: () => (
    <div className="p-4">
      <PageLinks label="Mer fra musikk" links={[{ to: "/", label: "Forside", icon: LayoutGrid, description: "Left out" }, { to: "/artister", label: "Artister", icon: Gamepad2, description: "Alle artister" }, { to: "/innstillinger", label: "Innstillinger", icon: Settings, description: "Oppsett" }]} />
    </div>
  ),
}

export const Pickers: Story = {
  name: "PeriodPicker and SegmentedToggle",
  render: function Render() {
    const [value, setValue] = useState<"month" | "year">("month")
    return (
      <div className="flex flex-wrap items-center gap-6 p-4">
        <PeriodPicker periods={["2026-11", "2026-10", "2026-09"]} selected="2026-11" hrefTo={(p) => `#${p}`} formatLabel={(p) => p} />
        <SegmentedToggle value={value} onChange={setValue} options={[{ value: "month", label: "Per måned" }, { value: "year", label: "Per år" }]} />
      </div>
    )
  },
}

export const Overlays: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4 p-4">
      <Button asChild variant="outline"><CommandButton command="show-modal" commandFor="dialog-demo" look="zoom" label="Open dialog">Open dialog</CommandButton></Button>
      <Button asChild variant="outline"><CommandButton command="show-modal" commandFor="sheet-demo" look="zoom" label="Open sheet">Open sheet</CommandButton></Button>
      <Overlay id="dialog-demo" variant="dialog" title="A dialog"><Text>Esc, the cross or a tap outside closes it.</Text></Overlay>
      <Overlay id="sheet-demo" variant="sheet" title="A sheet"><Text>Comes up from the bottom of the screen.</Text></Overlay>
      <CoverLightbox url={poster(200, "Z")} name="Poster"><Cover url={poster(200, "Z")} /></CoverLightbox>
    </div>
  ),
}

export const Errors: Story = {
  name: "Errors",
  render: () => (
    <div className="grid gap-8 p-4">
      <ErrorMessage error={new Error("timeout")} />
      <EntityPage data={null}>{() => null}</EntityPage>
      <NotFoundPage />
      <ServerErrorPage />
      <ErrorPage status={403} title="Ingen tilgang" description="Du har ikke lov til å se denne siden." actions={<Button asChild><a href="#">Tilbake</a></Button>} />
    </div>
  ),
}

export const Motion: Story = {
  name: "Reveal, Stagger, CountUp, LiveDot",
  render: () => (
    <div className="grid gap-6 p-4">
      <Reveal><Text>This block rises into place (movement only, no fade).</Text></Reveal>
      <Stagger as="ul">{[1, 2, 3, 4].map((n) => <li key={n}>Item {n}</li>)}</Stagger>
      <Text size="lg" weight="semibold"><CountUp value={12345} format={(v) => v.toLocaleString("nb-NO")} /> avspillinger</Text>
      <Text><LiveDot /> Live</Text>
    </div>
  ),
}

export const Misc: Story = {
  name: "BackdropCard, ExternalLink, CreatorLogo",
  render: () => (
    <div className="grid max-w-md gap-4 p-4">
      <BackdropCard title="A franchise" picture={poster(220, "F")}><Text size="sm">Over a picture.</Text></BackdropCard>
      <div className="flex gap-4"><ExternalLink href="https://example.com">text link</ExternalLink><ExternalLink href="https://example.com" look="pill">pill link</ExternalLink></div>
      <CreatorLogo name="Studio" logo={poster(30, "S")} />
    </div>
  ),
}

export const Cells: Story = {
  name: "DataCell, NumberCell",
  render: () => (
    <div className="p-4">
      <Table>
        <TableHeader><TableRow><DataCell weight="medium">Navn</DataCell><NumberHead>Antall</NumberHead></TableRow></TableHeader>
        <TableBody>
          <TableRow><DataCell weight="medium">Alfa</DataCell><NumberCell>1 234</NumberCell></TableRow>
          <TableRow><DataCell tone="muted" wrap>Beta, with a long text that may wrap onto several lines in a narrow table</DataCell><NumberCell>56</NumberCell></TableRow>
        </TableBody>
      </Table>
    </div>
  ),
}

export const Cv: Story = {
  name: "CV",
  render: () => (
    <div className="grid gap-8 p-4">
      <CvSection title="Utdanning">
        <CvList><CvEntry period="2010–2013" title="Bachelor" meta="Universitetet" text="Noe om studiet." /></CvList>
      </CvSection>
      <CvSection title="Erfaring">
        <CvList>
          <CvEmployer name="Firma AS" place="Oslo">
            <CvRole title="Utvikler" period="2020–nå" description="Bygger ting.">
              <CvProjects label="Prosjekter">
                <CvProject title="Prosjekt" url="example.com" description="Et prosjekt."><CvNote>Siste commit i går.</CvNote></CvProject>
              </CvProjects>
            </CvRole>
          </CvEmployer>
        </CvList>
      </CvSection>
      <CvLinkList><li><ExternalLink href="https://example.com">GitHub</ExternalLink></li></CvLinkList>
    </div>
  ),
}
