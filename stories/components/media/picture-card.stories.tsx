import type { Meta, StoryObj } from "@storybook/react-vite"

import { PictureCard } from "../../../src/components/picture-card"
import { poster } from "../../sample"

const meta = {
  title: "Components/Media/PictureCard",
  component: PictureCard,
  tags: ["autodocs"],
  args: { title: "A collection", picture: poster(220, "F"), children: "Text over a picture." },
  parameters: { docs: { description: { component: `### Use it when

one self-contained item with a title, a body and a picture behind them.

### Do not use it when

a list of things to read (\`Rows\`).

### Accessibility

**Handled by the component**

- The picture behind is decorative (\`alt=""\`, hidden) ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- The title is a heading, \`<h3>\` by default (\`level\`) ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))

**You check**

- \`level\` fits the outline of the page ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- Where the card leads somewhere, the link text names the thing ([2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context))
- Text over the picture keeps 4.5:1; the picture is dimmed, but a busy or light one can still lower it ([1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum))

### Content

A title that names the thing.

### Related

\`Picture\`, \`Tiles\`` } }, },
} satisfies Meta<typeof PictureCard>
export default meta
type Story = StoryObj<typeof meta>

/** The picture dimmed behind the title and the text. */
export const WithPicture: Story = {}
/** The same card with no picture. */
export const WithoutPicture: Story = { args: { picture: null } }
