import type { Meta, StoryObj } from "@storybook/react-vite"

import { details, MediaRows } from "../../src/components/media-rows"
import { poster } from "../sample"

const meta = {
  title: "Lists/MediaRows",
  component: MediaRows,
  tags: ["autodocs"],
  args: { coverRatio: "poster", rows: [
    { key: "1", cover: poster(10, "A"), title: "Blade Runner", subtitle: details(["Ridley Scott", "1982", "★ 5"]), when: "i går" },
    { key: "2", cover: poster(120, "B"), title: "Alien", subtitle: details(["Ridley Scott", null, "★ 4"]), when: "3. nov." },
    { key: "3", cover: null, title: "A title with no picture", subtitle: "Someone", when: "1. nov." },
  ] },
} satisfies Meta<typeof MediaRows>
export default meta
type Story = StoryObj<typeof meta>

export const Poster: Story = {}
export const Square: Story = { args: { coverRatio: "square" } }
