import type { Meta, StoryObj } from "@storybook/react-vite"

import { FontToken } from "../../tokens"

const meta = { title: "Foundations/Tokens/Fonts", tags: ["autodocs", "!manifest"], parameters: { docs: { description: { component: `The two typefaces, shipped with the package (Fontsource), so a page works without the network.

**Geist** is the body and the interface. **JetBrains Mono** is the headings (\`h1\` to \`h6\` take \`font-heading\`), identifiers and code.

**Use them** through \`Text\`, \`Heading\` and \`Code\`; a page never sets a font. Figures that line up use tabular numbers (\`Text numeric\`).

### Related

\`Text\`, \`Heading\`, \`Code\`` } } } } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Sans: Story = { render: () => <FontToken token="font-sans" family="Geist Variable" /> }
export const Heading: Story = { render: () => <FontToken token="font-heading" family="JetBrains Mono Variable" /> }
