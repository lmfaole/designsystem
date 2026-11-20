import type { Meta, StoryObj } from "@storybook/react-vite"

import { LinkButton } from "../../../src/components/link-button"
import { PermissionCard } from "../../../src/components/permission-card"
import { Button } from "../../../src/components/ui/button"

const meta = {
  title: "Components/Onboarding/PermissionCard",
  component: PermissionCard,
  tags: ["autodocs"],
  args: {
    title: "Avganger nær deg",
    body: "Med posisjonen din finner vi de nærmeste holdeplassene. Den brukes bare her og lagres ikke.",
    state: "prompt",
    action: <Button type="button">Del posisjon</Button>,
    fallback: <LinkButton href="#">Velg holdeplass</LinkButton>,
  },
  argTypes: { action: { control: false }, fallback: { control: false } },
  parameters: { docs: { description: { component: `### Use it when

a page needs a permission of the browser (the position, notifications): say what it is for before asking, and what happened after.

### Do not use it when

the permission is not needed for what the page shows, or to ask on load: ask when the reader presses the button.

### Accessibility

**Handled by the component**

- The state is a polite live region, so «Tilgangen er avslått …» is announced when it changes ([4.1.3 Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages))
- The state is told in words with a symbol, never by colour alone ([1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color))
- \`aria-busy\` while the browser is checking or asking

**You check**

- The \`action\` is a real button that asks, and \`fallback\` gives another way to the same ([3.3.2 Labels or Instructions](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions))
- The body says what the permission is used for and that it is not kept

### Content

The use first («Avganger nær deg»), then why («Med posisjonen din …»). \`PERMISSION_TEXT\` has the words of each state. The state comes from \`usePermissionState\` (\`lib/use-permission-state\`) and the app's own asking.

### Related

\`IntroCallout\`, \`Banner\`, \`EmptyState\`` } } },
} satisfies Meta<typeof PermissionCard>
export default meta
type Story = StoryObj<typeof meta>

/** On the server and in the first render, before the browser has answered. */
export const Checking: Story = { args: { state: "checking" } }
/** The browser can be asked: the app's button asks. */
export const Prompt: Story = {}
/** The browser's question is open. */
export const Pending: Story = { args: { state: "pending" } }
/** Given; the page shows what it was for. */
export const Granted: Story = { args: { state: "granted" } }
/** Refused: how to change it in the browser, and the other way. */
export const Denied: Story = { args: { state: "denied" } }
/** The browser has no such thing: only the other way. */
export const Unsupported: Story = { args: { state: "unsupported", unsupportedText: "Nettleseren din kan ikke dele posisjonen." } }
/** Asking failed: try again, or the other way. */
export const Failed: Story = { args: { state: "error", action: <Button type="button">Prøv igjen</Button> } }
/** Notifications, with their own symbol. */
export const Notifications: Story = { args: { icon: "notification", title: "Varsler om forsinkelser", body: "Vi sier fra når toget ditt er forsinket.", action: <Button type="button">Slå på varsler</Button>, fallback: undefined } }
