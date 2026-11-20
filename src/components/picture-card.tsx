import type { ReactNode } from "react"

import { CardHeading } from "./text"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

/** A card with a title and a body and, when there is one, a picture behind them. */
export function PictureCard({ title, picture, level = 3, children }: { title: ReactNode; picture: string | null; /** The title's heading level, as in `ChartCard`. */ level?: 2 | 3 | 4; children: ReactNode }) {
  return (
    <Card className="relative">
      {picture === null ? null : (
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-[inherit]">
          <img src={picture} alt="" loading="lazy" decoding="async" className="size-full object-cover opacity-30 dark:opacity-25" />
        </div>
      )}
      <CardHeader className="relative">
        <CardTitle className="text-lg">
          <CardHeading level={level}>{title}</CardHeading>
        </CardTitle>
      </CardHeader>
      <CardContent className="relative">{children}</CardContent>
    </Card>
  )
}
