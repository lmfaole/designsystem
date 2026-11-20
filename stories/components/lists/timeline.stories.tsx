import type { Meta, StoryObj } from "@storybook/react-vite"

import { Markdown } from "../../../src/components/markdown"
import { Timeline, type TimelineEvent } from "../../../src/components/timeline"
import { square } from "../../sample"

/** Friday 20 November 2026, 14:00 in Oslo: a fixed now, so the pictures stay the same. */
const NOW = "2026-11-20T13:00:00.000Z"
const ago = (minutes: number) => new Date(Date.parse(NOW) - minutes * 60_000).toISOString()
const H = 60
const D = 24 * H

const KARI = { name: "Kari Nordmann", avatar: square(200, "K"), href: "https://github.com/kari" }
const OLA = { name: "Ola Hansen", avatar: square(30, "O"), href: "https://github.com/ola" }
const BOT = { name: "github-actions" }

const commit = (id: string, minutes: number, message: string): TimelineEvent => ({ id, at: ago(minutes), kind: "event", icon: "commit", actor: OLA, summary: "la til commit", target: { label: message }, group: "commit" })

const PULL_REQUEST: TimelineEvent[] = [
  { id: "merged", at: ago(25), kind: "event", icon: "merge", tone: "accent", actor: KARI, summary: "merget inn i main" },
  { id: "checks-2", at: ago(48), kind: "event", icon: "success", tone: "success", actor: BOT, summary: "Sjekkene gikk gjennom", target: { label: "CI · 4 av 4" } },
  { id: "approved", at: ago(55), kind: "comment", icon: "review", tone: "success", actor: KARI, summary: "godkjente endringene", body: <Markdown size="sm" source="Ser bra ut nå. Takk for at du tok testen for tidssonen!" /> },
  commit("c8", 70, "Test dagen i Oslo-tid"),
  commit("c7", 74, "Rett avrunding av varighet"),
  commit("c6", 80, "Del opp lanes i egen funksjon"),
  commit("c5", 83, "Fjern ubrukt import"),
  commit("c4", 85, "Navngi aksens ticks"),
  commit("c3", 90, "Legg til test for collapseRuns"),
  commit("c2", 95, "Første utkast av tidslinjen"),
  commit("c1", 99, "Sett opp filer"),
  { id: "checks-1", at: ago(2 * H + 10), kind: "event", icon: "failure", tone: "danger", actor: BOT, summary: "Sjekkene feilet", target: { label: "Typecheck" }, href: "https://github.com/lmfaole/designsystem/actions/runs/1" },
  { id: "changes", at: ago(3 * H), kind: "comment", icon: "review", tone: "warning", actor: KARI, summary: "ba om endringer", body: <Markdown size="sm" source={"To ting:\n\n- `dayLabel` bruker UTC-dagen, ikke Oslo sin.\n- Kan løpene av commits brettes sammen?"} /> },
  { id: "review-requested", at: ago(D + 2 * H), kind: "event", icon: "view", actor: OLA, summary: "ba om review fra", target: { label: "Kari Nordmann" } },
  { id: "label", at: ago(D + 2 * H + 5), kind: "event", icon: "label", actor: OLA, summary: "la til etiketten", target: { label: "komponent" } },
  { id: "opened", at: ago(D + 2 * H + 6), kind: "comment", icon: "pull-request", actor: OLA, summary: "åpnet pull requesten", body: <Markdown size="sm" source={"Legger til `Timeline`, `StateSteps` og `DurationBars`.\n\nSe historien til en pull request, og hvor lenge den ventet."} /> },
]

const ISSUE: TimelineEvent[] = [
  { id: "i-closed", at: ago(40), kind: "event", icon: "closed", tone: "accent", actor: OLA, summary: "lukket saken som fullført" },
  { id: "i-linked", at: ago(50), kind: "event", icon: "pull-request", actor: OLA, summary: "lenket en pull request", target: { label: "Rett sommertid i aksen", href: "#pr" } },
  { id: "i-assign", at: ago(3 * D), kind: "event", icon: "assign", actor: KARI, summary: "tildelte saken til", target: { label: "Ola Hansen" } },
  { id: "i-reopen", at: ago(4 * D), kind: "event", icon: "reopen", tone: "success", actor: KARI, summary: "åpnet saken igjen" },
  { id: "i-closed-1", at: ago(5 * D), kind: "event", icon: "pull-request-closed", actor: OLA, summary: "lukket saken som ikke planlagt" },
  { id: "i-comment", at: ago(5 * D + 30), kind: "comment", icon: "comment", actor: KARI, summary: "kommenterte", body: <Markdown size="sm" source="Jeg ser det samme i Firefox når klokken stilles om." /> },
  { id: "i-bug", at: ago(6 * D), kind: "event", icon: "label", tone: "danger", actor: OLA, summary: "la til etiketten", target: { label: "bug" } },
  { id: "i-open", at: ago(6 * D + 5), kind: "comment", icon: "issue", tone: "success", actor: OLA, summary: "åpnet saken", body: <Markdown size="sm" source="Aksen hopper en time ved overgang til vintertid." /> },
]

const DISCUSSION: TimelineEvent[] = [
  { id: "d-answer", at: ago(2 * H), kind: "comment", icon: "success", tone: "success", actor: KARI, summary: "svarte", badge: "Svar", body: <Markdown size="sm" source={"Bruk `order=\"asc\"` for en samtale: den leses ovenfra og ned, eldst først."} /> },
  { id: "d-reply", at: ago(5 * H), kind: "comment", icon: "reply", actor: { name: "Per Berg" }, summary: "svarte", body: <Markdown size="sm" source="Jeg lurer på det samme." /> },
  { id: "d-start", at: ago(D + 3 * H), kind: "comment", icon: "discussion", actor: OLA, summary: "startet diskusjonen", body: <Markdown size="sm" source="Skal en tidslinje for en diskusjon vise det nyeste først?" /> },
]

