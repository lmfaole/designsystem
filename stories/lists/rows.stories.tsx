import type { Meta, StoryObj } from "@storybook/react-vite"

import { Cover } from "../../src/components/cover"
import { CardLink } from "../../src/components/card-link"
import { Rows } from "../../src/components/rows"
import { poster } from "../sample"

const meta = {
  title: "Lists/Rows",
  component: Rows,
  tags: ["autodocs"],
  args: { rows: [{ key: "a", body: "Alfa", trailing: "12" }, { key: "b", body: "Beta", trailing: "7" }] },
} satisfies Meta<typeof Rows>
export default meta
type Story = StoryObj<typeof meta>

export const Plain: Story = {}
export const Ranked: Story = { args: { lead: "rank", rows: ["Alfa", "Beta", "Gamma", "Delta"].map((name, i) => ({ key: name, body: <CardLink href="#" look="strong">{name}</CardLink>, trailing: `${40 - i * 7} avspillinger` })) } }
export const WithPoster: Story = { args: { lead: "poster", rows: ["Alfa", "Beta", "Gamma"].map((name, i) => ({ key: name, lead: <Cover url={poster(i * 70, name[0])} />, body: name, trailing: "★ 4,5" })) } }
