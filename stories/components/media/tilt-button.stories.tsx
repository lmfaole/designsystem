import type { Meta, StoryObj } from "@storybook/react-vite"

import { Stack } from "../../../src/components/layout"
import { Picture } from "../../../src/components/picture"
import { TiltButton } from "../../../src/components/tilt-button"
import { poster } from "../../sample"

const meta = {
  title: "Components/Media/TiltButton",
  component: TiltButton,
  tags: ["autodocs"],
  parameters: { docs: { description: { component: `### Use it when

a page leads with a lit picture (\`Picture size="hero"\`, \`NowPlayingCard\`) and should let the reader of an iPhone have the light follow how the phone is held. iOS wants the reader to say yes first, in a tap: this is that tap. Put one by the main picture. \`NowPlayingCard\` carries its own.

It shows only on a phone or a tablet that asks first, that has not been answered, and not under \`prefers-reduced-motion\`: on a desktop, or on a phone that needs no asking, it draws nothing, so it can sit on every page with a lit picture. The answer is kept in the browser (\`localStorage\`, key \`ds-light-tilt\`: \`on\` or \`denied\`), so the reader is asked once and not at every visit. Where the app has put the visitor's own choice on \`<html>\` (\`data-tilt="on"\` or \`"off"\`, from \`lib/preferences\`), that choice counts first and the button is not shown: the settings ask instead (\`TiltPreview\`).

### Do not use it when

nothing on the page is lit, or the picture is a row's thumbnail.

### Accessibility

**Handled by the component**

- A real button with its words, reached by keyboard ([2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard)); gone for good after the reader has answered, in either direction.
- Under \`prefers-reduced-motion\` it is not shown and the light does not move ([2.3.3 Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions)).
- Light only moves shadows and reflections: depth, never information.

**You check**

- One per page, by the main picture.

### Content

«La lyset følge telefonen»: change it only for another language.

### Related

\`LightSource\`, \`NowPlayingCard\`, \`Picture\`, «Foundations / Light and shadow»` } }, },
} satisfies Meta<typeof TiltButton>
export default meta
type Story = StoryObj<typeof meta>

/** By the main picture. In a desktop browser (this one) it draws nothing, since there is a pointer to follow; on an iPhone it is the button. */
export const Default: Story = {
  render: () => (
    <Stack gap="sm">
      <Picture ratio="square" size="hero" corners="round" src={poster(40, "A")} />
      <TiltButton />
    </Stack>
  ),
}
