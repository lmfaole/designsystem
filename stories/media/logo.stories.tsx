import type { Meta, StoryObj } from "@storybook/react-vite"

import { Logo } from "../../src/components/logos"
import { square } from "../sample"

const meta = {
  title: "Media/Logo",
  component: Logo,
  tags: ["autodocs"],
  args: { name: "Studio", src: square(30, "S") },
  parameters: { docs: { description: { component: `### Use it when

one maker's or source's mark with a light plate so dark logos show.

### Do not use it when

decoration.

### Accessibility

**Handled by the component**

- The logo is an \`img\` with \`name\` as its \`alt\` and title ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))

**You check**

- \`name\` is the maker's or source's name, not «logo» ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- Where the name is already written next to it, a screen reader hears it twice: there is no decorative mode ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- With \`plate={false}\`, a dark logo still shows on the card's ground

### Related

\`Logos\`, \`Picture\`` } }, },
} satisfies Meta<typeof Logo>
export default meta
type Story = StoryObj<typeof meta>

/** The light plate, so a dark logo shows. */
export const Plate: Story = {}
/** No plate, on the card's own ground. */
export const Bare: Story = { args: { plate: false } }
