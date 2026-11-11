import type { ReactNode } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"

interface ChartCardProps {
  title: string
  /** A line under the title: what the chart counts, how to read it. */
  description?: string
  /** True when there is nothing to chart: `emptyMessage` shows in place of the chart. */
  empty?: boolean
  emptyMessage?: string
  className?: string
  children: ReactNode
}

/** A card around one chart: a title, a line under it and the chart, or a sentence when there is nothing to chart. */
export function ChartCard({ title, description, empty = false, emptyMessage = "", className, children }: ChartCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>
      <CardContent>{empty ? <p className="text-sm text-muted-foreground">{emptyMessage}</p> : children}</CardContent>
    </Card>
  )
}
