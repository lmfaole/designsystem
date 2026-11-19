import type { Meta, StoryObj } from "@storybook/react-vite"

import { Lines } from "../../src/components/lines"

const meta = {
  title: "Typography/Lines",
  component: Lines,
  tags: ["autodocs"],
  args: { items: [] },
  parameters: { docs: { description: { component: `### Use it when

several short facts about one thing stand on lines of their own: a year and a maker.

### Do not use it when

a sentence (\`Text\`) or facts with terms (\`FactList\`).

### Accessibility

Each fact is its own line, never joined by a separator.

### Content

Short fragments.

### Related

\`FactList\`, \`Text\`` } }, },
} satisfies Meta<typeof Lines>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { items: ["1982", "Blade Runner", null, "Ridley Scott"] } }
