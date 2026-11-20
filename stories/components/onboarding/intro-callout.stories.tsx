import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within } from "storybook/test"

import { IntroCallout } from "../../../src/components/intro-callout"

const meta = {
  title: "Components/Onboarding/IntroCallout",
  component: IntroCallout,
  tags: ["autodocs"],
  args: {
    id: "intro-transport",
    seen: false,
    title: "Avganger nær deg",
    body: "Del posisjonen, så viser vi de nærmeste holdeplassene og når du må gå.",
    icon: "bus",
    cookiePath: "/",
  },
  parameters: { docs: { description: { component: `### Use it when

a reader comes to a page for the first time and needs a word about what it is for or how to start.

### Do not use it when

the page explains itself, the message is about the state of the data (\`Banner\`), or it would stand in a dialog over the page.

### Accessibility

**Handled by the component**

- A section labelled by its title, in the flow of the page and not over it ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- Closed with a real button; focus then moves to the page's heading and is not lost ([2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order))
- Nothing moves, so there is nothing to stop under reduced motion ([2.3.3 Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions))
- Left out on the server once seen, so it never shows and then vanishes ([3.2.1 On Focus](https://www.w3.org/WAI/WCAG22/Understanding/on-focus))

**You check**

- The page has an \`h1\` (or a \`main\`) for focus to go to ([2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order))
- The action's words say where it goes ([2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context))

### Content

A title that says what the page gives, one or two sentences, «Skjønner» to close.

### Related

\`Banner\`, \`EmptyState\`, \`PermissionCard\`` } } },
} satisfies Meta<typeof IntroCallout>
export default meta
type Story = StoryObj<typeof meta>

/** The intro with only the button that closes it. */
export const Default: Story = {}
/** With one action that goes somewhere. */
export const WithAction: Story = { args: { id: "intro-github", icon: "pull-request", title: "Det som venter på deg", body: "Her ser du pull requests og saker på GitHub som venter på svar fra deg.", action: { href: "#", label: "Se hva som venter" } } }
/** Closed: the play test presses «Skjønner» and checks that it is gone. */
export const Dismissed: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("button", { name: "Skjønner" }))
    await expect(canvas.queryByText("Avganger nær deg")).toBeNull()
  },
}
