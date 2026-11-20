import type { Meta, StoryObj } from "@storybook/react-vite"

import { details } from "../../../src/components/picture-rows"
import { RankedRows } from "../../../src/components/ranked-rows"
import { poster } from "../../sample"

const meta = {
  title: "Components/Lists/RankedRows",
  component: RankedRows,
  tags: ["autodocs"],
  args: { ratio: "square", corners: "round", rows: [
    { key: "1", picture: poster(10, "A"), title: "Tinashe", value: "141 avspillinger", amount: 141, change: { kind: "same" } },
    { key: "2", picture: poster(120, "B"), title: "Madonna", value: "105 avspillinger", amount: 105, change: { kind: "up", by: 1 } },
    { key: "3", picture: poster(200, "C"), title: "Troye Sivan", value: "85 avspillinger", amount: 85, change: { kind: "up", by: 202 } },
    { key: "4", picture: null, title: "Ninajirachi", value: "55 avspillinger", amount: 55, change: { kind: "down", by: 2 } },
    { key: "5", picture: poster(300, "E"), title: "underscores", value: "52 avspillinger", amount: 52, change: { kind: "new" } },
  ] },
  parameters: { docs: { description: { component: `### Use it when

a top list: things in order of how much, each with its place, a picture, how its place moved since the list before, and how far it is from the first.

### Do not use it when

the order is not the point (\`PictureRows\`, \`Rows\`), or a chart of many values is what is wanted (\`RankedBarChart\`).

### Accessibility

**Handled by the component**

- The places are counted by the list, so the order a reader hears is the order the rows are in. A table with hidden column headers (Plass, Bilde, Navn, Endring og mer, Antall); the name is the row header ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)).
- The change is always in words («Opp 3», «Ned 1», «Uendret», «Ny»); the arrow is a hint and hidden from assistive technology, and nothing depends on colour ([1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color)).
- The bar is decoration, hidden from assistive technology: the score is said in words beside it ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content)).
- The picture is decorative, with an empty \`alt\`; the frame is there with no picture, so the rows stay level.
- The place is real text, not a style on a list marker, so it is read and copied.
- A title has the whole width and wraps, so nothing is cut off at 320 px ([1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow)).

**You check**

- Pass the rows in order, most first; the component does not sort.
- \`value\` says what is counted in words («141 avspillinger»); \`title\` names the thing and is a link to its page where it has one.

### Content

The name first; under it how the place moved, then the rest; the score at the end of that line. Say the unit in the score.

### Related

\`PictureRows\`, \`Rows\`, \`RankedBarChart\`, \`Picture\`` } }, },
} satisfies Meta<typeof RankedRows>
export default meta
type Story = StoryObj<typeof meta>

/** A top list of artists: round pictures, the place of each, how it moved since the list before (the third climbed 202 places, the last is new), and a bar for how far each is from the first. */
export const Artists: Story = {}
/** Albums: sharp covers, and the artist in the line under the title. */
export const Albums: Story = { args: { corners: "sharp", rows: [
  { key: "1", picture: poster(10, "A"), title: "Popstar", detail: details(["Tinashe"]), value: "86 avspillinger", amount: 86, change: { kind: "same" } },
  { key: "2", picture: poster(120, "B"), title: "She’s the Best", detail: details(["Troye Sivan"]), value: "75 avspillinger", amount: 75, change: { kind: "down", by: 1 } },
  { key: "3", picture: poster(200, "C"), title: "CONFESSIONS II", detail: details(["Madonna"]), value: "62 avspillinger", amount: 62, change: { kind: "up", by: 1 } },
] } }
/** No pictures (a list of words, such as tags): no `ratio`, and no column is left empty. */
export const WithoutPictures: Story = { args: { ratio: undefined, rows: [
  { key: "1", title: "hyperpop", value: "412 avspillinger", amount: 412 },
  { key: "2", title: "club", value: "268 avspillinger", amount: 268 },
  { key: "3", title: "a tag with a name long enough to wrap onto a second line", value: "90 avspillinger", amount: 90 },
] } }
/** A first list: nothing to compare with, so no change is shown (`change` is left out), and no bar where a row has no `amount`. */
export const FirstList: Story = { args: { rows: [
  { key: "1", picture: poster(10, "A"), title: "Tinashe", value: "141 avspillinger" },
  { key: "2", picture: poster(120, "B"), title: "Madonna", value: "105 avspillinger" },
] } }
