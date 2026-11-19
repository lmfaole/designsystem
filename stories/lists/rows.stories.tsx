import type { Meta, StoryObj } from "@storybook/react-vite"

import { Picture } from "../../src/components/picture"
import { CardLink } from "../../src/components/card-link"
import { Rows } from "../../src/components/rows"
import { poster } from "../sample"

const meta = {
  title: "Lists/Rows",
  component: Rows,
  tags: ["autodocs"],
  args: { rows: [{ key: "a", body: "Alfa", trailing: "12" }, { key: "b", body: "Beta", trailing: "7" }] },
  parameters: { docs: { description: { component: `### Use it when

a list of things the reader opens: a name (the strongest part), a note at the end, an icon or poster at the start.

### Do not use it when

figures compared down several columns (\`Table\`) or one fact per term (\`FactList\`).

### Accessibility

Real links; a list of one structure so it reads as «kind, name, status, date».

### Content

The name is the strongest part; everything else is small and muted.

### Related

\`PictureRows\`, \`StatusLine\`, \`FactList\`` } }, },
} satisfies Meta<typeof Rows>
export default meta
type Story = StoryObj<typeof meta>

export const Plain: Story = {}
export const Ranked: Story = { args: { lead: "rank", rows: ["Alfa", "Beta", "Gamma", "Delta"].map((name, i) => ({ key: name, body: <CardLink href="#" look="strong">{name}</CardLink>, trailing: `${40 - i * 7} avspillinger` })), columns: { name: "Artist", value: "Avspillinger" } } }
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
