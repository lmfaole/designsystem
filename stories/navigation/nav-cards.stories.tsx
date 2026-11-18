import type { Meta, StoryObj } from "@storybook/react-vite"

import { NavCards } from "../../src/components/nav-cards"

const meta = {
  title: "Navigation/NavCards",
  component: NavCards,
  tags: ["autodocs"],
  args: { label: "Mer fra siden", links: [{ href: "#a", label: "Artister", icon: "people", description: "Alle artister" }, { href: "#b", label: "Innstillinger", icon: "settings", description: "Oppsett" }] },
} satisfies Meta<typeof NavCards>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
