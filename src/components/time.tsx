import { describeTime, type TimeFormat } from "../lib/time"

/**
 * A moment as the reader should see it: «for 3 timer siden» for what is recent, «2. nov. 2026» for what is older, and the exact
 * date and clock in the title and in `datetime`. `now` is passed in, never read in the component, so a page renders the same on
 * the server and in the browser (README, rule on first renders). Show the exact time too wherever «for 3 timer siden» is not enough:
 * use `format="datetime"`.
 */
export function Time({ value, now, format = "auto" }: { value: string; now: Date; format?: TimeFormat }) {
  const time = describeTime(value, now, format)
  if (time === null) return <span>{value}</span>
  return (
    <time dateTime={time.iso} title={time.exact}>
      {time.text}
    </time>
  )
}
