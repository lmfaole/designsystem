import type { ReactNode } from "react"

import { TableCell, TableHead } from "./ui/table"

/** A column of figures in a `Table`: its heading and its cells stand to the right, with digits of one width, so the numbers line up. */
export function NumberHead({ children }: { children: ReactNode }) {
  return <TableHead className="text-right">{children}</TableHead>
}

export function NumberCell({ children }: { children: ReactNode }) {
  return <TableCell className="text-right tabular-nums">{children}</TableCell>
}
