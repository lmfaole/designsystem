import type { Meta, StoryObj } from "@storybook/react-vite"

import { Cover } from "../../src/components/cover"
import { CoverLightbox } from "../../src/components/cover-lightbox"
import { poster } from "../sample"

const meta = {
  title: "Media/CoverLightbox",
  component: CoverLightbox,
  tags: ["autodocs"],
  args: { url: poster(200, "Z"), name: "Poster", children: null },
} satisfies Meta<typeof CoverLightbox>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { children: <Cover url={poster(200, "Z")} /> } }
