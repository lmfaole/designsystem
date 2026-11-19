import type { Meta, StoryObj } from "@storybook/react-vite"

import { ImageLightbox } from "../../src/components/image-lightbox"
import { Picture } from "../../src/components/picture"
import { poster } from "../sample"

const meta = {
  title: "Media/ImageLightbox",
  component: ImageLightbox,
  tags: ["autodocs"],
  args: { src: poster(200, "Z"), name: "Poster", children: null },
  parameters: { docs: { description: { component: `### Use it when

a picture the reader may want to see larger: a screenshot, a cover.

### Do not use it when

a picture that is the page's content or that needs no more size.

### Accessibility

Opens a modal \`dialog\` (focus trapped, Esc closes) from a button that works before scripts load.

### Content

The picture's text says what it shows.

### Related

\`Picture\`, \`Overlay\`, \`CommandButton\`` } }, },
} satisfies Meta<typeof ImageLightbox>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { children: <Picture src={poster(200, "Z")} /> } }
