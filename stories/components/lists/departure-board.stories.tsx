import type { Meta, StoryObj } from "@storybook/react-vite"

import { DepartureBoard, type BoardDeparture } from "../../../src/components/departure-board"

/** Friday 20 November 2026, 14:00 in Oslo: a fixed now, so the pictures stay the same. */
const NOW = "2026-11-20T13:00:00.000Z"
const at = (minutes: number) => new Date(Date.parse(NOW) + minutes * 60_000).toISOString()
const go = (key: string, line: string, mode: BoardDeparture["mode"], destination: string, minutes: number, extra: Partial<BoardDeparture> = {}): BoardDeparture => ({ key, line, mode, destination, expected: at(minutes), realtime: true, ...extra })

const CARL_BERNER: BoardDeparture[] = [
  go("31-1", "31", "bus", "Tonsenhagen", 2, { quay: "B" }),
  go("31-2", "31", "bus", "Tonsenhagen", 9, { quay: "B" }),
  go("31-3", "31", "bus", "Tonsenhagen", 17, { quay: "B" }),
  go("31-4", "31", "bus", "Tonsenhagen", 26, { quay: "B" }),
  go("31-5", "31", "bus", "Fornebu", 5, { quay: "A" }),
  go("31-6", "31", "bus", "Fornebu", 13, { quay: "A" }),
  go("31-7", "31", "bus", "Fornebu", 21, { quay: "A" }),
  go("17-1", "17", "tram", "Rikshospitalet", 0.5, { quay: "C" }),
  go("17-2", "17", "tram", "Rikshospitalet", 10, { quay: "C" }),
  go("17-3", "17", "tram", "Rikshospitalet", 20, { quay: "C" }),
  go("5-1", "5", "metro", "Vestli", 4),
  go("5-2", "5", "metro", "Vestli", 11),
  go("5-3", "5", "metro", "Vestli", 19, { realtime: false }),
  go("5-4", "5", "metro", "Vestli", 34, { realtime: false }),
  go("20-1", "20", "bus", "Skøyen", 27, { realtime: false }),
  go("20-2", "20", "bus", "Skøyen", 42, { realtime: false }),
]

const DEVIATIONS: BoardDeparture[] = [
  go("l2-1", "L2", "rail", "Stabekk", 6, { aimed: at(2), quay: "3" }),
  go("l2-2", "L2", "rail", "Stabekk", 32, { quay: "3" }),
  go("r10-1", "R10", "rail", "Drammen", 12, { cancelled: true, quay: "2", notice: "Innstilt på grunn av feil på et signal ved Lysaker." }),
  go("r10-2", "R10", "rail", "Drammen", 42, { quay: "2" }),
  go("b1-1", "B1", "ferry", "Nesoddtangen", 15, { aimed: at(16) }),
  go("b1-2", "B1", "ferry", "Nesoddtangen", 45),
  go("81-1", "81", "bus", "Ljabru", 8, { aimed: at(3), notice: "Omkjøring forbi Ekebergveien på grunn av veiarbeid." }),
  go("81-2", "81", "bus", "Ljabru", 23, { cancelled: true, notice: "Omkjøring forbi Ekebergveien på grunn av veiarbeid." }),
  go("81-3", "81", "bus", "Ljabru", 38),
]

const WALK: BoardDeparture[] = [
  go("25-1", "25", "bus", "Majorstuen", 3),
  go("25-2", "25", "bus", "Majorstuen", 12),
  go("25-3", "25", "bus", "Majorstuen", 24),
  go("12-1", "12", "tram", "Majorstuen", 7),
  go("12-2", "12", "tram", "Majorstuen", 17),
  go("11-1", "11", "tram", "Kjelsås", 1),
  go("11-2", "11", "tram", "Kjelsås", 4),
  go("n-1", "", "other", "Taxibuss Grefsen", 6, { realtime: false }),
]

