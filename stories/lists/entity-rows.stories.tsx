import type { Meta, StoryObj } from "@storybook/react-vite"

import { CardLink } from "../../src/components/card-link"
import { Cover } from "../../src/components/cover"
import { EntityRow, EntityRows } from "../../src/components/entity-rows"
import { square } from "../sample"

const meta = {
  title: "Lists/EntityRows",
  component: EntityRows,
  tags: ["autodocs"],
  subcomponents: { EntityRow },
  args: { caption: "Spor på albumet", children: [
    <EntityRow key="1" picture={<Cover ratio="square" url={square(40, "1")} />} name={<CardLink href="#" look="strong">Song One</CardLink>} label="Song One" detail="Spor 1" count="12 ganger" loved info={<p>Played first on 3 January.</p>} />,
    <EntityRow key="2" picture={<Cover ratio="square" url={square(80, "2")} />} name="Song Two" label="Song Two" detail="Spor 2" count="3 ganger" />,
    <EntityRow key="3" picture={<Cover ratio="square" url={null} />} name="Never played" label="Never played" count="0" muted />,
  ] },
} satisfies Meta<typeof EntityRows>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
