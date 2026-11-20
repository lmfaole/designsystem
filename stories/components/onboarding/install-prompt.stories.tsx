import type { Meta, StoryObj } from "@storybook/react-vite"

import { InstallPrompt } from "../../../src/components/install-prompt"

const meta = {
  title: "Components/Onboarding/InstallPrompt",
  component: InstallPrompt,
  tags: ["autodocs"],
  args: { appName: "Startside", seen: false, cookiePath: "/", preview: "install" },
  parameters: { docs: { description: { component: `### Use it when

an app can be installed (it has a manifest; see «Installed apps (PWA)»): offer it once, on the front page.

### Do not use it when

on any page but the front page, in a dialog, or again after «Ikke nå». The stories use \`preview\`; an app never does.

### Accessibility

**Handled by the component**

- A section labelled by its title, in the flow of the page ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- Real buttons, reached from the keyboard; «Installer» opens the browser's own dialog ([2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard))
- Shown only where it can be used, after load, and never again once answered ([3.2.1 On Focus](https://www.w3.org/WAI/WCAG22/Understanding/on-focus))

**You check**

- It stands below the first section of the page, so it does not push the content down ([3.2.3 Consistent Navigation](https://www.w3.org/WAI/WCAG22/Understanding/consistent-navigation))

### Content

«Installer Startside», «Installer», «Ikke nå»; on an iPhone «Trykk Del og så Legg til på Hjem-skjerm».

### Related

\`IntroCallout\`` } } },
} satisfies Meta<typeof InstallPrompt>
export default meta
type Story = StoryObj<typeof meta>

/** A browser that can install the app (Chromium). */
export const Install: Story = {}
/** Safari on an iPhone or iPad: the way to do it by hand. */
export const Ios: Story = { args: { preview: "ios" } }
