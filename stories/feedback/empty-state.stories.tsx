import type { Meta, StoryObj } from "@storybook/react-vite"

import { EmptyState } from "../../src/components/empty-state"

const meta = {
  title: "Feedback/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
  args: { title: "Ingen åpne pull requests", description: "Alt er behandlet." },
  parameters: { docs: { description: { component: `\`**Use it when** a list or page has nothing to show. Say what it would hold, why it is empty if the reader can change that, and one next step if there is one.

**Do not use it when** many sections of a front page are empty at once (a quiet line of text each), or a query failed (\`ErrorMessage\`).

**Accessibility.** It replaces the whole empty structure, so a screen reader does not read a table header over no rows. No illustration, no joke.

**Content.** «Ingen treff. Prøv færre filtre.» when filtered; «Ingen åpne pull requests. Alt er behandlet.» when nothing is wrong; never «Noe gikk galt».

**Related.** \`Banner\`, \`ErrorMessage\`, \`Skeleton\`` } } },
} satisfies Meta<typeof EmptyState>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithAction: Story = { args: { icon: "search", title: "Ingen treff", description: "Prøv færre filtre.", action: { href: "#", label: "Nullstill filtre" } } }
export const TitleOnly: Story = { args: { description: undefined } }
