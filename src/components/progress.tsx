import { meterText, percentOf } from "../lib/progress"
import { Text } from "./text"

/**
 * A value against a goal or a limit: a listening goal, a disk, a backlog read. The label is always visible and so is the value, in words, so the bar
 * never stands alone and colour is not used. With a `target` it is a **bullet**: a mark on the bar where the goal is, and the goal said in words («mål 30»),
 * which is what NN/G prefers to a round gauge. It is read as a meter (`role="meter"` with its value and range). Not for a task that is
 * waiting (`Skeleton`, or text) and not for several parts of a whole (`DonutChart`, `SummaryBar`).
 */
export function Progress({ label, value, max = 100, valueText, target }: { label: string; value: number; max?: number; /** The value in words, as it is shown («93 % full», «12 av 40»). Without it the percentage is shown. */ valueText?: string; /** Where the goal is on the same scale: a mark on the bar, and «mål …» in the words. */ target?: number }) {
  const clamped = Math.min(Math.max(value, 0), max)
  const percent = percentOf(value, max)
  const words = meterText(valueText, value, max, target)
  return (
    <div className="grid gap-1">
      <div className="flex items-baseline justify-between gap-4">
        <Text size="sm">{label}</Text>
        <Text size="sm" tone="muted" numeric>
          {words}
        </Text>
      </div>
      <div role="meter" aria-label={label} aria-valuemin={0} aria-valuemax={max} aria-valuenow={clamped} aria-valuetext={words} className="bg-muted relative h-2 rounded-full">
        <div className="bg-foreground h-full rounded-full" style={{ width: `${percent}%` }} />
        {target === undefined ? null : <div aria-hidden="true" className="bg-foreground ring-background absolute -inset-y-1 w-0.5 rounded-full ring-2" style={{ left: `${percentOf(target, max)}%` }} />}
      </div>
    </div>
  )
}
