import type { Meta, StoryObj } from "@storybook/react-vite"

import { ConnectionBanner } from "../../../src/components/connection-banner"

const meta = {
  title: "Components/Status/ConnectionBanner",
  component: ConnectionBanner,
  tags: ["autodocs"],
  args: {},
  parameters: { docs: { description: { component: `### Use it when

an installed or open page should say that the device is offline. One at the top of the page.

### Do not use it when

a source fails (that part shows its own \`ErrorMessage\`), or to disable anything: offline is not an error and the page on screen is the last one fetched.

### Accessibility

**Handled by the component**

- An empty \`role="status"\` region is always on the page, so going offline is announced once, politely ([4.1.3 Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages))
- The notice is a warning \`Banner\`: a symbol and words, not colour alone ([1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color))
- Text colours are theme tokens whose contrast the theme tests, light and dark ([1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum))

**You check**

- One per page, at the top, so the notice is not announced twice ([4.1.3 Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages))
- It does not move focus and pushes the page down when it appears: keep it above what the reader works in ([2.4.11 Focus Not Obscured (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum))
- Nothing on the page depends on it: \`navigator.onLine\` is only a hint

### Content

«Du er frakoblet. Det du ser er fra sist siden ble hentet.» When the device is back, nothing is said: the notice just goes.

### Related

\`Banner\`, \`Freshness\`, guide «Fresh data and offline»` } } },
} satisfies Meta<typeof ConnectionBanner>
export default meta
type Story = StoryObj<typeof meta>

/** Online, as the page usually is: the live region is there and nothing is shown. */
export const Online: Story = {}