const meta = {
  title: "Components/Lists/DepartureBoard",
  component: DepartureBoard,
  tags: ["autodocs"],
  args: { stop: "Carl Berners plass", now: NOW, departures: CARL_BERNER, walkMinutes: 4, distance: 250 },
  decorators: [(Story) => <div className="max-w-xl">{Story()}</div>],
  parameters: { docs: { description: { component: `### Use it when

the next departures from a stop are shown as the signs at the stop show them: a card per stop, a row per line and destination, the next departure large and the next two smaller, with a strip of the next hour, how long until you must walk, delays and cancellations. The data is Entur's journey planner, read on the server.

### Do not use it when

it is a planned trip from A to B (a list of trips), one departure in a sentence («Bussen går 14:32»), or the timetable of a whole day (a \`Table\`).

### Accessibility

**Handled by the component**

- The stop is a heading (\`headingLevel\`), the rows a list, and each row reads in order: the line («Buss 31»), the destination, the next time, what to do («Gå om 4 min», «Innstilt»), the timetable time and the delay, «Deretter» the next times ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- The time strips and their scale are a picture of the times already in the text, hidden from a screen reader ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- Nothing is told by colour alone: the kind of a line has its symbol, a cancelled time is struck and says «Innstilt», a delay is «+3 min» with the timetable's time struck, a time out of reach says «Rekker ikke» with its symbol, and the walk is hatched ([1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color))
- The badges' text and the delay keep 4.5:1, and the dots 3:1, in light and dark (tokens \`--transit-*\`, a test) ([1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum))
- No motion, no tab stop and no script: it is rendered on the server and is the same in the browser ([2.2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide))
- Long destinations wrap; it takes any width down to a phone's without scrolling sideways ([1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow))

**You check**

- \`now\` is the time the data was read, and \`Freshness\` beside the board says when that was, so a board that has stopped renewing shows it ([3.2.5 Change on Request](https://www.w3.org/WAI/WCAG22/Understanding/change-on-request))
- The page does not renew the board as a live region: the reader looks at it, it does not interrupt
- Entur is credited where the page shows its data

### Content

Times are Oslo's: «nå» under a minute, «3 min» up to 20 minutes, then the clock («14:32»), and the clock for a time from the timetable, marked «Rutetid». A delay shows from two minutes late or one early («+3 min», «−1 min»). The kinds are «Buss», «Trikk», «T-bane», «Tog», «Båt»; a platform is «Plattform A», a track «Spor 2». A deviation is Entur's summary, one sentence.

### Related

\`LineBadge\`, \`Freshness\`, \`LiveDot\`, \`StatusLine\`, \`Rows\`` } } },
} satisfies Meta<typeof DepartureBoard>
export default meta
type Story = StoryObj<typeof meta>

/** A stop with buses, a tram and the T-bane: real-time counts, the clock from 20 minutes on, and timetable times marked «Rutetid». */
export const Default: Story = {}

/** A late train with its timetable time struck and «+4 min», an early boat, a cancelled train with «Innstilt», and deviations under their rows. */
export const DelaysAndCancellations: Story = { args: { stop: "Nationaltheatret", departures: DEVIATIONS, walkMinutes: 6, distance: 480 } }

/** Five minutes on foot: the walk is hatched on each strip, departures in it are faint, the rows say when to leave, and the line you cannot catch comes last. */
export const WalkMargin: Story = { args: { stop: "Bislett", departures: WALK, walkMinutes: 5, distance: 1240 } }

/** Without a walk: every running departure counts, and the rows are in time order. */
export const WithoutWalk: Story = { args: { stop: "Bislett", departures: WALK, walkMinutes: undefined, distance: undefined, limit: 3 } }

/** No departures: one sentence says so. */
export const Empty: Story = { args: { stop: "Ormøya brygge", departures: [], walkMinutes: 12, distance: 900 } }

/** On a phone's width: long destinations wrap and the strips take the room there is. */
export const Narrow: Story = { args: { stop: "Nationaltheatret", departures: DEVIATIONS, walkMinutes: 6, distance: 480 }, decorators: [(Story) => <div className="max-w-[22rem]">{Story()}</div>] }
