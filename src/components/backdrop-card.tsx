import type { ReactNode } from "react"

import { appUrl } from "../lib/base-url"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

/** `blurred` is a wide picture dimmed and blurred into a wash behind roomy content; `sharp` keeps the picture as it is. */
const WASHES = {
  blurred: { card: "relative [--card-spacing:--spacing(6)] sm:[--card-spacing:--spacing(8)]", image: "size-full scale-125 object-cover opacity-30 blur-2xl dark:opacity-25" },
  sharp: { card: "relative", image: "size-full object-cover opacity-30 dark:opacity-25" },
} as const

/** A card with a title and a body and, when there is one, a picture behind them (a franchise's backdrop, a cinema's photo). */
export function BackdropCard({ title, picture, look = "sharp", children }: { title: ReactNode; picture: string | null; look?: keyof typeof WASHES; children: ReactNode }) {
  return (
    <Card className={WASHES[look].card}>
      {picture === null ? null : (
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-[inherit]">
          <img src={appUrl(picture)} alt="" loading="lazy" decoding="async" className={WASHES[look].image} />
        </div>
      )}
      <CardHeader className="relative">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="relative">{children}</CardContent>
    </Card>
  )
}
