import type { Meta, StoryObj } from "@storybook/react-vite"

import { PictureCard } from "../../src/components/picture-card"
import { poster } from "../sample"

const meta = {
  title: "Media/PictureCard",
  component: PictureCard,
  tags: ["autodocs"],
  args: { title: "A collection", picture: poster(220, "F"), children: "Text over a picture." },
  parameters: { docs: { description: { component: `### Use it when

one self-contained item with a title, a body and a picture behind them.

### Do not use it when

a list of things to read (\`Rows\`).

### Accessibility

The title is a link; the picture is decorative.

### Content

A title that names the thing.

### Related

\`Picture\`, \`Tiles\`` } }, },
} satisfies Meta<typeof PictureCard>
export default meta
type Story = StoryObj<typeof meta>

export const WithPicture: Story = {}
export const WithoutPicture: Story = { args: { picture: null } }
