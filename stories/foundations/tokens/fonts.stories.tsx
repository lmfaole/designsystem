import type { Meta, StoryObj } from "@storybook/react-vite"

import { FontToken } from "../../tokens"

const meta = { title: "Foundations/Tokens/Fonts", tags: ["autodocs", "!manifest"], parameters: { docs: { description: { component: `The two typefaces, shipped with the package (Fontsource), so a page works without the network.

One superfamily, **Atkinson Hyperlegible** (Braille Institute): letters that look alike are told apart (I, l, 1; O, 0). **Next** is all text and every heading (\`font-heading\` is \`font-sans\`); **Mono** is short uppercase labels, code and technical values. They share x-height, capitals and figures.

**Use them** through \`Text\`, \`Heading\` and \`Code\`; a page never sets a font. Figures that line up use tabular numbers (\`Text numeric\`).

### Related

\`Text\`, \`Heading\`, \`Code\`` } } } } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

/** All text and every heading. */
export const Sans: Story = { render: () => <FontToken token="font-sans" family="Atkinson Hyperlegible Next Variable" /> }
/** Short uppercase labels, code and technical values. */
export const Mono: Story = { render: () => <FontToken token="font-mono" family="Atkinson Hyperlegible Mono Variable" /> }
