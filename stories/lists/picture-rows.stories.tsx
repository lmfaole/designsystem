import type { Meta, StoryObj } from "@storybook/react-vite"

import { details, PictureRows } from "../../src/components/picture-rows"
import { poster } from "../sample"

const meta = {
  title: "Lists/PictureRows",
  component: PictureRows,
  tags: ["autodocs"],
  args: { ratio: "poster", rows: [
    { key: "1", picture: poster(10, "A"), title: "Blade Runner", detail: details(["Ridley Scott", "1982", "★ 5"]), aside: "i går" },
    { key: "2", picture: poster(120, "B"), title: "Alien", detail: details(["Ridley Scott", null, "★ 4"]), aside: "3. nov." },
    { key: "3", picture: null, title: "A title with no picture", detail: "Someone", aside: "1. nov." },
  ] },
  parameters: { docs: { description: { component: `### Use it when

a list of things that each have a picture: a film, an album, a person.

### Do not use it when

things without a picture (\`Rows\`).

### Accessibility

The picture is decorative; the name beside it says what it is.

### Content

The name first, a line under it, a short note at the end.

### Related

\`Rows\`, \`Tiles\`, \`Picture\`` } }, },
} satisfies Meta<typeof PictureRows>
export default meta
type Story = StoryObj<typeof meta>

export const Poster: Story = {}
export const Square: Story = { args: { ratio: "square" } }
