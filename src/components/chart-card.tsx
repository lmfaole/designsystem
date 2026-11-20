import type { ReactNode } from "react"

import { EMPTY_CHART_MESSAGE } from "../lib/chart-format"
import { CardHeading, Text } from "./text"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"

interface ChartCardProps {
  title: string
  /** A line under the title: what the chart counts, how to read it. */
  description?: string
  /** True when there is nothing to chart: `emptyMessage` shows in place of the chart (a sentence that says why; «Ingen data i denne perioden.» by default). */
  empty?: boolean
  emptyMessage?: string
  /** The title's heading level: `3` under a page's section (`<h2>`), `2` straight under the page's title. */
  level?: 2 | 3 | 4
  children: ReactNode
}

/** A card around one chart: a title, a line under it and the chart, or a sentence when there is nothing to chart. */
export function ChartCard({ title, description, empty = false, emptyMessage = EMPTY_CHART_MESSAGE, level = 3, children }: ChartCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <CardHeading level={level}>{title}</CardHeading>
        </CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>
      <CardContent>{empty ? <Text size="sm" tone="muted">{emptyMessage}</Text> : children}</CardContent>
    </Card>
  )
}
