import type { Meta, StoryObj } from "@storybook/react-vite"

import { Meteogram } from "../../../src/components/meteogram"
import type { MeteogramHour } from "../../../src/lib/meteogram"

/** The next 24 hours from Saturday 21 November 2026 at 06:00 in Oslo (05:00 UTC), one per hour, as Yr gives them. */
const day = (temperatures: readonly number[], precipitation: readonly number[], symbols: readonly string[]): MeteogramHour[] =>
  temperatures.map((temperature, index) => ({
    time: new Date(Date.UTC(2026, 10, 21, 5 + index)).toISOString(),
    temperature,
    precipitation: precipitation[index] ?? 0,
    symbol: symbols[index] ?? "cloudy",
  }))

const MILD_RAIN = day(
  [-2.4, -2.1, -1.6, -0.8, 0.4, 1.6, 2.7, 3.5, 4.1, 4.3, 3.9, 3.2, 2.6, 2.1, 1.8, 1.5, 1.1, 0.6, 0.1, -0.4, -0.9, -1.3, -1.6, -1.8],
  [0, 0, 0, 0, 0.1, 0.4, 0.9, 1.8, 2.4, 1.6, 0.8, 0.3, 0.2, 0.5, 0.7, 0.4, 0.1, 0, 0, 0, 0, 0, 0, 0],
  ["cloudy", "cloudy", "cloudy", "cloudy", "lightrain", "lightrain", "rain", "rain", "heavyrain", "rain", "rain", "lightrain", "lightrainshowers_day", "lightrainshowers_day", "rain", "lightrain", "lightrain", "cloudy", "partlycloudy_night", "partlycloudy_night", "partlycloudy_night", "clearsky_night", "clearsky_night", "clearsky_night"],
)

const COLD_SNOW = day(
  [-11.2, -11.6, -11.9, -11.4, -10.6, -9.4, -8.3, -7.5, -7.1, -6.9, -7.2, -7.8, -8.6, -9.3, -9.9, -10.4, -10.7, -11, -11.3, -11.5, -11.8, -12.1, -12.4, -12.6],
  [0.2, 0.3, 0.5, 0.6, 0.8, 1.1, 0.9, 0.7, 0.6, 0.4, 0.4, 0.3, 0.2, 0.2, 0.1, 0.1, 0, 0, 0, 0, 0, 0, 0, 0],
  ["lightsnow", "lightsnow", "snow", "snow", "snow", "heavysnow", "snow", "snow", "lightsnowshowers_day", "lightsnowshowers_day", "lightsnowshowers_day", "lightsnow", "lightsnow", "lightsnow", "lightsnow", "lightsnow", "cloudy", "cloudy", "partlycloudy_night", "partlycloudy_night", "clearsky_night", "clearsky_night", "clearsky_night", "clearsky_night"],
)

const DRY_CLEAR = day(
  [3.1, 2.8, 2.9, 4.2, 6.0, 7.8, 9.4, 10.6, 11.3, 11.6, 11.2, 10.1, 8.7, 7.4, 6.5, 5.8, 5.2, 4.7, 4.3, 3.9, 3.6, 3.4, 3.2, 3.0],
  [],
  ["clearsky_night", "clearsky_night", "fair_day", "clearsky_day", "clearsky_day", "clearsky_day", "clearsky_day", "clearsky_day", "fair_day", "fair_day", "partlycloudy_day", "partlycloudy_day", "fair_night", "clearsky_night", "clearsky_night", "clearsky_night", "clearsky_night", "clearsky_night", "clearsky_night", "clearsky_night", "clearsky_night", "clearsky_night", "clearsky_night", "clearsky_night"],
)

