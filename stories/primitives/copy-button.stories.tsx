import type { Meta, StoryObj } from "@storybook/react-vite"

import { CopyButton } from "../../src/components/copy-button"

const meta = {
  title: "Primitives/CopyButton",
  component: CopyButton,
  tags: ["autodocs"],
  args: { value: "npm run skills" },
  parameters: { docs: { description: { component: `**Use it when** a value is hard to write by hand: an id, a hash, a command, an address.

**Do not use it when** the value is secret (do not put a token on the page), or the page is the only place it is needed.

**Accessibility.** The result is said in words («Kopiert», «Kunne ikke kopiere») in a polite live region; the button always has its text. If the browser refuses, it says so.

**Content.** The label says what is copied when it is not obvious («Kopier kommando»). Show the value next to it, in a \`Code\`.

**Related.** \`Code\`, \`LinkButton\`` } } },
} satisfies Meta<typeof CopyButton>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithLabel: Story = { args: { label: "Kopier kommando" } }
