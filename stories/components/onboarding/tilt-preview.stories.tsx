import type { Meta, StoryObj } from "@storybook/react-vite"

import { ChoiceCards } from "../../../src/components/choice-cards"
import { TiltPreview } from "../../../src/components/tilt-preview"

const meta = {
  title: "Components/Onboarding/TiltPreview",
  component: TiltPreview,
  tags: ["autodocs"],
  args: { name: "tilt" },
  render: (args) => (
    <form className="grid max-w-xl gap-4" onSubmit={(event) => event.preventDefault()}>
      <TiltPreview {...args} />
      <ChoiceCards
        name={args.name ?? "tilt"}
        legend="Lyset følger telefonen"
        value="off"
        options={[
          { value: "on", label: "På", description: "Vipp telefonen, så flytter lyset seg i bildene." },
          { value: "off", label: "Av", description: "Lyset står stille." },
        ]}
      />
    </form>
  ),
  parameters: { docs: { description: { component: `### Use it when

the visitor chooses whether the light in the pictures follows how the phone is held (\`data-tilt\` on \`<html>\`, from the \`prefs\` cookie: \`lib/preferences\`). A surface lit from where the light is, with a cover in it, shows what it does.

On a phone that asks (iOS), «Tillat bevegelse» asks and sets the radio named \`name\` in its form to what was answered; choosing «På» also asks. On a phone that does not ask, the light follows at once. On a desktop it says it needs a phone, and the pointer over the surface moves the light instead, labelled «Simulering med peker».

### Do not use it when

anywhere but beside the tilt choice. For a button that only turns it on, use \`TiltButton\`.

### Accessibility

**Handled by the component**

- What the phone can do and what was answered is said in a status region, in words ([4.1.3 Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages))
- Asking happens only on a press; nothing moves under \`prefers-reduced-motion\` ([2.3.3 Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions))
- The surface is a picture: the simulation is an extra for a pointer, never needed

### Content

Nothing to set: the words follow what the device can do.

### Related

\`TiltButton\`, \`EffectsPreview\`, \`ChoiceCards\`, \`FirstRun\`, \`SettingsSection\`` } } },
} satisfies Meta<typeof TiltPreview>
export default meta
type Story = StoryObj<typeof meta>

/** On a desktop, move the pointer over the surface. */
export const Default: Story = {}
