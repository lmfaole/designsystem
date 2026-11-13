import type { Meta, StoryObj } from "@storybook/react-vite"

import { TrackRows } from "../../src/components/track-rows"
import { square } from "../sample"

const meta = {
  title: "Lists/TrackRows",
  component: TrackRows,
  tags: ["autodocs"],
  args: { whenHead: "Spilt", rows: [
    { key: "1", cover: square(200, "A"), track: "Song One", artist: "The Band", album: "Debut", when: "14:02" },
    { key: "2", cover: square(300, "B"), track: "Song Two", artist: "Another", album: "", when: "13:55" },
  ] },
} satisfies Meta<typeof TrackRows>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
