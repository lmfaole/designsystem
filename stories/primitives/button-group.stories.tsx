import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "../../src/components/ui/button"
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from "../../src/components/ui/button-group"

const meta = {
  title: "Primitives/ButtonGroup",
  component: ButtonGroup,
  tags: ["autodocs"],
  subcomponents: { ButtonGroupText, ButtonGroupSeparator },
  args: { children: [<Button key="a" variant="outline">Dag</Button>, <Button key="b" variant="outline">Uke</Button>, <Button key="c" variant="outline">Måned</Button>] },
  parameters: { docs: { description: { component: `### Use it when

a few related buttons stand together, such as the options of \`SegmentedToggle\`.

### Do not use it when

unrelated actions, or navigation.

### Accessibility

**Handled by the component**

- The wrapper has \`role="group"\`, so the buttons are announced as belonging together ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- Buttons stay in source order, so Tab moves through them as they are seen ([2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order))
- A focused button is raised above its neighbours, so its ring is never covered ([2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible))
- \`ButtonGroupSeparator\` is decorative and hidden from assistive technology ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))

**You check**

- Give the group an \`aria-label\` when its purpose is not clear from the text around it ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- Each button keeps its own text, or an \`aria-label\` when it shows only an icon ([4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value))
- A group that chooses one option marks the chosen one (\`aria-pressed\`), as \`SegmentedToggle\` does ([4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value))

### Content

Short verbs.

### Related

\`Button\`, \`SegmentedToggle\`` } }, },
} satisfies Meta<typeof ButtonGroup>
export default meta
type Story = StoryObj<typeof meta>

/** Buttons side by side, their inner corners and borders joined. */
export const Horizontal: Story = {}
/** A text label and a separator in front of the buttons. */
export const WithText: Story = { render: () => <ButtonGroup><ButtonGroupText>Sorter</ButtonGroupText><ButtonGroupSeparator /><Button variant="outline">Navn</Button></ButtonGroup> }
/** The buttons stacked, joined top to bottom. */
export const Vertical: Story = { args: { orientation: "vertical" }, decorators: [(Story) => <div className="w-fit"><Story /></div>] }
