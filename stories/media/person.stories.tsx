import type { Meta, StoryObj } from "@storybook/react-vite"

import { Person } from "../../src/components/person"
import { square } from "../sample"

const meta = {
  title: "Media/Person",
  component: Person,
  tags: ["autodocs"],
  args: { name: "Kari Nordmann", src: square(7) },
} satisfies Meta<typeof Person>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const NoPicture: Story = { args: { src: null } }
