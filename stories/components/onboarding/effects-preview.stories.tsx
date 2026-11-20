import type { Meta, StoryObj } from "@storybook/react-vite"

import { ChoiceCards } from "../../../src/components/choice-cards"
import { EffectsPreview } from "../../../src/components/effects-preview"

const meta = {
  title: "Components/Onboarding/EffectsPreview",
  component: EffectsPreview,
  tags: ["autodocs"],
  args: { mode: "on" },
  render: (args) => (
    <form className="max-w-xl" onSubmit={(event) => event.preventDefault()}>
      <ChoiceCards
        name="effects"
        legend="Effekter"
        value="on"
        options={[
          { value: "on", label: "Med effekter", description: "3D, lys og bevegelse i bilder og bakgrunner.", preview: <EffectsPreview {...args} mode="on" /> },
          { value: "off", label: "Uten effekter", description: "Flate bilder og rolige bakgrunner. Bruker mindre strøm.", preview: <EffectsPreview {...args} mode="off" /> },
        ]}
      />
    </form>
  ),
  parameters: { docs: { description: { component: `### Use it when

the visitor chooses whether the page draws its WebGL effects (\`data-effects\` on \`<html>\`, from the \`prefs\` cookie: \`lib/preferences\`). Each sample is the \`preview\` of a \`ChoiceCards\` option, so the picture is the choice: \`mode="on"\` live, as \`AlbumSleeve\` on a \`Stage\` draws it, \`mode="off"\` as it is drawn with effects off.

Without \`mode\` it still draws both side by side, marking the one chosen in a radio below; that is deprecated: the example must be the choice.

The live one is drawn under \`data-effects="on"\` and only once it is on screen; the other under \`data-effects="off"\`, which every WebGL component honours by drawing its still fallback and creating no context. Without \`src\` it paints a made-up cover from the theme (\`lib/sample-cover\`).

### Do not use it when

anywhere but beside the effects choice.

### Accessibility

**Handled by the component**

- A picture only, hidden from a screen reader: the card's radio and label say what it is, and \`ChoiceCards\` marks the chosen one ([1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color))
- Under \`prefers-reduced-motion\` the live one is still, and it says so on the picture

**You check**

- Both samples are in the same choice, one per card.

### Content

The captions say «Med effekter» and «Uten effekter»; nothing to set.

### Related

\`ChoiceCards\`, \`TiltPreview\`, \`AlbumSleeve\`, \`Stage\`, \`FirstRun\`, \`SettingsSection\`` } } },
} satisfies Meta<typeof EffectsPreview>
export default meta
type Story = StoryObj<typeof meta>

/** The two samples as the effects choice: the whole card is the radio. */
export const Default: Story = {}

/** Deprecated: both side by side above a separate radio (no `mode`). Use the cards above. */
export const Comparison: Story = {
  args: { mode: undefined },
  render: () => (
    <form className="grid max-w-xl gap-4" onSubmit={(event) => event.preventDefault()}>
      <EffectsPreview />
      <ChoiceCards
        name="effects"
        legend="Effekter"
        value="on"
        layout="list"
        options={[
          { value: "on", label: "På" },
          { value: "off", label: "Av" },
        ]}
      />
    </form>
  ),
}
