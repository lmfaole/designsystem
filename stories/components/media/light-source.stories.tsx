import type { Meta, StoryObj } from "@storybook/react-vite"

import { Card, CardContent } from "../../../src/components/ui/card"
import { Inline, Stack } from "../../../src/components/layout"
import { LightSource } from "../../../src/components/light-source"
import { Picture } from "../../../src/components/picture"
import { Text } from "../../../src/components/text"
import { poster } from "../../sample"

const meta = {
  title: "Components/Media/LightSource",
  component: LightSource,
  tags: ["autodocs"],
  parameters: { docs: { description: { component: `### Use it when

a page has something lit: a \`Picture disc\`, a shadow of \`elevation-1\` to \`-3\`. It moves the page's one light (\`--light-x\`, \`--light-y\`, \`lib/light.ts\`) with the pointer and, on a phone, with how it is held, so every reflection and every shadow on the page moves together.

It draws nothing, except on a phone that asks first (iOS wants a tap before it tells how it is held): then one small button, «La lyset følge telefonen». \`NowPlayingCard\` carries its own.

### Do not use it when

nothing on the page is lit: it listens for the pointer and the tilt for as long as it is there.

### Accessibility

**Handled by the component**

- Under \`prefers-reduced-motion\` nothing moves the light: it stays at the upper left ([2.3.3 Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions)).
- The light only moves reflections and shadows, which are depth and never information; text and its contrast do not depend on it.
- The permission button is a real button with its words, reached by keyboard ([2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard)).

**You check**

- Nothing on the page says anything by where a shadow falls or a reflection shines.

### Content

«La lyset følge telefonen»: change it only for another language.

### Related

\`NowPlayingCard\`, \`Picture\` (\`disc\`), «Foundations / Light and shadow»` } }, },
} satisfies Meta<typeof LightSource>
export default meta
type Story = StoryObj<typeof meta>

/** A page with a disc and three heights of shadow: move the pointer over it and every shadow falls away from the light as it moves. */
export const Playground: Story = {
  render: () => (
    <Stack gap="lg">
      <LightSource />
      <Inline gap="lg">
        <Picture ratio="square" size="hero" disc src={poster(10, "A")} />
        {[1, 2, 3].map((level) => (
          <div key={level} className={`elevation-${level} bg-card grid size-24 place-items-center rounded-xl`}>
            <Text size="sm" tone="muted">
              {level}
            </Text>
          </div>
        ))}
      </Inline>
      <Card>
        <CardContent>
          <Text size="sm">The light is at the pointer; on a phone, how it is held.</Text>
        </CardContent>
      </Card>
    </Stack>
  ),
}
