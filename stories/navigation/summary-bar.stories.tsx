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
} satisfies Meta<typeof SummaryBar>
export default meta
type Story = StoryObj<typeof meta>

/** The state of a place as counts that are links: first on a front page, before any list. */
export const Default: Story = {}
