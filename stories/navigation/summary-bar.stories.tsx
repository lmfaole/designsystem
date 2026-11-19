import type { Meta, StoryObj } from "@storybook/react-vite"

import { SummaryBar } from "../../src/components/summary-bar"

const meta = {
  title: "Navigation/SummaryBar",
  component: SummaryBar,
  tags: ["autodocs"],
  args: {
    label: "Oversikt",
    items: [
      { key: "blocked", label: "blokkert", count: 2, href: "#", icon: "warning", tone: "destructive" },
      { key: "ready", label: "klar til merge", count: 1, href: "#", icon: "merge" },
      { key: "review", label: "venter på din review", count: 14, href: "#", icon: "view" },
      { key: "issues", label: "issues", count: 9, href: "#", icon: "issue" },
    ],
  },
  parameters: { docs: { description: { component: `**Use it when** the state of a place in counts that each link to what they count: first on a front page.

**Do not use it when** a count that links nowhere, or figures to compare (\`FactList\`).

**Accessibility.** A \`nav\` with links; each count has its words and an icon, and \`destructive\` is only for what stops something.

**Content.** Plural labels («blokkert»). Leave out the zeros.

**Related.** \`SubPages\`, \`PageSection\`, \`StatusLine\`` } }, },
} satisfies Meta<typeof SummaryBar>
export default meta
type Story = StoryObj<typeof meta>

/** The state of a place as counts that are links: first on a front page, before any list. */
export const Default: Story = {}
