import { Text } from "./text"

/**
 * What a chart shows when it has nothing to draw: a sentence that says why, in the place the chart would have, at its height, so the page does
 * not jump when data arrives. No axes and no empty frame are drawn.
 */
export function ChartEmpty({ height, message }: { height: number; message: string }) {
  return (
    <div className="flex items-center" style={{ minHeight: height }}>
      <Text size="sm" tone="muted">
        {message}
      </Text>
    </div>
  )
}
