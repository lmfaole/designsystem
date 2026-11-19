import { Text } from "./text"

/**
 * A value against a goal: a listening goal, a disk, a backlog read. The label is always visible and so is the value, in words, so the bar
 * never stands alone and colour is not used. It is read as a meter (`role="meter"` with its value and range). Not for a task that is
 * waiting (`Skeleton`, or text) and not for several parts of a whole (`DonutChart`, `SummaryBar`).
 */
export function Progress({ label, value, max = 100, valueText }: { label: string; value: number; max?: number; /** The value in words, as it is shown («93 % full», «12 av 40»). Without it the percentage is shown. */ valueText?: string }) {
  const clamped = Math.min(Math.max(value, 0), max)
  const percent = max <= 0 ? 0 : Math.round((clamped / max) * 100)
  return (
    <div className="grid gap-1">
      <div className="flex items-baseline justify-between gap-4">
        <Text size="sm">{label}</Text>
        <Text size="sm" tone="muted" numeric>
          {valueText ?? `${percent} %`}
        </Text>
      </div>
      <div role="meter" aria-label={label} aria-valuemin={0} aria-valuemax={max} aria-valuenow={clamped} aria-valuetext={valueText ?? `${percent} %`} className="bg-muted h-2 overflow-hidden rounded-full">
        <div className="bg-foreground h-full rounded-full" style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}
