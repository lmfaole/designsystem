import type { Meta, StoryObj } from "@storybook/react-vite"

import { ColorToken } from "../../tokens"

const meta = { title: "Foundations/Tokens/Colours", tags: ["autodocs", "!manifest"], parameters: { docs: { description: { component: `The base colours of \`theme.css\`, light and dark, read live from the page's computed style. The interface is monochrome and the one colour is \`destructive\`.

**Use them** through the components. A page never writes a colour; a new colour is a new role in the guide **Tokens / Overview**, with its pair and its contrast.

**Pairs.** A surface is used only with its own \`-foreground\` (\`primary\` with \`primary-foreground\`). Text needs 4.5:1 and the parts of a control or a mark 3:1.

**Do not** use \`border\` or \`input\` as the only edge of something the reader must find: in light they are 1.3:1 against the page.

### Related

\`StatusLine\`, \`Banner\`, guide «Colour and state»` } } } } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Background: Story = { render: () => <ColorToken name="background" /> }
export const Foreground: Story = { render: () => <ColorToken name="foreground" /> }
export const Card: Story = { render: () => <ColorToken name="card" /> }
export const CardForeground: Story = { render: () => <ColorToken name="card-foreground" /> }
export const Popover: Story = { render: () => <ColorToken name="popover" /> }
export const PopoverForeground: Story = { render: () => <ColorToken name="popover-foreground" /> }
export const Primary: Story = { render: () => <ColorToken name="primary" /> }
export const PrimaryForeground: Story = { render: () => <ColorToken name="primary-foreground" /> }
export const Secondary: Story = { render: () => <ColorToken name="secondary" /> }
export const SecondaryForeground: Story = { render: () => <ColorToken name="secondary-foreground" /> }
export const Muted: Story = { render: () => <ColorToken name="muted" /> }
export const MutedForeground: Story = { render: () => <ColorToken name="muted-foreground" /> }
export const Accent: Story = { render: () => <ColorToken name="accent" /> }
export const AccentForeground: Story = { render: () => <ColorToken name="accent-foreground" /> }
export const Destructive: Story = { render: () => <ColorToken name="destructive" /> }
export const Border: Story = { render: () => <ColorToken name="border" /> }
export const Input: Story = { render: () => <ColorToken name="input" /> }
export const Ring: Story = { render: () => <ColorToken name="ring" /> }
export const LogoPlate: Story = { render: () => <ColorToken name="logo-plate" /> }