const play = (id: string, minutes: number, track: string, album: string, extra: Partial<TimelineEvent> = {}): TimelineEvent => ({ id, at: ago(minutes), kind: "event", icon: "music", summary: "spilte", target: { label: track }, group: `album:${album}`, groupNoun: "spor", ...extra })

const LISTENING: TimelineEvent[] = [
  play("p1", 0, "Hyperballad", "post", { ongoing: true, icon: "listen", tone: "accent", summary: "spiller nå" }),
  play("p2", 5, "Isobel", "post"),
  play("p3", 10, "Enjoy", "post"),
  play("p4", 14, "Possibly Maybe", "post"),
  play("p5", 19, "Cover Me", "post"),
  play("p6", 22, "The Modern Things", "post"),
  play("p7", 26, "Army of Me", "post"),
  { id: "w1", at: ago(2 * H), kind: "event", icon: "tv", summary: "så", target: { label: "Twin Peaks · S1E3" } },
  play("p8", 3 * H, "Teardrop", "mezzanine"),
  play("p9", 3 * H + 6, "Angel", "mezzanine"),
  play("p10", D + 30, "Glory Box", "dummy"),
  play("p11", D + 35, "Sour Times", "dummy"),
  play("p12", D + 40, "Mysterons", "dummy"),
  play("p13", D + 44, "Strangers", "dummy"),
  { id: "f1", at: ago(D + 4 * H), kind: "event", icon: "film", summary: "så", target: { label: "Perfect Days" }, badge: "Sett før" },
]

const meta = {
  title: "Components/Lists/Timeline",
  component: Timeline,
  tags: ["autodocs"],
  args: { label: "Historikk for pull request 42", events: PULL_REQUEST, now: NOW, groupNouns: { commit: "commits" } },
  decorators: [(Story) => <div className="max-w-3xl">{Story()}</div>],
  parameters: { docs: { description: { component: `### Use it when

the history of one thing is shown on its page: what happened to a pull request, an issue or a discussion, or what was played and watched. Newest first, with a heading per day; comments in full, everything else as one line on the rail (Primer's timeline, GitLab's system notes).

### Do not use it when

it is a list of things that each have a page (\`Rows\`), a log to search (a \`Table\`), the state it is in now (\`StateSteps\` at the top, \`StatusLine\` under a title), or how long each state lasted (\`DurationBars\`).

### Accessibility

**Handled by the component**

- The history is an ordered list named by \`label\`; with days, each day is an item with a heading (\`headingLevel\`) and its own list named by it, so a screen reader can go from day to day ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- Each event reads as a sentence in order: who, what, the object, then when; the icon and its node are decoration, the words say the same ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- The tone colours only the node, beside its icon and words; the icon keeps 4.5:1 on its node and the node 3:1 on the page (tokens \`--event-*\`, a test) ([1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color), [1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast))
- A time is relative («for 3 timer siden») in a \`<time>\` with the exact time in \`datetime\` and its title, and a day's heading gives the full date beside «I dag» ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- A folded run is a native \`<details>\`: a button to the keyboard and a screen reader, with its state, that says what it holds («Vis 7 commits til») ([4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value))
- Each item is an anchor (\`id\`) and its time links to it, or to the event where it lives; a link out is marked as one ([2.4.4 Link Purpose](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context))
- What goes on now has a live dot and the word «nå»; the dot pulses twice and stops ([2.2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide))

**You check**

- \`label\` names the thing («Historikk for pull request 42»), and the headings' level fits the page's outline
- A comment's body is rendered with \`Markdown size="sm"\`, so its headings stay under the page's
- \`now\` is the time the page was made; the times are told from it

### Content

The actor first, then a short verb in the past tense and the object: «Kari godkjente endringene», «Ola la til etiketten bug», «spilte Hyperballad». The noun of a fold is plural («commits», «spor»). A badge is one word («Svar»).

### Related

\`StateSteps\`, \`DurationBars\`, \`Time\`, \`Person\`, \`Disclosure\`, \`Markdown\`, \`StatusLine\`` } } },
} satisfies Meta<typeof Timeline>
export default meta
type Story = StoryObj<typeof meta>

/** A pull request: opened with a description, a review asking for changes, a failed check, eight commits folded behind one disclosure, an approval, the checks passing and the merge. */
export const PullRequest: Story = {}

/** An issue: a label, a comment, closed, reopened, assigned and closed as done. */
export const Issue: Story = { args: { label: "Historikk for sak 17", events: ISSUE } }

/** A discussion, read as a conversation: oldest first, the accepted answer with its badge. */
export const Discussion: Story = { args: { label: "Diskusjon", events: DISCUSSION, order: "asc" } }

/** What was played and watched: what plays now with a live dot, and the plays of one album folded by its own noun («Vis 6 spor til»); a run never crosses a day. */
export const ListeningHistory: Story = { args: { label: "Lyttehistorikk", events: LISTENING, groupNouns: {} } }

/** Oldest first, with no day headings: one list, and a cap with a line for the rest. */
export const AscendingWithoutDays: Story = { args: { order: "asc", byDay: false, limit: 6 } }

/** No events: one sentence says so. */
export const Empty: Story = { args: { events: [] } }

/** On a phone's width: lines wrap under the actor, and the comments take the room there is. */
export const Narrow: Story = { decorators: [(Story) => <div className="max-w-[22rem]">{Story()}</div>] }
