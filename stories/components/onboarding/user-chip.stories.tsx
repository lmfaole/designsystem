import type { Meta, StoryObj } from "@storybook/react-vite"

import { UserChip } from "../../../src/components/user-chip"

const meta = {
  title: "Components/Onboarding/UserChip",
  component: UserChip,
  tags: ["autodocs"],
  args: { user: "octocat", href: "/start/brukernavn" },
  parameters: { docs: { description: { component: `### Use it when

an app shows the data of a username the reader gave: say whose, in the frame of every page, with the way to change it.

### Do not use it when

no name has been given (show the \`UsernameForm\`), or as a sign-in status: there is no account.

### Accessibility

**Handled by the component**

- The name is text and the way to change it a real link, reached from the keyboard ([2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard))
- The link reads «Bytt brukernavn» to a screen reader ([2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context))
- The symbol and the dot between are hidden from assistive technology ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))

**You check**

- It stands in the same place on every page ([3.2.3 Consistent Navigation](https://www.w3.org/WAI/WCAG22/Understanding/consistent-navigation))

### Content

«Viser data for octocat · Bytt».

### Related

\`UsernameForm\`` } } },
} satisfies Meta<typeof UserChip>
export default meta
type Story = StoryObj<typeof meta>

/** Whose data, and the way to change it. */
export const Default: Story = {}
/** A long name wraps rather than overflows. */
export const LongName: Story = { args: { user: "et-svaert-langt-brukernavn-som-ikke-faar-plass-paa-en-linje" } }
