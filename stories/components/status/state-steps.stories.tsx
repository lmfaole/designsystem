import type { Meta, StoryObj } from "@storybook/react-vite"

import { StateSteps, type StateStep } from "../../../src/components/state-steps"

/** Friday 20 November 2026, 14:00 in Oslo: a fixed now, so the pictures stay the same. */
const NOW = "2026-11-20T13:00:00.000Z"
const ago = (minutes: number) => new Date(Date.parse(NOW) - minutes * 60_000).toISOString()

const WAITING: StateStep[] = [
  { label: "Åpnet", at: ago(3 * 1440 + 120), state: "done", icon: "pull-request" },
  { label: "Review", at: ago(3 * 1440), state: "current", icon: "view" },
  { label: "Godkjent", state: "upcoming", icon: "success" },
  { label: "Merget", state: "upcoming", icon: "merge" },
]

const MERGED: StateStep[] = [
  { label: "Åpnet", at: ago(1440 + 126), state: "done", icon: "pull-request" },
  { label: "Review", at: ago(1440 + 120), state: "done", icon: "view" },
  { label: "Godkjent", at: ago(55), state: "done", icon: "success" },
  { label: "Merget", at: ago(25), state: "done", icon: "merge" },
]

const CLOSED: StateStep[] = [
  { label: "Åpnet", at: ago(9 * 1440), state: "done", icon: "pull-request" },
  { label: "Review", at: ago(8 * 1440), state: "done", icon: "view" },
  { label: "Godkjent", state: "skipped", icon: "success" },
  { label: "Lukket uten merge", at: ago(2 * 1440), state: "failed", icon: "pull-request-closed" },
]

const meta = {
  title: "Components/Status/StateSteps",
  component: StateSteps,
  tags: ["autodocs"],
  args: { label: "Status for pull request 42", steps: WAITING, now: NOW },
  parameters: { docs: { description: { component: `### Use it when

a thing goes through known steps and the reader wants to see where it is and how long each took, at the top of its page: a pull request (Åpnet, Review, Godkjent, Merget), an order, an application. Like Carbon's progress indicator, but for what has happened, not a form to fill in.

### Do not use it when

the steps are not known in advance (a \`Timeline\`), it is a value against a goal (\`Progress\`), or the state is one word beside a name (\`Badge\`).

### Accessibility

**Handled by the component**

- An ordered list named by \`label\`; the current step has \`aria-current="step"\` ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- Each step's state is said in words to a screen reader («Review, nå»), and to the eye by the marker's shape (a tick, a dot in a ring, an empty ring, a cross, a dashed ring) and by «Feilet», «Hoppet over» or «Ikke ennå»; never by colour alone ([1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color))
- The time a step was reached is a \`<time>\` with the exact time in its title; the time in a step reads «Varte 2 t», the current one's «Har vart i 3 d» ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- Side by side where there is room, under each other on a phone, with no sideways scrolling ([1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow))

**You check**

- \`label\` names the thing; the steps are few (three to six) and named as states («Godkjent»), not actions
- \`now\` is the time the page was made

### Content

Labels are one or two words, a state reached: «Åpnet», «Review», «Godkjent», «Merget», «Lukket uten merge». Durations are short: «12 min», «3 t», «2 d».

### Related

\`Timeline\`, \`DurationBars\`, \`StatusLine\`, \`Progress\`` } } },
} satisfies Meta<typeof StateSteps>
export default meta
type Story = StoryObj<typeof meta>

/** An open pull request waiting three days for review: the current step runs to now. */
export const WaitingForReview: Story = {}

/** Merged: every step done, with the time in each until the next. */
export const Merged: Story = { args: { steps: MERGED } }

/** Closed without merging: the approval skipped, the end failed. */
export const ClosedWithoutMerge: Story = { args: { steps: CLOSED } }

/** On a phone's width the steps stand under each other, the line down their left. */
export const Narrow: Story = { decorators: [(Story) => <div className="max-w-[22rem]">{Story()}</div>] }
