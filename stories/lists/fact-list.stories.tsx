import type { Meta, StoryObj } from "@storybook/react-vite"

import { FactList } from "../../src/components/fact-list"
import { CardLink } from "../../src/components/card-link"

const meta = {
  title: "Lists/FactList",
  component: FactList,
  tags: ["autodocs"],
  args: { facts: [["Utgitt", "1982"], ["Regi", <CardLink key="d" href="#">Ridley Scott</CardLink>], ["Lengde", "117 min"]] },
} satisfies Meta<typeof FactList>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
