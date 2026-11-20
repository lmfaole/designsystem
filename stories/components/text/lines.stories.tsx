import type { Meta, StoryObj } from "@storybook/react-vite"

import { Lines } from "../../../src/components/lines"

const meta = {
  title: "Components/Text/Lines",
  component: Lines,
  tags: ["autodocs"],
  args: { items: [] },
  parameters: { docs: { description: { component: `### Use it when

several short facts about one thing stand on lines of their own: a year and a maker.

### Do not use it when

a sentence (\`Text\`) or facts with terms (\`FactList\`).

### Accessibility

**Handled by the component**

- Each fact is its own line in reading order, never joined by a separator symbol that would be read aloud ([1.3.2 Meaningful Sequence](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence))
- Empty facts are dropped, so no blank line is left to read ([1.3.2 Meaningful Sequence](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence))

**You check**

- The lines are \`span\`s, not a list: facts that need a term each belong in \`FactList\` ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- The facts make sense without their position, since each is read on its own ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))

### Content

Short fragments.

### Related

\`FactList\`, \`Text\`` } }, },
} satisfies Meta<typeof Lines>
export default meta
type Story = StoryObj<typeof meta>

/** Facts on lines of their own; the empty value in the list is left out. */
export const Default: Story = { args: { items: ["1982", "Blade Runner", null, "Ridley Scott"] } }
