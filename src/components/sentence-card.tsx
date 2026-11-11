import type { ReactNode } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

/** A card with one sentence as its title, and what it tells under it. A card's title has no closing full stop, whoever writes it. */
export function SentenceCard({ sentence, children }: { sentence: string; children?: ReactNode }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{sentence.replace(/\.$/, "")}</CardTitle>
      </CardHeader>
      {children ? <CardContent>{children}</CardContent> : null}
    </Card>
  )
}
