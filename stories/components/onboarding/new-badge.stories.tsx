import type { Meta, StoryObj } from "@storybook/react-vite"

import { NewBadge } from "../../../src/components/new-badge"

const meta = {
  title: "Components/Onboarding/NewBadge",
  component: NewBadge,
  tags: ["autodocs"],
  args: { until: "2027-01-01T00:00:00Z", now: "2026-11-20T12:00:00Z" },
  parameters: { docs: { description: { component: `### Use it when

a page or a section has just come, for a few weeks: beside its name in the navigation (the \`badge\` of a \`NavBar\` item) or in a list. Put a \`MarkSeen\` on the new page, so it goes once visited.

### Do not use it when

the thing is not new to everyone (an unread count), or for longer than a few weeks.

### Accessibility

**Handled by the component**

- «Nytt» is a word, read with the name beside it; the symbol is hidden ([1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color))
- Rendered on the server from \`now\`, so it does not appear or vanish after load ([3.2.1 On Focus](https://www.w3.org/WAI/WCAG22/Understanding/on-focus))

**You check**

- \`until\` is a few weeks after the launch

### Content

«Nytt».

### Related

\`Badge\`, \`NavBar\`` } } },
} satisfies Meta<typeof NewBadge>
export default meta
type Story = StoryObj<typeof meta>

/** New until the new year. */
export const Default: Story = {}
/** Past \`until\` (or seen): nothing is drawn. */
export const Expired: Story = { args: { now: "2027-02-01T12:00:00Z" } }
