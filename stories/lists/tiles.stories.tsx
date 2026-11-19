import type { Meta, StoryObj } from "@storybook/react-vite"

import { Tiles } from "../../src/components/tiles"
import { poster, square } from "../sample"

const meta = {
  title: "Lists/Tiles",
  component: Tiles,
  tags: ["autodocs"],
  args: { tiles: Array.from({ length: 10 }, (_, i) => ({ key: String(i), href: i === 3 ? null : `#item-${i}`, title: `Title ${i + 1}`, picture: poster(i * 36, String(i + 1)), ratio: "poster" as const, detail: "Director", lines: ["★ 4"] })) },
  parameters: { docs: { description: { component: `### Use it when

pictures are looked at in a gallery: a poster wall, album covers.

### Do not use it when

a list to read (\`Rows\`).

### Accessibility

**Handled by the component**

- A list of tiles ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)).
- Each tile is one link around picture and words; the picture is hidden, so the link's name is its title, detail and lines ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content), [2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context)).
- A tile without \`href\` is plain text, not a link that goes nowhere ([4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value)).
- The tiles are read in DOM order, row by row ([1.3.2 Meaningful Sequence](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence)).
- Three across on a phone and as many as fit above, so nothing scrolls sideways at 320 px ([1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow)).
- The whole tile is the target, well over 24 px ([2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum)).

**You check**

- \`title\` names the thing, and \`detail\` and \`lines\` stay short: a screen reader hears all of them as the link ([2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context)).
- The title is cut after two lines: keep the whole of it on the page the tile links to.
- The tile has no focus style of its own: check the browser's outline shows around it ([2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible)).

### Content

The name and a line under it.

### Related

\`PictureRows\`, \`Grid\`, \`Picture\`` } }, },
} satisfies Meta<typeof Tiles>
export default meta
type Story = StoryObj<typeof meta>

/** Posters with a detail and a line each; the fourth tile has no address, so it is not a link. */
export const Default: Story = {}
/** Square pictures, as for albums. */
export const Squares: Story = { args: { tiles: Array.from({ length: 6 }, (_, i) => ({ key: String(i), href: `#album-${i}`, title: `Album ${i + 1}`, picture: square(i * 50, String(i + 1)), ratio: "square" as const, detail: "Artist" })) } }
