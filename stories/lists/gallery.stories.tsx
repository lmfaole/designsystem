import type { Meta, StoryObj } from "@storybook/react-vite"

import { Gallery } from "../../src/components/gallery"
import { poster, square } from "../sample"

const meta = {
  title: "Lists/Gallery",
  component: Gallery,
  tags: ["autodocs"],
  args: { items: Array.from({ length: 10 }, (_, i) => ({ key: String(i), slug: i === 3 ? null : `film-${i}`, title: `Title ${i + 1}`, year: 2000 + i, cover: poster(i * 36, String(i + 1)), ratio: "poster" as const, subtitle: "Director", meta: ["★ 4"] })),
  link: (item, children, className) => <a href={`#${item.slug}`} className={className}>{children}</a> },
} satisfies Meta<typeof Gallery>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Squares: Story = { args: { items: Array.from({ length: 6 }, (_, i) => ({ key: String(i), slug: `album-${i}`, title: `Album ${i + 1}`, cover: square(i * 50, String(i + 1)), ratio: "square" as const, subtitle: "Artist" })) } }
