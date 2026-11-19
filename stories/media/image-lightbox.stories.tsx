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

**Handled by the component**

- The picture is a real \`button\` named «Vis \`name\` større» ([4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value))
- It opens with a keyboard, and before the page's scripts have loaded ([2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard))
- It opens a modal \`dialog\` named by \`name\`: focus moves in and the page behind is inert ([2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order))
- Esc, the «Lukk» button or a tap outside closes it ([2.1.2 No Keyboard Trap](https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap))
- The large picture's \`alt\` is \`name\` ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))

**You check**

- \`name\` says what the picture shows, not «Bilde» ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- The child is decorative (\`Picture\`), so the button's name is the only one read ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- The button shows its focus around the picture in your theme ([2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible))

### Content

The picture's text says what it shows.

### Related

\`Picture\`, \`Overlay\`, \`CommandButton\`` } }, },
} satisfies Meta<typeof ImageLightbox>
export default meta
type Story = StoryObj<typeof meta>

/** A picture that opens larger in a dialog when tapped. */
export const Default: Story = { args: { children: <Picture src={poster(200, "Z")} /> } }
