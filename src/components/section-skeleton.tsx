import { Skeleton } from "./ui/skeleton"

/**
 * The place of a section that is on its way, at the height it will have, so nothing below it jumps when it arrives. It is one status for the
 * whole part with a hidden label («Henter pull requests»), not one announcement for each bar. `lines` is how many rows the section will
 * have, about; too few makes the page jump a little, too many leaves a gap.
 */
export function SectionSkeleton({ title, lines = 3 }: { title: string; lines?: number }) {
  return (
    <div role="status" aria-busy="true" className="grid gap-3">
      <span className="sr-only">Henter {title}</span>
      <Skeleton className="h-4 w-40" />
      {Array.from({ length: lines }, (_, index) => (
        <Skeleton key={index} className="h-12 w-full" />
      ))}
    </div>
  )
}
