import type { Meta, StoryObj } from "@storybook/react-vite"

import { ChoiceCards } from "../../../src/components/choice-cards"
import { TiltPreview } from "../../../src/components/tilt-preview"

const meta = {
  title: "Components/Onboarding/TiltPreview",
  component: TiltPreview,
  tags: ["autodocs"],
  args: { mode: "follow" },
  render: (args) => (
    <form className="max-w-xl" onSubmit={(event) => event.preventDefault()}>
      <ChoiceCards
        name="tilt"
        legend="Lyset i bildene"
        value="off"
        options={[
          { value: "on", label: "Følg telefonen", description: "Vipp telefonen, så flytter lyset seg i bildene.", preview: <TiltPreview {...args} mode="follow" /> },
          { value: "off", label: "Fast lys", description: "Lyset står stille.", preview: <TiltPreview {...args} mode="still" /> },
        ]}
      />
    </form>
  ),
  parameters: { docs: { description: { component: `### Use it when

the visitor chooses whether the light in the pictures follows how the phone is held (\`data-tilt\` on \`<html>\`, from the \`prefs\` cookie: \`lib/preferences\`). Each sample is the \`preview\` of a \`ChoiceCards\` option, so the picture is the choice: \`mode="follow"\` for «Følg telefonen», a surface lit from where the light is with a cover in it, and \`mode="still"\` for «Fast lys», the light where it stands.

On a phone that asks (iOS), choosing «Følg telefonen» (a tap or a key, so the phone may ask) asks, and a no sets the radio named \`name\` back to \`off\`. On a phone that does not ask, the light follows at once. On a desktop the pointer over the surface moves the light instead, labelled «Simulering med peker».

Without \`mode\` it still draws one surface with a «Tillat bevegelse» button above a separate radio; that is deprecated.

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

/** The two cards. On a desktop, move the pointer over «Følg telefonen». */
export const Default: Story = {}

/** Deprecated: one surface and a button, above a separate radio (no `mode`). Use the cards above. */
export const WithButton: Story = {
  args: { mode: undefined },
  render: () => (
    <form className="grid max-w-xl gap-4" onSubmit={(event) => event.preventDefault()}>
      <TiltPreview />
      <ChoiceCards
        name="tilt"
        legend="Lyset følger telefonen"
        value="off"
        layout="list"
        options={[
          { value: "on", label: "På" },
          { value: "off", label: "Av" },
        ]}
      />
    </form>
  ),
}
