import type { Meta, StoryObj } from "@storybook/react-vite"

import { Inline } from "../../src/components/layout"
import { LinkButton } from "../../src/components/link-button"

const meta = {
  title: "Navigation/LinkButton",
  component: LinkButton,
  tags: ["autodocs"],
  args: { href: "#", children: "Se alle" },
  parameters: { docs: { description: { component: `### Use it when

an action that goes somewhere: «Åpne på GitHub». \`external\` is the last action on a page.

### Do not use it when

a link that only continues in the same place (\`TextLink\`).

### Accessibility

A real link; an external one is marked with the symbol and «eksternt nettsted» for a screen reader.

### Content

A verb that names the place: «Åpne på GitHub», never «Les mer».

### Related

\`ExternalLink\`, \`TextLink\`, \`Button\`` } }, },
} satisfies Meta<typeof LinkButton>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

/** A link out: marked with the external symbol, read as external, and the LAST action on a page. */
export const External: Story = { args: { href: "https://github.com", external: true, children: "Åpne på GitHub" } }

export const WithIcon: Story = {
  render: () => (
    <Inline gap="md">
      <LinkButton href="#" icon="pull-request" variant="secondary">Pull requests</LinkButton>
      <LinkButton href="https://github.com" external>Åpne på GitHub</LinkButton>
    </Inline>
  ),
}
