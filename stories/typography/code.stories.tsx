import type { Meta, StoryObj } from "@storybook/react-vite"

import { Code } from "../../src/components/code"

const meta = {
  title: "Typography/Code",
  component: Code,
  tags: ["autodocs"],
  args: { children: "npm run skills" },
  parameters: { docs: { description: { component: `### Use it when

an identifier, a path or a command is in a sentence (\`inline\`), or code stands on lines of its own (\`block\`).

### Do not use it when

it is a quote or a table of values.

### Accessibility

A block scrolls sideways inside its own box and can be reached with the keyboard (\`tabindex=0\`), so nothing is cut off for someone who cannot use a mouse.

### Content

The contents are text, never markup. Do not translate code.

### Related

\`Markdown\` (code in a description), \`CopyButton\` (not yet)` } } },
} satisfies Meta<typeof Code>
export default meta
type Story = StoryObj<typeof meta>

export const Inline: Story = {}
export const Block: Story = { args: { block: true, children: "npm install\nnpm run skills\nnpm run build" } }
export const LongLine: Story = { args: { block: true, children: "git push origin HEAD:main --force-with-lease --set-upstream --tags --no-verify --signoff --verbose" }, decorators: [(Story) => <div className="w-64"><Story /></div>] }
