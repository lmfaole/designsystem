import type { Meta, StoryObj } from "@storybook/react-vite"

import { ThemeSample } from "../../../src/components/theme-sample"

const meta = {
  title: "Components/Onboarding/ThemeSample",
  component: ThemeSample,
  tags: ["autodocs"],
  args: { theme: "system" },
  parameters: { docs: { description: { component: `### Use it when

a theme choice shows what it gives: the \`preview\` of a \`ChoiceCards\` option (\`size="lg"\` for a visual card) for «Som enheten», «Lys» or «Mørk». It is a small page drawn by that theme's own tokens, so it is right whatever the page's own theme is.

### Do not use it when

the real page can show it (switch the theme), or anywhere else than beside a theme choice.

### Accessibility

**Handled by the component**

- A picture only: hidden from a screen reader, since the choice's label says the same

### Content

None: it is drawn by the tokens.

### Related

\`ChoiceCards\`, \`FirstRun\`, \`SettingsSection\`` } } },
} satisfies Meta<typeof ThemeSample>
export default meta
type Story = StoryObj<typeof meta>

/** Half light, half dark: what the device chooses. */
export const System: Story = {}

/** Light. */
export const Light: Story = { args: { theme: "light" } }

/** Dark, on a light page. */
export const Dark: Story = { args: { theme: "dark" } }

/** Large, to fill a card of `ChoiceCards layout="visual"`. */
export const Large: Story = { args: { size: "lg" }, decorators: [(Story) => <div className="w-56"><Story /></div>] }

/** All three side by side. */
export const All: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <ThemeSample theme="system" />
      <ThemeSample theme="light" />
      <ThemeSample theme="dark" />
    </div>
  ),
}
