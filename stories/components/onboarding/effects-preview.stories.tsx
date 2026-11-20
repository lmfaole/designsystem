import type { Meta, StoryObj } from "@storybook/react-vite"

import { ChoiceCards } from "../../../src/components/choice-cards"
import { EffectsPreview } from "../../../src/components/effects-preview"

const meta = {
  title: "Components/Onboarding/EffectsPreview",
  component: EffectsPreview,
  tags: ["autodocs"],
  args: { name: "effects", value: "on" },
  render: (args) => (
    <form className="grid max-w-xl gap-4" onSubmit={(event) => event.preventDefault()}>
      <EffectsPreview {...args} />
      <ChoiceCards
        name={args.name ?? "effects"}
        legend="Effekter"
        value={args.value ?? "on"}
        options={[
          { value: "on", label: "På", description: "3D, lys og bevegelse i bilder og bakgrunner." },
          { value: "off", label: "Av", description: "Flate bilder og rolige bakgrunner. Bruker mindre strøm." },
        ]}
      />
    </form>
  ),
  parameters: { docs: { description: { component: `### Use it when

the visitor chooses whether the page draws its WebGL effects (\`data-effects\` on \`<html>\`, from the \`prefs\` cookie: \`lib/preferences\`). It shows the same cover twice: live, as \`AlbumSleeve\` on a \`Stage\` draws it, and as it is drawn with effects off. It reads the choice from the radio named \`name\` in its form and marks the one chosen, as it changes.

The live one is drawn under \`data-effects="on"\` and only once it is on screen; the other under \`data-effects="off"\`, which every WebGL component honours by drawing its still fallback and creating no context. Without \`src\` it paints a made-up cover from the theme (\`lib/sample-cover\`).

### Do not use it when

anywhere but beside the effects choice.

### Accessibility

**Handled by the component**

- Two labelled figures; the one chosen is marked in words («valgt») and by its frame, not by colour alone ([1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color))
- Under \`prefers-reduced-motion\` the live one is still, and it says so

**You check**

- It stands right above the radio it follows, in the same form.

### Content

The captions say «Med effekter» and «Uten effekter»; nothing to set.

### Related

\`ChoiceCards\`, \`TiltPreview\`, \`AlbumSleeve\`, \`Stage\`, \`FirstRun\`, \`SettingsSection\`` } } },
} satisfies Meta<typeof EffectsPreview>
export default meta
type Story = StoryObj<typeof meta>

/** Effects on chosen. Choose «Av» below, and the mark moves. */
export const Default: Story = {}

/** Effects off chosen. */
export const Off: Story = { args: { value: "off" } }
