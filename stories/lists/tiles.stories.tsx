import type { Meta, StoryObj } from "@storybook/react-vite"

import { Tiles } from "../../src/components/tiles"
import { poster, square } from "../sample"

const meta = {
  title: "Lists/Tiles",
  component: Tiles,
  tags: ["autodocs"],
  args: { tiles: Array.from({ length: 10 }, (_, i) => ({ key: String(i), href: i === 3 ? null : `#item-${i}`, title: `Title ${i + 1}`, picture: poster(i * 36, String(i + 1)), ratio: "poster" as const, detail: "Director", lines: ["★ 4"] })) },
} satisfies Meta<typeof Tiles>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Squares: Story = { args: { tiles: Array.from({ length: 6 }, (_, i) => ({ key: String(i), href: `#album-${i}`, title: `Album ${i + 1}`, picture: square(i * 50, String(i + 1)), ratio: "square" as const, detail: "Artist" })) } }
