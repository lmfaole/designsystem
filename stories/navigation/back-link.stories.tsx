import type { Meta, StoryObj } from "@storybook/react-vite"

import { BackLink } from "../../src/components/back-link"

const meta = {
  title: "Navigation/BackLink",
  component: BackLink,
  tags: ["autodocs"],
  args: { href: "#", label: "Pull requests" },
} satisfies Meta<typeof BackLink>
export default meta
type Story = StoryObj<typeof meta>

/** Names where it goes («Pull requests»), never just «Tilbake». */
export const Default: Story = {}
