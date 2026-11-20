import type { Meta, StoryObj } from "@storybook/react-vite"

import { DurationBars, type DurationSpan } from "../../../src/components/duration-bars"

/** Friday 20 November 2026, 14:00 in Oslo: a fixed now, so the pictures stay the same. */
const NOW = "2026-11-20T13:00:00.000Z"
const ago = (minutes: number) => new Date(Date.parse(NOW) - minutes * 60_000).toISOString()
const H = 60

const PULL_REQUEST: DurationSpan[] = [
  { key: "open", label: "Åpen", start: ago(26 * H), end: ago(25), row: "Pull request", tone: "neutral" },
  { key: "waiting", label: "Venter på review", start: ago(26 * H), end: ago(3 * H), row: "Review", tone: "neutral" },
  { key: "changes", label: "Endringer etterspurt", start: ago(3 * H), end: ago(55), row: "Review", tone: "warning" },
  { key: "approved", label: "Godkjent", start: ago(55), end: ago(25), row: "Review", tone: "success" },
  { key: "failing", label: "Sjekker feiler", start: ago(2 * H + 10), end: ago(48), row: "Sjekker", tone: "danger" },
  { key: "passing", label: "Sjekker grønne", start: ago(48), end: ago(25), row: "Sjekker", tone: "success" },
]

const ONGOING: DurationSpan[] = [
  { key: "open", label: "Åpen", start: ago(3 * 24 * H + 2 * H), tone: "neutral" },
  { key: "waiting", label: "Venter på review", start: ago(3 * 24 * H), tone: "accent" },
  { key: "draft", label: "Utkast", start: ago(3 * 24 * H + 2 * H), end: ago(3 * 24 * H), tone: "neutral" },
]

const meta = {
  title: "Components/Charts/DurationBars",
  component: DurationBars,
  tags: ["autodocs"],
  args: { label: "Tid i hver tilstand", spans: PULL_REQUEST, now: NOW },
  parameters: { docs: { description: { component: `### Use it when

the time something spent in each state is compared on one axis: how long a pull request waited for review, how long changes were asked for, how long the checks failed. Spans side by side in time, like Aksel's timeline, on a wide screen; a list of each with its length on a phone.

### Do not use it when

it is the order of what happened (\`Timeline\`), the steps and where it is now (\`StateSteps\`), or amounts to compare (\`RankedBarChart\`).

### Accessibility

**Handled by the component**

- The bars are a picture of a list that is always there: on a wide screen the list is for a screen reader alone, on a phone it is what is shown. Each item says the label, the times and the length («Venter på review, 19. nov., 14:00–20. nov., 11:00, 21 t») ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- A bar's colour is beside its label and length, never alone; the bars have 3:1 on the page and their words 4.5:1 on the bar (tokens \`--event-*\`, a test) ([1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color), [1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast))
- A span that goes on ends in an arrow at now, and says «så langt» and «pågår» in words ([1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color))
- Below the width bars need, it is a list, with no sideways scrolling ([1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow))

**You check**

- \`label\` names what is measured; lanes (\`row\`) are few and named as what they hold («Review», «Sjekker»)
- \`now\` is the time the page was made

### Content

Labels are states, not actions: «Venter på review», «Endringer etterspurt», «Sjekker feiler». Lengths are short: «12 min», «3 t», «2 d».

### Related

\`StateSteps\`, \`Timeline\`, \`DumbbellChart\`, \`Meteogram\`` } } },
} satisfies Meta<typeof DurationBars>
export default meta
type Story = StoryObj<typeof meta>

/** A merged pull request in lanes: the pull request, its review (waiting, changes asked for, approved) and its checks (failing, then green). */
export const PullRequestLanes: Story = {}

/** Spans that go on to now: an arrow at their end, and «så langt» in the list. */
export const Ongoing: Story = { args: { spans: ONGOING } }

/** On a phone's width the bars give way to a list of each span with its length. */
export const Narrow: Story = { decorators: [(Story) => <div className="max-w-[22rem]">{Story()}</div>] }
