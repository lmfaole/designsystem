import type { Meta, StoryObj } from "@storybook/react-vite"

import { ListField } from "../../../src/components/list-field"

const meta = {
  title: "Components/Forms/ListField",
  component: ListField,
  tags: ["autodocs"],
  args: {
    label: "Repoer du følger",
    name: "repos",
    hint: "Ett per linje, som eier/navn. Bare offentlige repoer.",
    values: ["withastro/astro", "vercel/next.js"],
    placeholder: "eier/navn",
  },
  parameters: { docs: { description: { component: `### Use it when

a short list is typed: repositories to follow, places, tags. One per line; the server reads it with \`parseListField\` (\`lib/list-field\`), which also takes commas and drops blanks and repeats.

### Do not use it when

the values are known beforehand (use \`CheckboxList\`), or it is one value (use \`TextField\`).

### Accessibility

**Handled by the component**

- A native \`<textarea>\` with its label above it, always visible, and the hint and error tied with \`aria-describedby\` ([3.3.2 Labels or Instructions](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions))
- No spelling check or capital at the start (\`verbatim\`, on by default): names are typed exactly
- Adding and removing a line needs no script and no extra buttons

**You check**

- The hint says the format and the limit; the error names the line that is wrong.

### Content

«Ett per linje, som eier/navn»: the format in the hint, an example in \`placeholder\`.

### Related

\`TextField\`, \`CheckboxList\`, \`SettingsSection\`, \`FirstRun\`` } } },
} satisfies Meta<typeof ListField>
export default meta
type Story = StoryObj<typeof meta>

/** Two repositories. */
export const Default: Story = {}

/** Empty, with an example of the format. */
export const Empty: Story = { args: { values: [], optional: true } }

/** One line the server could not find. */
export const WithError: Story = { args: { values: ["withastro/astro", "ikke/finnes"], error: "Fant ikke ikke/finnes. Sjekk stavingen, eller om repoet er privat." } }
