import type { Meta, StoryObj } from "@storybook/react-vite"

import { Code } from "../../../src/components/code"

const meta = {
  title: "Components/Text/Code",
  component: Code,
  tags: ["autodocs"],
  args: { children: "npm run skills" },
  parameters: { docs: { description: { component: `### Use it when

an identifier, a path or a command is in a sentence (\`inline\`), or code stands on lines of its own (\`block\`).

### Do not use it when

it is a quote or a table of values.

### Accessibility

**Handled by the component**

- Inline code is a \`<code>\` element and wraps anywhere, so a long path never widens the page ([1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow))
- A block is \`<pre><code>\` that scrolls sideways inside its own box, not the page ([1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow))
- The block is focusable (\`tabindex=0\`), so its overflow can be scrolled with the arrow keys ([2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard))
- The focused block shows a ring in the \`ring\` token ([2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible))

**You check**

- The text before a block says what it is, since its tab stop has no name of its own ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- Code that is the only way to do something has words around it that explain it ([3.3.2 Labels or Instructions](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions))

### Content

The contents are text, never markup. Do not translate code.

### Related

\`Markdown\` (code in a description), \`CopyButton\` (not yet)` } } },
} satisfies Meta<typeof Code>
export default meta
type Story = StoryObj<typeof meta>

/** Code inside a sentence: an identifier, a path or a command. */
export const Inline: Story = {}
/** Code on lines of its own, kept as written, line breaks included. */
export const Block: Story = { args: { block: true, children: "npm install\nnpm run skills\nnpm run build" } }
/** A line longer than its box scrolls sideways inside the block instead of breaking the page. */
export const LongLine: Story = { args: { block: true, children: "git push origin HEAD:main --force-with-lease --set-upstream --tags --no-verify --signoff --verbose" }, decorators: [(Story) => <div className="w-64"><Story /></div>] }
