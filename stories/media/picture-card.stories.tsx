import type { Meta, StoryObj } from "@storybook/react-vite"

import { PictureCard } from "../../src/components/picture-card"
import { poster } from "../sample"

const meta = {
  title: "Media/PictureCard",
  component: PictureCard,
  tags: ["autodocs"],
  args: { title: "A collection", picture: poster(220, "F"), children: "Text over a picture." },
} satisfies Meta<typeof PictureCard>
export default meta
type Story = StoryObj<typeof meta>

export const WithPicture: Story = {}
export const WithoutPicture: Story = { args: { picture: null } }
