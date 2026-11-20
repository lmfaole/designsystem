import type { Meta, StoryObj } from "@storybook/react-vite"

import { Picture } from "../../../src/components/picture"
import { CardLink } from "../../../src/components/card-link"
import { Rows } from "../../../src/components/rows"
import { poster } from "../../sample"

const meta = {
  title: "Components/Lists/Rows",
  component: Rows,
  tags: ["autodocs"],
  args: { rows: [{ key: "a", body: "Alfa", trailing: "12" }, { key: "b", body: "Beta", trailing: "7" }] },
  parameters: { docs: { description: { component: `### Use it when

a list of things the reader opens: a name (the strongest part), a note at the end, an icon or poster at the start.

### Do not use it when

figures compared down several columns (\`Table\`) or one fact per term (\`FactList\`).

### Accessibility

**Handled by the component**

- A table with hidden column headers (Rang, Type or Bilde, then the name and the value); the body is the row header, so what a row has is heard with its name ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)).
- The table roles are written out, so it stays a table while it is laid out as a grid ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)).
- With \`lead="rank"\` the rank is counted from the order, so the number and the reading order agree ([1.3.2 Meaningful Sequence](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence)).
- With \`lead="icon"\` the icon is hidden, or an image named \`iconLabel\` when one is given ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content)).
- The body wraps anywhere, so a long name fits at 320 px ([1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow)).

**You check**

- \`columns.name\` and \`columns.value\` name the columns («Navn» and «Antall» when left out) ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)).
- \`iconLabel\` is given where the kind of a row is not in its words ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content)).
- An \`iconTone\` is never the only sign: the words say the same ([1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color)).
- A name that is a link goes to the thing's page and says which thing ([2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context)).

### Content

The name is the strongest part; everything else is small and muted.

### Related

\`PictureRows\`, \`StatusLine\`, \`FactList\`` } }, },
} satisfies Meta<typeof Rows>
export default meta
type Story = StoryObj<typeof meta>

/** No lead: a name and what it has, the simplest list. */
export const Plain: Story = {}
/** `lead="rank"`: the rank counted from the order, names as links, and the columns named for a screen reader. */
export const Ranked: Story = { args: { lead: "rank", rows: ["Alfa", "Beta", "Gamma", "Delta"].map((name, i) => ({ key: name, body: <CardLink href="#" look="strong">{name}</CardLink>, trailing: `${40 - i * 7} avspillinger` })), columns: { name: "Artist", value: "Avspillinger" } } }
/** `lead="poster"`: a picture in front of each name, with the columns named «Tittel» and «Vurdering». */
export const WithPoster: Story = { args: { lead: "poster", rows: ["Alfa", "Beta", "Gamma"].map((name, i) => ({ key: name, lead: <Picture src={poster(i * 70, name[0])} />, body: name, trailing: "★ 4,5" })), columns: { name: "Tittel", value: "Vurdering" } } }

/** The kind of each row as an icon in front of it; `iconLabel` where the kind is not in the words. */
export const WithIcon: Story = {
  args: {
    lead: "icon",
    // The headers a screen reader hears with every cell: the trailing column is a date, not a count (toolbar «Skjermlesertekst: Synlig»).
    columns: { name: "Tittel", value: "Oppdatert" },
    rows: [
      { key: "a", icon: "pull-request", iconLabel: "Pull request", body: "Fiks tidssone i værmeldingen", trailing: "i dag" },
      { key: "b", icon: "pull-request-draft", iconLabel: "Utkast", body: "Utkast: tidslinje", trailing: "10. nov." },
      { key: "c", icon: "issue", iconLabel: "Issue", body: "Feil: TextArea får scroll", trailing: "18. nov." },
      { key: "d", icon: "discussion", iconLabel: "Discussion", iconTone: "primary", body: "Hvordan bør vi navngi tokens?", trailing: "30. sep." },
    ],
  },
}
/** No `trailing` in any row: the time sits in the body's own line, and a long title has the whole width (no empty column is drawn). */
export const WithoutTrailing: Story = {
  args: {
    lead: "icon",
    columns: { name: "Tittel" },
    rows: [
      { key: "a", icon: "pull-request", iconLabel: "Pull request", body: "chore(deps): bump @tailwindcss/vite from 4.3.3 to 4.3.5 · for 20 timer siden" },
      { key: "b", icon: "pull-request", iconLabel: "Pull request", body: "Bump the github-actions group across 1 directory with 6 updates · for 1 time siden" },
    ],
  },
}
