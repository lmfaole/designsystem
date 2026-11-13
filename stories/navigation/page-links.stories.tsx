import type { Meta, StoryObj } from "@storybook/react-vite"

import { PageLinks } from "../../src/components/page-links"
import { Gamepad2, LayoutGrid, Settings } from "../../src/lib/icons"

const meta = {
  title: "Navigation/PageLinks",
  component: PageLinks,
  tags: ["autodocs"],
  args: { label: "Mer fra musikk", links: [{ to: "/", label: "Forside", icon: LayoutGrid, description: "Left out" }, { to: "/artister", label: "Artister", icon: Gamepad2, description: "Alle artister" }, { to: "/innstillinger", label: "Innstillinger", icon: Settings, description: "Oppsett" }] },
} satisfies Meta<typeof PageLinks>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
