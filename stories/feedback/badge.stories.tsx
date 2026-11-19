import type { Meta, StoryObj } from "@storybook/react-vite"

import { Badge } from "../../src/components/badge"

const meta = {
  title: "Feedback/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: { children: "Utkast" },
  parameters: { docs: { description: { component: `\`### Use it when

one short word about a thing sits next to its name in a row: a status or a kind.

### Do not use it when

it is a line of statuses under a title (\`StatusLine\`), a count (\`SummaryBar\`) or an action. A badge is never a link or a button.

### Accessibility

The words carry the meaning, the icon repeats it, and colour is never alone. Never truncated. \`destructive\` is only for what stops something.

### Content

Sentence case, one word or two: «Utkast», «Feilet», «Ny». Use the same word for the same state everywhere.

### Related

\`StatusLine\`, \`SummaryBar\`` } } },
} satisfies Meta<typeof Badge>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithIcon: Story = { args: { icon: "pull-request-draft", children: "Utkast" } }
export const Muted: Story = { args: { tone: "muted", children: "Arkivert" } }
export const Destructive: Story = { args: { tone: "destructive", icon: "failure", children: "Feilet" } }
