import type { Meta, StoryObj } from "@storybook/react-vite"

import { FactList } from "../../src/components/fact-list"
import { CardLink } from "../../src/components/card-link"

const meta = {
  title: "Lists/FactList",
  component: FactList,
  tags: ["autodocs"],
  args: { facts: [["Utgitt", "1982"], ["Regi", <CardLink key="d" href="#">Ridley Scott</CardLink>], ["Lengde", "117 min"]] },
  parameters: { docs: { description: { component: `**Use it when** facts about one thing: each term once with one value or several stacked under it (reviewers, labels, assignees).

**Do not use it when** figures to compare across things (\`Table\`), or a list of things (\`Rows\`).

**Accessibility.** A real description list. Terms without a value are left out.

**Content.** Several values are several lines, never a comma-separated string. Terms are nouns.

**Related.** \`Rows\`, \`StatusLine\`, \`Person\`` } }, },
} satisfies Meta<typeof FactList>
export default meta
type Story = StoryObj<typeof meta>

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
