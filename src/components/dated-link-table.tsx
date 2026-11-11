import { ENTITY_LINK } from "../lib/link-style"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"

export interface DatedLink {
  key: string
  /** When it came out, as the page words it. */
  day: string
  href: string
  title: string
  /** Where it is from, under the title. */
  source: string
}

/** A table of links out to other sites, each with its day in front and where it is from under the title. */
export function DatedLinkTable({ rows, dayHead, titleHead }: { rows: readonly DatedLink[]; dayHead: string; titleHead: string }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{dayHead}</TableHead>
          <TableHead>{titleHead}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.key}>
            <TableCell className="whitespace-nowrap text-muted-foreground">{row.day}</TableCell>
            <TableCell className="min-w-0 whitespace-normal [overflow-wrap:anywhere]">
              <a href={row.href} rel="noreferrer" className={ENTITY_LINK}>
                {row.title}
              </a>
              <span className="block text-sm text-muted-foreground">{row.source}</span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
