import type { Meta, StoryObj } from "@storybook/react-vite"

import { CardLink } from "../../../src/components/card-link"
import { Picture } from "../../../src/components/picture"
import { EntityRow, EntityRows } from "../../../src/components/entity-rows"
import { square } from "../../sample"

const meta = {
  title: "Components/Lists/EntityRows",
  component: EntityRows,
  tags: ["autodocs"],
  subcomponents: { EntityRow },
  args: { caption: "Spor på albumet", children: [
    <EntityRow key="1" picture={<Picture ratio="square" src={square(40, "1")} />} name={<CardLink href="#" look="strong">Song One</CardLink>} label="Song One" detail="Spor 1" count="12 ganger" info={<p>Played first on 3 January.</p>} />,
    <EntityRow key="2" picture={<Picture ratio="square" src={square(80, "2")} />} name="Song Two" label="Song Two" detail="Spor 2" count="3 ganger" />,
    <EntityRow key="3" picture={<Picture ratio="square" src={null} />} name="Never played" label="Never played" count="0" muted />,
  ] },
  parameters: { docs: { description: { component: `### Use it when

the lines of a list on the page of a thing, as a table: its count and the extra belong to the name.

### Do not use it when

a list the reader opens (\`Rows\`).

### Accessibility

**Handled by the component**

- A table with a hidden \`caption\` and hidden column headers (Bilde, Navn, Antall, Mer); the name is the row header, so the count and the extra are heard with it ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)).
- The table roles are written out, so it stays a table while it is laid out as a grid ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)).
- A long list keeps its whole row count for a screen reader (\`aria-rowcount\`) while only part of it is drawn ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)).
- The «i» is a native button named «Om …» from \`label\`, opening a native popover; keyboard and Escape come from the browser ([2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard), [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value)).
- The «i» button is 24 px ([2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum)).
- A \`muted\` row dims only the picture; its name is the muted text colour, not lowered opacity ([1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum)).

**You check**

- \`caption\` says what the list is ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)).
- \`label\` is the plain name, so the button reads «Om Song One» ([4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value)).
- A picture passed as \`Picture\` is hidden; anything else needs its own text alternative ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content)).
- A name that is a link goes to the thing's page and says which thing ([2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context)).
- \`count\` says in words what is counted («12 ganger», not «12»).

### Content

Short lines; the count is a number.

### Related

\`Rows\`, \`FactList\`` } }, },
} satisfies Meta<typeof EntityRows>
export default meta
type Story = StoryObj<typeof meta>

/** Every state of a line in one list: a linked name with an «i» popover, a plain one, and a muted one with no picture. */
export const Default: Story = {}
