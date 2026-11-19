import { Icon } from "./icon"
import { TableHead } from "./ui/table"

/**
 * A column header that sorts the table: a real link to the same page sorted by this column (`href` carries the direction to go to
 * next), and `aria-sort` on the cell tells a screen reader which column is sorted and which way. The sorted column shows its direction
 * with a symbol. Sort links, not script: the sorted page has an address and works without JavaScript.
 */
export function SortHeader({ label, href, direction = "none" }: { label: string; href: string; direction?: "ascending" | "descending" | "none" }) {
  return (
    <TableHead aria-sort={direction}>
      <a href={href} className="focus-visible:ring-ring inline-flex min-h-6 items-center gap-1 rounded-md hover:underline focus-visible:ring-2 focus-visible:outline-none">
        {label}
        {direction === "none" ? null : (
          <span aria-hidden="true" className={direction === "ascending" ? "rotate-180" : undefined}>
            <Icon name="chevron-down" size="sm" />
          </span>
        )}
      </a>
    </TableHead>
  )
}
