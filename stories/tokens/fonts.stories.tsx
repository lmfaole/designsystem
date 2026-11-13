import type { Meta, StoryObj } from "@storybook/react-vite"

import { FontToken } from "../tokens"

/** The two typefaces, shipped with the package (Fontsource). */
const meta = { title: "Tokens/Fonts", tags: ["autodocs"] } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Sans: Story = { render: () => <FontToken token="font-sans" family="Geist Variable" /> }
export const Heading: Story = { render: () => <FontToken token="font-heading" family="JetBrains Mono Variable" /> }
