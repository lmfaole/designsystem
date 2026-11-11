import type { ReactNode } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

interface StatCardProps {
  label: string
  /** The headline number. A plain string for most cards; a `ReactNode` when it needs its own color, e.g. an income/expense tint. */
  value: ReactNode
  detail?: string
}

/** One headline number in a `Card`, e.g. "Total listens: 12,480" or "Net pay this month: 45 000 kr". Purely presentational. */
export function StatCard({ label, value, detail }: StatCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm text-muted-foreground">{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-semibold tracking-tight">{value}</p>
        {detail ? <p className="mt-1 text-sm text-muted-foreground">{detail}</p> : null}
      </CardContent>
    </Card>
  )
}
