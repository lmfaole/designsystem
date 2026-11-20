import type { Meta, StoryObj } from "@storybook/react-vite"

import { Icon } from "../../../src/components/icon"
import { Inline } from "../../../src/components/layout"
import { Button } from "../../../src/components/ui/button"

const meta = {
  title: "Foundations/Icons/Icon",
  component: Icon,
  tags: ["autodocs"],
  args: { name: "pull-request" },
  argTypes: { name: { control: "select" } },
  parameters: { docs: { description: { component: `### Use it when

an icon makes a thing quicker to find or understand: a status beside its words, the kind of a row, a section title, an action.

### Do not use it when

it is decoration without meaning, or it would stand alone for something that needs words (put the words beside it).

### Accessibility

**Handled by the component**

- Decorative by default: \`aria-hidden\` and not focusable ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- With \`label\` it is \`role="img"\` with that name ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- It is drawn in \`currentColor\`, so it follows its text and shows in forced colours ([1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast))

**You check**

- An icon-only button or link gets its \`aria-label\` on the control, not on the icon ([4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value))
- Meaning is never told by an icon's tone alone: words say it too ([1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color))
- An icon that stands alone and carries meaning has a \`label\` and reaches 3:1 against its background ([1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast))

### Content

The words stay; the icon repeats them.

### Related

\`StatusLine\`, \`Badge\`, guides «Icons / Guide» and «Icons / Catalogue»` } }, },
} satisfies Meta<typeof Icon>
export default meta
type Story = StoryObj<typeof meta>

/** Decorative by default: hidden from a screen reader, since the words beside it say the same. */
export const Default: Story = {}

/** The three sizes side by side. */
export const Sizes: Story = {
  render: (args) => (
    <Inline gap="md">
      <Icon {...args} size="sm" />
      <Icon {...args} size="md" />
      <Icon {...args} size="lg" />
    </Inline>
  ),
}

/** The four tones; each still sits beside words that say the same. */
export const Tones: Story = {
  args: { name: "warning" },
  render: (args) => (
    <Inline gap="md">
      <Icon {...args} tone="inherit" />
      <Icon {...args} tone="muted" />
      <Icon {...args} tone="destructive" />
      <Icon {...args} tone="primary" />
    </Inline>
  ),
}

/** Where an icon stands alone and carries the meaning, it gets a `label` for a screen reader. */
export const Labelled: Story = { args: { name: "issue", label: "Issue" } }

/** On a `Button`, `slot` spaces the icon from the text. */
export const OnAButton: Story = {
  render: () => (
    <Inline gap="md">
      <Button variant="outline">
        <Icon name="refresh" slot="start" />
        Oppdater
      </Button>
      <Button variant="outline">
        Åpne
        <Icon name="external" slot="end" />
      </Button>
      <Button variant="outline" size="icon" aria-label="Innstillinger">
        <Icon name="settings" />
      </Button>
    </Inline>
  ),
}
