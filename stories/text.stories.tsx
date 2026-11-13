import type { Meta, StoryObj } from "@storybook/react-vite"

import { Stack } from "../src/components/layout"
import { Heading, Text, TextLink } from "../src/components/text"

const meta = { title: "Building blocks/Text", component: Text } satisfies Meta<typeof Text>
export default meta
type Story = StoryObj<typeof meta>

export const Headings: Story = {
  name: "Heading looks",
  render: () => (
    <Stack>
      <Heading level={1} look="page">Page — the one look of an h1</Heading>
      <Heading level={2} look="section">Section — a part of the page</Heading>
      <Heading level={3} look="label">Label — small capitals</Heading>
      <Heading level={3} look="item">Item — a thing in a list</Heading>
    </Stack>
  ),
}

export const TextVariants: Story = {
  name: "Text",
  render: () => (
    <Stack gap="sm">
      {(["xs", "sm", "base", "lg"] as const).map((size) => (
        <Text key={size} size={size}>size="{size}" — Blåbærsyltetøy</Text>
      ))}
      <Text tone="muted">tone="muted"</Text>
      <Text tone="destructive">tone="destructive"</Text>
      <Text weight="medium">weight="medium"</Text>
      <Text weight="semibold">weight="semibold"</Text>
      <Text numeric>numeric 1 111 8 888</Text>
      <Stack width="prose"><Text truncate>truncate — one long line that is cut with an ellipsis when there is not room for all of it, however long it goes on</Text></Stack>
      <Text>Running text with <TextLink href="#">an internal link</TextLink> and <TextLink href="https://example.com" external>an external one</TextLink>.</Text>
    </Stack>
  ),
}
