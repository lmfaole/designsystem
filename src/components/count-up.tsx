import type { CSSProperties } from "react"

type CountStyle = CSSProperties & Record<`--${string}`, number>

/**
 * A whole number that counts up when it shows, in CSS alone: a registered integer property (`--count-now`) runs from
 * 0 to the value and a counter prints it, then the real, formatted text takes its place. Without the animation (a
 * reader without CSS animations, or one who asks for less motion) only the formatted text is ever there, and it is
 * in the HTML, so a reader without JavaScript has the number. `format` renders the final text.
 */
export function CountUp({ value, format = String }: { value: number; format?: (value: number) => string }) {
  const style: CountStyle = { "--count": value }
  return (
    <span className="count-up" style={style}>
      <span className="count-up-climb" aria-hidden="true" />
      <span className="count-up-final">{format(value)}</span>
    </span>
  )
}
