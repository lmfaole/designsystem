import type { Meta, StoryObj } from "@storybook/react-vite"

import { Heading, Text } from "../src/components/text"

import { Grid, Inline, PageColumn, Split, Stack } from "../src/components/layout"

const Box = ({ children = "Box" }: { children?: string }) => <div className="rounded-md border bg-muted px-3 py-2 text-sm">{children}</div>
const boxes = (n: number) => Array.from({ length: n }, (_, i) => <Box key={i}>{`Box ${i + 1}`}</Box>)

const GAPS = ["none", "xs", "sm", "md", "lg", "xl"] as const

const meta = { title: "Building blocks/Layout", parameters: { layout: "padded" } } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const StackGaps: Story = {
  name: "Stack",
  render: () => (
    <Inline gap="xl" align="center">
      {GAPS.map((gap) => (
        <Stack key={gap} gap="sm">
          <Text size="xs" tone="muted">gap="{gap}"</Text>
          <Stack gap={gap}>{boxes(3)}</Stack>
        </Stack>
      ))}
    </Inline>
  ),
}

export const InlineAlign: Story = {
  name: "Inline",
  render: () => (
    <Stack gap="lg">
      <Inline gap="md">{boxes(3)}</Inline>
      <Inline gap="md" justify="between">{boxes(2)}</Inline>
      <Inline gap="md" align="baseline">
        <Heading level={2} look="section">Baseline</Heading>
        <Text size="sm" tone="muted">aligned on the text, not the box</Text>
      </Inline>
    </Stack>
  ),
}

export const GridColumns: Story = {
  name: "Grid",
  render: () => (
    <Stack gap="xl">
      {([1, 2, 3, 4, "tiles", "cards", "sections", "charts"] as const).map((columns) => (
        <Stack key={columns} gap="sm">
          <Text size="xs" tone="muted">columns={`{${JSON.stringify(columns)}}`}</Text>
          <Grid columns={columns}>{boxes(6)}</Grid>
        </Stack>
      ))}
    </Stack>
  ),
}

export const SplitWithRail: Story = {
  name: "Split",
  render: () => (
    <Split rail={<Stack gap="sm"><Heading level={2} look="label">Facts</Heading><Text size="sm">Sticky rail on wide screens.</Text></Stack>}>
      <Stack>{boxes(8)}</Stack>
    </Split>
  ),
}

export const Column: Story = {
  name: "PageColumn",
  render: () => <PageColumn>{boxes(3)}</PageColumn>,
}

