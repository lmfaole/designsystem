import type { Meta, StoryObj } from "@storybook/react-vite"

import { Banner } from "../../../src/components/banner"
import { Breadcrumbs } from "../../../src/components/breadcrumbs"
import { PageColumn } from "../../../src/components/layout"
import { PageHeader } from "../../../src/components/page-header"
import { ReorderList } from "../../../src/components/reorder-list"
import { SettingsSection } from "../../../src/components/settings-section"
import { Heading } from "../../../src/components/text"
import { Button } from "../../../src/components/ui/button"
import { fields } from "./first-run-steps"

const meta = {
  title: "Components/Onboarding/SettingsSection",
  component: SettingsSection,
  tags: ["autodocs"],
  args: { title: "Tema", body: "Hvordan sidene ser ut i denne nettleseren.", id: "tema", children: fields.theme() },
  argTypes: { children: { control: false } },
  parameters: { docs: { description: { component: `### Use it when

an app has a settings page («Innstillinger»). With more than a few kinds of setting, the page is an overview (\`SubPages\` with each one's \`value\`, see SubPages, «Settings overview») and each kind a subpage with breadcrumbs, its own small form with \`back\` set to the subpage, «Lagre», and a \`Banner tone="success"\` after the save. Otherwise one section for each thing the visitor can change, under each other in the reading column, with the same fields as the first-run wizard (\`FirstRun\`).

### Do not use it when

a page has one setting of its own (put the field on the page), or for parts of a page that are not settings (use \`PageSection\`).

### Accessibility

**Handled by the component**

- A section labelled by its \`h2\`, so the settings are in the outline and a screen reader can jump between them ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- After a save the server sends the reader back with \`?lagret=1\`, and the page shows \`Banner tone="success"\` («Lagret», \`role="status"\`) under the title, so it is seen and said ([4.1.3 Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages)).
- \`id\` is a place to link to: «Bytt» on a \`UserChip\` can go to \`/innstillinger#github\`

**You check**

- The page is one form, or one per section, with a real submit button; it works without JavaScript.
- «Vis introen igjen» is a button of its own that tells the server to show the wizard again.

### Content

The title is the thing («Tema», «Effekter»), the body what it changes in one sentence.

### Related

\`FirstRun\`, \`ChoiceCards\`, \`CheckboxList\`, \`ListField\`, \`TextField\`, \`PageSection\`` } } },
} satisfies Meta<typeof SettingsSection>
export default meta
type Story = StoryObj<typeof meta>

/** One section: the theme. */
export const Default: Story = {}

/** The whole settings page: the same fields as the wizard, one section each, in one form, and the introduction again. */
export const SettingsPage: Story = {
  render: () => (
    <PageColumn>
      <Heading level={1}>Innstillinger</Heading>
      <form method="post" action="/start/api/innstillinger" className="grid gap-8">
        <input type="hidden" name="back" value="/start/innstillinger" />
        <SettingsSection id="github" title="GitHub" body="Hvem vi henter data for, og hva du følger.">
          {fields.github()}
          {fields.repos()}
        </SettingsSection>
        <SettingsSection id="forside" title="Forsiden" body="Hvilke deler som står på forsiden.">
          {fields.sections()}
        </SettingsSection>
        <SettingsSection id="tema" title="Tema" body="Hvordan sidene ser ut i denne nettleseren.">
          {fields.theme()}
        </SettingsSection>
        <SettingsSection id="effekter" title="Effekter" body="3D, lys og bevegelse i bilder og bakgrunner.">
          {fields.effects()}
        </SettingsSection>
        <SettingsSection id="lys" title="Lyset" body="Om lyset i bildene følger hvordan du holder telefonen.">
          {fields.tilt()}
        </SettingsSection>
        <SettingsSection id="introen" title="Introen" body="Gå gjennom de første valgene på nytt, ett om gangen.">
          <div>
            <Button type="submit" name="rerun" value="1" variant="outline" formNoValidate>
              Vis introen igjen
            </Button>
          </div>
        </SettingsSection>
        <div>
          <Button type="submit" size="lg">
            Lagre
          </Button>
        </div>
      </form>
    </PageColumn>
  ),
}

/**
 * A settings subpage: the breadcrumbs back to «Innstillinger», a `Banner tone="success"` after the save (`?lagret=1`, `role="status"`), and one section in its own form that posts
 * to the settings endpoint with `back` set to this subpage. The order is a `ReorderList`, the sections shown a `CheckboxList`.
 */
export const SettingsSubpage: Story = {
  render: () => (
    <PageColumn>
      <Breadcrumbs
        items={[
          { label: "Innstillinger", href: "#innstillinger" },
          { label: "Forsiden", href: "#forside" },
        ]}
      />
      <PageHeader title="Forsiden" />
      <Banner tone="success" title="Lagret" />
      <form method="post" action="/start/api/innstillinger" className="grid gap-8">
        <input type="hidden" name="back" value="/start/innstillinger/forside" />
        <SettingsSection id="forside" title="Hva og i hvilken rekkefølge" body="Hvilke deler som står på forsiden, og hvilken som kommer først.">
          {fields.sections()}
          <ReorderList
            name="order"
            legend="Rekkefølgen"
            hint="Dra i håndtaket, eller bruk pilene."
            items={[
              { id: "weather", label: "Været", icon: "weather" },
              { id: "transport", label: "Avganger", icon: "bus" },
              { id: "github", label: "GitHub", icon: "pull-request" },
            ]}
          />
        </SettingsSection>
        <div>
          <Button type="submit" size="lg">
            Lagre
          </Button>
        </div>
      </form>
    </PageColumn>
  ),
}
