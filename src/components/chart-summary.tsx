import { Text } from "./text"

/** The text that says what a chart shows, under it and visible to everyone: type, range, trend and extremes. `summariseSeries` writes one when nobody has. */
export function ChartSummary({ text }: { text: string }) {
  return (
    <Text size="sm" tone="muted">
      {text}
    </Text>
  )
}
