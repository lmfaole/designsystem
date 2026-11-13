import type { Meta, StoryObj } from "@storybook/react-vite"

import { BackdropCard } from "../../src/components/backdrop-card"
import { poster } from "../sample"

const meta = {
  title: "Media/BackdropCard",
  component: BackdropCard,
  tags: ["autodocs"],
  args: { title: "A franchise", picture: poster(220, "F"), children: "Text over a picture." },
} satisfies Meta<typeof BackdropCard>
export default meta
type Story = StoryObj<typeof meta>

export const WithPicture: Story = {}
export const WithoutPicture: Story = { args: { picture: null } }
