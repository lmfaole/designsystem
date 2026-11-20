import type { Meta, StoryObj } from "@storybook/react-vite"

import { CheckboxList } from "../../../src/components/checkbox-list"

const meta = {
  title: "Components/Forms/CheckboxList",
  component: CheckboxList,
  tags: ["autodocs"],
  args: {
    name: "sections",
    legend: "Hva skal vises på forsiden?",
    values: ["weather", "transport", "github"],
    options: [
      { value: "weather", label: "Været", description: "Akkurat nå og de neste timene." },
      { value: "transport", label: "Avganger", description: "Fra holdeplassene nær deg." },
      { value: "github", label: "GitHub", description: "Det som har skjedd i repoene du følger." },
      { value: "calendar", label: "Kalender" },
    ],
  },
  parameters: { docs: { description: { component: `### Use it when

any number of a short list may be chosen: the sections of a front page, the kinds to follow.

### Do not use it when

only one may be chosen (use \`ChoiceCards\`), or the list is long enough to need a search.

### Accessibility

**Handled by the component**

- Native checkboxes in a \`<fieldset>\` with its \`<legend>\`, each with its label; the whole row is the target ([2.5.8 Target Size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum))
- An error is in words with a symbol, tied to the group ([3.3.1 Error Identification](https://www.w3.org/WAI/WCAG22/Understanding/error-identification))

**You check**

- The server reads an empty list as «none» only from a form that had the list: no box ticked sends nothing.

### Content

The legend asks the question; each label is the thing in a word or two, and a description only where it helps.

### Related

\`ChoiceCards\`, \`SettingsSection\`, \`FirstRun\`` } } },
} satisfies Meta<typeof CheckboxList>
export default meta
type Story = StoryObj<typeof meta>

/** Three of four ticked. */
export const Default: Story = {}

/** None ticked, and the server says one is needed. */
export const WithError: Story = { args: { values: [], error: "Velg minst én del" } }
