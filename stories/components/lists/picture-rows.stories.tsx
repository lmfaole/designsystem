import type { Meta, StoryObj } from "@storybook/react-vite"

import { details, PictureRows } from "../../../src/components/picture-rows"
import { poster } from "../../sample"

const meta = {
  title: "Components/Lists/PictureRows",
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

**Handled by the component**

- A table with hidden column headers (Bilde, Tittel, Detaljer, Notat); the title is the row header, so each cell is heard with it ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)).
- The table roles are written out, so it stays a table while it is laid out as a grid ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)).
- The picture is decorative: hidden from assistive technology, with an empty \`alt\` ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content)).
- The DOM order is picture, title, detail, note: the order it is read in ([1.3.2 Meaningful Sequence](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence)).
- A row keeps to the width of its column, so nothing scrolls sideways at 320 px ([1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow)).

**You check**

- \`title\` names the thing; when it is a link, it goes to the thing's page ([2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context)).
- Title and detail are cut with an ellipsis when too long: keep them short, and the whole text on the thing's page ([1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow)).
- \`detail\` and \`aside\` say in words what they are (a date, a rating).

### Content

The name first, a line under it, a short note at the end.

### Related

\`Rows\`, \`Tiles\`, \`Picture\`` } }, },
} satisfies Meta<typeof PictureRows>
export default meta
type Story = StoryObj<typeof meta>

/** Posters, a detail line built with `details` (one part missing), and a row with no picture. */
export const Poster: Story = {}
/** The same rows with square pictures, as for albums. */
export const Square: Story = { args: { ratio: "square" } }
