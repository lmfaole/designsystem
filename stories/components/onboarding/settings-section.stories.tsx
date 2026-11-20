import type { Meta, StoryObj } from "@storybook/react-vite"

import { PageColumn } from "../../../src/components/layout"
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

an app has a settings page («Innstillinger»): one section for each thing the visitor can change, under each other in the reading column, with the same fields as the first-run wizard (\`FirstRun\`).

### Do not use it when

a page has one setting of its own (put the field on the page), or for parts of a page that are not settings (use \`PageSection\`).

### Accessibility

**Handled by the component**

- A section labelled by its \`h2\`, so the settings are in the outline and a screen reader can jump between them ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
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
