import type { Meta, StoryObj } from "@storybook/react-vite"

import { NavCards } from "../../src/components/nav-cards"
import { Gamepad2, Settings } from "../../src/lib/icons"

const meta = {
  title: "Navigation/NavCards",
  component: NavCards,
  tags: ["autodocs"],
  args: { label: "Mer fra siden", links: [{ href: "#a", label: "Artister", icon: Gamepad2, description: "Alle artister" }, { href: "#b", label: "Innstillinger", icon: Settings, description: "Oppsett" }] },
} satisfies Meta<typeof NavCards>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
