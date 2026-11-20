import type { Meta, StoryObj } from "@storybook/react-vite"

import { Heading, Text } from "../../../src/components/text"
import { WeatherStage } from "../../../src/components/weather-stage"

const meta = {
  title: "Components/Layout/WeatherStage",
  component: WeatherStage,
  tags: ["autodocs"],
  args: { symbol: "partlycloudy_day", children: null },
  render: (args) => (
    <div className="@container max-w-xl">
      <WeatherStage symbol={args.symbol}>
        <div className="grid gap-1">
          <Text size="sm" weight="medium">
            Oslo · nå
          </Text>
          <Heading level={2}>7 °</Heading>
          <Text size="sm">Delvis skyet, vind 3 m/s</Text>
        </div>
      </WeatherStage>
    </div>
  ),
  parameters: { docs: { description: { component: `### Use it when

the page or part of a page is about the weather: what it is now, today, tomorrow. The ground behind it is the weather's own colours (clear and warm, grey cloud, dark blue rain, pale snow, a night sky after dark), drawn in WebGL and moving with the page's light, as a picture's colours are under \`DetailHeader\`.

\`symbol\` is Yr's \`symbol_code\` as it comes (\`clearsky_day\`, \`lightrainshowers_night\`, \`heavysnow\`): the kind of weather and day or night are read from it, and what Yr adds (light, heavy, showers, thunder) does not change the colours. When it changes, the colours go over to the new weather's in one move of 0.7 s, and nothing loops.

### Do not use it when

the page is not about the weather: the ground would say something the page does not. A page of one thing with a picture has \`DetailHeader\`.

### Accessibility

**Handled by the component**

- The backdrop is decoration, hidden from assistive technology; it says nothing the text does not ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content)).
- Every weather's colours keep their lightness in the band a picture's colours do, so the text keeps 4.5:1 with the light's highlight on it in both themes (a test measures every weather) ([1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum)).
- Nothing moves by itself: the backdrop moves only with the pointer or the phone, and not at all under \`prefers-reduced-motion\` ([2.2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide), [2.3.3 Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions)).

**You check**

- The weather is also in words (the temperature and what it is like): the colours are never the only way to know.
- Text on the stage is the full text colour, never \`tone="muted"\`: the ground is tinted.

### Related

\`DetailHeader\`, \`LightSource\`, «Foundations / Light and shadow»` } } },
} satisfies Meta<typeof WeatherStage>
export default meta
type Story = StoryObj<typeof meta>

/** Clear day: warm sun on blue. */
export const Clear: Story = { args: { symbol: "clearsky_day" } }
/** Partly cloudy (the default). */
export const PartlyCloudy: Story = {}
/** Rain: dark blue. Light, heavy and showers read the same. */
export const Rain: Story = { args: { symbol: "heavyrainshowers_day" } }
/** Snow: pale and cold. */
export const Snow: Story = { args: { symbol: "lightsnow" } }
/** Thunder: dark violet with a flash of yellow. */
export const Thunder: Story = { args: { symbol: "rainandthunder" } }
/** Fog: almost no colour. */
export const Fog: Story = { args: { symbol: "fog" } }
/** A clear night: deep blue and violet. */
export const ClearNight: Story = { args: { symbol: "clearsky_night" } }
