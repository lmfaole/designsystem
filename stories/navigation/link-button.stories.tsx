import type { Meta, StoryObj } from "@storybook/react-vite"

import { Inline } from "../../src/components/layout"
import { LinkButton } from "../../src/components/link-button"

const meta = {
  title: "Navigation/LinkButton",
  component: LinkButton,
  tags: ["autodocs"],
  args: { href: "#", children: "Se alle" },
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
