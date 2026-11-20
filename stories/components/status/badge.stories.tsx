import type { Meta, StoryObj } from "@storybook/react-vite"

import { Badge } from "../../../src/components/badge"

const meta = {
  title: "Components/Status/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: { children: "Utkast" },
  parameters: { docs: { description: { component: `\`### Use it when

one short word about a thing sits next to its name in a row: a status or a kind.

### Do not use it when

it is a line of statuses under a title (\`StatusLine\`), a count (\`SummaryBar\`) or an action. A badge is never a link or a button.

### Accessibility

**Handled by the component**

- The word is plain text, read as part of the row it sits in ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- The icon is hidden from assistive technology; the words beside it say the same ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- Every tone has words, so the state is never told by colour alone ([1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color))
- Text colours are theme tokens whose contrast the theme tests, light and dark ([1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum))

**You check**

- The word says the state by itself, without the tone or the icon ([1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color))
- The same word for the same state on every page ([3.2.4 Consistent Identification](https://www.w3.org/WAI/WCAG22/Understanding/consistent-identification))
- It is not interactive: do not wrap it in a link or a button ([4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value))

### Content

Sentence case, one word or two: «Utkast», «Feilet», «Ny». Use the same word for the same state everywhere.

### Related

\`StatusLine\`, \`SummaryBar\`` } } },
} satisfies Meta<typeof Badge>
export default meta
type Story = StoryObj<typeof meta>

/** The plain badge: one word, default tone, no icon. */
export const Default: Story = {}
/** An icon beside the word that repeats it, as a status in a row shows it. */
export const WithIcon: Story = { args: { icon: "pull-request-draft", children: "Utkast" } }
/** The muted tone, for a state that is past or set aside. */
export const Muted: Story = { args: { tone: "muted", children: "Arkivert" } }
/** The destructive tone with its symbol, only for what stops something. */
export const Destructive: Story = { args: { tone: "destructive", icon: "failure", children: "Feilet" } }
