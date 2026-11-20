import { SPARKLINE_MIN, sparklinePoints } from "../lib/sparkline"

const WIDTH = 96
const HEIGHT = 24

/**
 * The shape of a number over time, word-sized, beside the number itself (Tufte's «sparkline»): a line with its last point marked, scaled to its own
 * range, so it shows how the value moved and the number beside it says how big it is. It is a plain `<svg>` rendered on the server, no script,
 * with the colour of the text. Drawn only for three values or more: with fewer, the number is the better chart. It is read as an image with
 * its `label`; the exact values are wherever the number is explained.
 */
export function Sparkline({ values, label, color }: { values: readonly number[]; label: string; /** The line's colour, as CSS; the text's by default. */ color?: string }) {
  const points = sparklinePoints(values, WIDTH, HEIGHT)
  if (points === null) return null
  const last = points.at(-1)
  return (
    <svg role="img" aria-label={label} viewBox={`0 0 ${WIDTH} ${HEIGHT}`} width={WIDTH} height={HEIGHT} className="inline-block shrink-0 overflow-visible align-middle" fill="none" stroke="currentColor" style={color === undefined ? undefined : { color }} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <polyline points={points.map((point) => `${point.x.toFixed(1)},${point.y.toFixed(1)}`).join(" ")} />
      {last === undefined ? null : <circle cx={last.x} cy={last.y} r={2} fill="currentColor" stroke="none" />}
    </svg>
  )
}

export { SPARKLINE_MIN }