const TWO_DAYS = [...MILD_RAIN, ...day(
  [-2, -2.2, -2.1, -1.5, -0.6, 0.5, 1.4, 2.2, 2.9, 3.4, 3.1, 2.4, 1.6, 0.9, 0.2, -0.4, -0.9, -1.4, -1.8, -2.2, -2.5, -2.8, -3, -3.1],
  [0, 0, 0, 0, 0, 0, 0, 0.2, 0.6, 0.3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ["fair_night", "fair_night", "partlycloudy_day", "partlycloudy_day", "cloudy", "cloudy", "cloudy", "lightsleet", "sleet", "lightsleet", "cloudy", "cloudy", "cloudy", "cloudy", "partlycloudy_night", "partlycloudy_night", "clearsky_night", "clearsky_night", "clearsky_night", "clearsky_night", "clearsky_night", "clearsky_night", "clearsky_night", "clearsky_night"],
).map((hour) => ({ ...hour, time: new Date(new Date(hour.time).getTime() + 86_400_000).toISOString() }))]

const meta = {
  title: "Components/Charts/Meteogram",
  component: Meteogram,
  tags: ["autodocs"],
  args: { hours: MILD_RAIN, ariaLabel: "Været i Oslo de neste 24 timene" },
  parameters: { docs: { description: { component: `### Use it when

the weather of the next day or two is shown hour by hour: what the sky does, how warm it is and how much falls, read together on one time axis (as Yr and meteoblue draw it).

### Do not use it when

the weather now is the point (\`WeatherStage\` with the numbers on it), there are only a few values (a \`FactList\` or a line of text: «−2° / 4°, 6 mm»), or a single measure over a longer time (\`AreaChart\`, \`ColumnChart\`).

### Accessibility

**Handled by the component**

- The drawing is one image named by \`ariaLabel\`, hidden inside ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- A summary is written by default: the lowest and the highest with their hours, the precipitation in all and the wettest hour ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- Warm and cold are not told by colour alone: the zero line is drawn, and the degrees on the axis carry their sign («−3°») ([1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color))
- The line, the columns and the zero line keep 3:1 in light and dark (tokens \`--temperature-warm\`, \`--temperature-cold\`, \`--precipitation\`, measured by a test) ([1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast))
- Every hour (time, weather in words, temperature, precipitation) is a \`ChartTable\`, read by a screen reader or opened with \`showTable\` ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- It takes the width of its room with its text at its size; in a narrow room every other label is left out, and nothing scrolls sideways ([1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow))
- No tab stop, no tooltip and no motion ([2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard))

**You check**

- \`ariaLabel\` names the place and the period ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- The chart's title says where and when, and the source (Yr) is credited where the page shows it

### Content

Times are Oslo's, «14» on the axis and «14:00» in the table; degrees are whole with a real minus («−3°»), precipitation in «mm» with a decimal comma. The weather is said in Yr's words («Lette regnbyger»).

### Related

\`WeatherStage\`, \`AreaChart\`, \`ColumnChart\`, \`ChartCard\`` } } },
} satisfies Meta<typeof Meteogram>
export default meta
type Story = StoryObj<typeof meta>

/** A mild day with rain that crosses 0°: the line is cold below the dashed zero line and warm above it; the days are named over the axis and split by a line at midnight. */
export const Default: Story = {}
/** A cold day with snow: the whole line below zero, in the cold colour, with no zero line in the room. */
export const ColdSnow: Story = { args: { hours: COLD_SNOW, ariaLabel: "Været på Røros de neste 24 timene" } }
/** A dry, clear day: no columns, a quiet line that says there is no precipitation. */
export const DryClear: Story = { args: { hours: DRY_CLEAR, ariaLabel: "Været i Bergen de neste 24 timene" } }
/** Two days: in a narrow room every other symbol and hour is left out (the table keeps every hour). */
export const TwoDays: Story = { args: { hours: TWO_DAYS, ariaLabel: "Været i Oslo de neste 48 timene" } }
/** Every hour as a table anyone can open. */
export const ShowTable: Story = { args: { showTable: true } }
/** No hours: a sentence in the chart's place. */
export const Empty: Story = { args: { hours: [] } }
