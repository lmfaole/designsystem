import type { Meta, StoryObj } from "@storybook/react-vite"

import { Logos } from "../../../src/components/logos"
import { square } from "../../sample"

const meta = {
  title: "Components/Media/Logos",
  component: Logos,
  tags: ["autodocs"],
  args: { logos: [{ name: "Studio A", src: square(30, "A") }, { name: "Studio B", src: square(200, "B") }] },
  parameters: { docs: { description: { component: `### Use it when

the logos of a thing's makers or sources.

### Do not use it when

pictures of people (\`Person\`).

### Accessibility

**Handled by the component**

- Each logo is an \`img\` with its name as \`alt\` ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- Logos are read in the order given ([1.3.2 Meaningful Sequence](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence))

**You check**

- Every \`name\` is the maker's real name, distinct from the others ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))

### Related

\`Logo\`, \`Picture\`` } }, },
} satisfies Meta<typeof Logos>
export default meta
type Story = StoryObj<typeof meta>

/** Two logos side by side, the way a page head shows them. */
export const Default: Story = {}
