import type { Meta, StoryObj } from "@storybook/react-vite"

import { ChoiceCards } from "../../../src/components/choice-cards"
import { ThemeSample } from "../../../src/components/theme-sample"

const meta = {
  title: "Components/Forms/ChoiceCards",
  component: ChoiceCards,
  tags: ["autodocs"],
  args: {
    name: "theme",
    legend: "Tema",
    value: "system",
    options: [
      { value: "system", label: "Som enheten", description: "Lys om dagen og mørk om kvelden, om enheten gjør det.", icon: "device" },
      { value: "light", label: "Lys", icon: "sun" },
      { value: "dark", label: "Mørk", icon: "moon" },
    ],
  },
  parameters: { docs: { description: { component: `### Use it when

a setting has two to five values, each worth a word or a small picture: the theme, the effects, where to start. The whole card is the label, so the target is large.

### Do not use it when

there are many values (use \`NativeSelect\`), or more than one may be chosen (use \`CheckboxList\`), or the choice acts at once without a form (use \`SegmentedToggle\`).

### Accessibility

**Handled by the component**

- Native radio buttons in a \`<fieldset>\` with its \`<legend>\`: the group and its name are read, and the arrow keys move between the choices ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- The chosen card is marked by its border and the radio itself, never by colour alone ([1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color))
- A \`preview\` is hidden from a screen reader: the label says what the choice is
- An error is in words with a symbol, tied to the group with \`aria-describedby\` ([3.3.1 Error Identification](https://www.w3.org/WAI/WCAG22/Understanding/error-identification))

**You check**

- One is chosen from the start (\`value\`), unless no choice is a real answer.
- A \`preview\` has nothing in it to press.

### Content

The label is the value in a word or two («Lys», «Mørk»); the description says what it does, in one sentence.

### Related

\`CheckboxList\`, \`NativeSelect\`, \`ThemeSample\`, \`SettingsSection\`, \`FirstRun\`` } } },
} satisfies Meta<typeof ChoiceCards>
export default meta
type Story = StoryObj<typeof meta>

/** The theme, by name and symbol. */
export const Default: Story = {}

/** With a picture of each: the theme drawn by its own tokens. */
export const WithPreview: Story = {
  args: {
    options: [
      { value: "system", label: "Som enheten", description: "Følger innstillingen på enheten din.", preview: <ThemeSample theme="system" /> },
      { value: "light", label: "Lys", description: "Mørk tekst på lys bakgrunn.", preview: <ThemeSample theme="light" /> },
      { value: "dark", label: "Mørk", description: "Lys tekst på mørk bakgrunn.", preview: <ThemeSample theme="dark" /> },
    ],
  },
}

/** What the server said was wrong. */
export const WithError: Story = {
  args: {
    name: "start",
    legend: "Hva vil du se først?",
    value: undefined,
    hint: "Du kan endre det senere i innstillingene.",
    error: "Velg hva du vil se først",
    options: [
      { value: "weather", label: "Været", icon: "weather" },
      { value: "transport", label: "Avganger", icon: "bus" },
    ],
  },
}
