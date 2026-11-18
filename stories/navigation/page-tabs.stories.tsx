import type { Meta, StoryObj } from "@storybook/react-vite"

import { PageTabs } from "../../src/components/page-tabs"

const meta = {
  title: "Navigation/PageTabs",
  component: PageTabs,
  tags: ["autodocs"],
  args: {
    label: "Sider",
    tabs: [
      { key: "front", label: "Forside", href: "#", current: true, icon: "home" },
      { key: "pulls", label: "Pull requests", href: "#", current: false, icon: "pull-request", count: 14 },
      { key: "issues", label: "Issues", href: "#", current: false, icon: "issue", count: 9 },
      { key: "discussions", label: "Discussions", href: "#", current: false, icon: "discussion", count: 18 },
      { key: "weather", label: "Vær", href: "#", current: false, icon: "weather" },
    ],
  },
} satisfies Meta<typeof PageTabs>
export default meta
type Story = StoryObj<typeof meta>

/** The way between sibling pages: the current one marked, the counts seen before the page is opened. */
export const Default: Story = {}
