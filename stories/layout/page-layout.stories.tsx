import type { Meta, StoryObj } from "@storybook/react-vite"

import { PageLayout } from "../../src/components/page-layout"
import { Text } from "../../src/components/text"

const meta = {
  title: "Layout/PageLayout",
  component: PageLayout,
  tags: ["autodocs"],
  args: { children: null },
  parameters: { docs: { description: { component: `### Use it when

the frame of every page: the skip link, the page area (\`main\`) and the reading column. It takes the \`NavBar\` as \`nav\`.

### Do not use it when

inside a page (a page has one frame).

### Accessibility

**Handled by the component**

- A skip link, «Hopp til innholdet», is the first thing to tab to, shown when focused, and jumps to the page area ([2.4.1 Bypass Blocks](https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks), [2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible)).
- The page stands in one \`main\` landmark, after the \`nav\` ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)).
- With \`nav\` or \`foot="bar"\` the page leaves room, so a bar fixed to the foot does not cover its end ([2.4.11 Focus Not Obscured (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum)).
- 16 px gutters on a phone, so nothing scrolls sideways at 320 px ([1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow)).

**You check**

- One \`PageLayout\` per page, so one \`main\` ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)).
- \`foot="bar"\` or \`nav\` whenever something is fixed to the foot of the screen ([2.4.11 Focus Not Obscured (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum)).
- The document has its \`title\` and \`lang="nb"\` ([2.4.2 Page Titled](https://www.w3.org/WAI/WCAG22/Understanding/page-titled), [3.1.1 Language of Page](https://www.w3.org/WAI/WCAG22/Understanding/language-of-page)).

### Related

\`NavBar\`, \`PageHeader\`, \`Breadcrumbs\`` } }, layout: "fullscreen" },
} satisfies Meta<typeof PageLayout>
export default meta
type Story = StoryObj<typeof meta>

/** The frame alone: press Tab once to see the skip link. */
export const Default: Story = { args: { children: <Text>Content of the page.</Text> } }
/** `foot="bar"`: room at the foot, so a bar fixed there does not cover the end of the page. */
export const WithBarFoot: Story = { args: { foot: "bar", children: <Text>Room at the bottom for a fixed bar.</Text> } }

/** The default: one reading column at a readable width, centred. The rest of a wide screen is margin, not more columns. */
export const Reading: Story = { args: { children: <Text>One column, at a width the eye can follow.</Text> } }
/** For pages that are mostly pictures or charts: the whole page area. */
export const Wide: Story = { args: { width: "wide", children: <Text>The whole page area.</Text> } }
