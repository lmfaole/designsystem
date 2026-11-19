import type { Meta, StoryObj } from "@storybook/react-vite"

import { FactList } from "../../src/components/fact-list"
import { CardLink } from "../../src/components/card-link"

const meta = {
  title: "Lists/FactList",
  component: FactList,
  tags: ["autodocs"],
  args: { facts: [["Utgitt", "1982"], ["Regi", <CardLink key="d" href="#">Ridley Scott</CardLink>], ["Lengde", "117 min"]] },
  parameters: { docs: { description: { component: `### Use it when

facts about one thing: each term once with one value or several stacked under it (reviewers, labels, assignees).

### Do not use it when

figures to compare across things (\`Table\`), or a list of things (\`Rows\`).

### Accessibility

**Handled by the component**

- A real description list: each term a \`dt\`, each value a \`dd\` ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)).
- Several values are separate \`dd\`s, not one joined string ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)).
- Terms without a value, and a list with none left, are not drawn, so no empty term is announced ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)).
- Terms and values are read in the order given ([1.3.2 Meaningful Sequence](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence)).
- Values wrap anywhere, so a long address or branch name fits at 320 px ([1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow)).

**You check**

- Each term is a short noun that says what its value is ([2.4.6 Headings and Labels](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels)).
- A value that is a link says where it goes ([2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context)).
- A heading before the list says what the facts are about ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)).

### Content

Several values are several lines, never a comma-separated string. Terms are nouns.

### Related

\`Rows\`, \`StatusLine\`, \`Person\`` } }, },
} satisfies Meta<typeof FactList>
export default meta
type Story = StoryObj<typeof meta>

/** One value per term, one of them a link to a card: the common case. */
export const Default: Story = {}

/**
 * Several things of one kind are several values of ONE term, under each other: the term once, each value on a line of its own.
 * Never «zenabii, kristianulv23, Stormoen» in one line: a list is scanned down, a sentence is read along.
 */
export const SeveralValues: Story = {
  args: {
    facts: [
      ["Gren", "refactor/textarea-forenkling → main"],
      ["Størrelse", "+296 −98 · 6 filer"],
      ["Venter på review fra", ["zenabii", "kristianulv23", "Stormoen", "fremtindelise", "jonashior"]],
      ["Reviews", ["copilot-pull-request-reviewer: kommenterte", "piofinn: godkjent"]],
      ["Etiketter", ["bug", "tekstfelt"]],
    ],
  },
}

/** A term with nothing under it is left out, and so is the whole list when nothing is left. */
export const EmptyTermsAreLeftOut: Story = { args: { facts: [["Tildelt", []], ["Etiketter", ""], ["Gren", "main"]] } }
