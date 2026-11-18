import type { Meta, StoryObj } from "@storybook/react-vite"

import { ImageLightbox } from "../../src/components/image-lightbox"
import { Picture } from "../../src/components/picture"
import { poster } from "../sample"

const meta = {
  title: "Media/ImageLightbox",
  component: ImageLightbox,
  tags: ["autodocs"],
  args: { src: poster(200, "Z"), name: "Poster", children: null },
} satisfies Meta<typeof ImageLightbox>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { children: <Picture src={poster(200, "Z")} /> } }
