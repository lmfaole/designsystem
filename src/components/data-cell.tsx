import type { ReactNode } from "react"

import { TableCell } from "./ui/table"

const TONES = { default: "", muted: "text-muted-foreground" } as const

/** A cell of a text table in a `Table`: muted or plain, medium or normal, figures of one width, and prose that may wrap onto several lines. */
export function DataCell({ tone = "default", weight = "normal", numeric = false, wrap = false, children }: { tone?: keyof typeof TONES; weight?: "normal" | "medium"; numeric?: boolean; wrap?: boolean; children?: ReactNode }) {
  return <TableCell className={`${TONES[tone]} ${weight === "medium" ? "font-medium" : ""} ${numeric ? "tabular-nums" : ""} ${wrap ? "whitespace-normal" : ""}`}>{children}</TableCell>
}
