import type { ReactNode } from "react"

import { appUrl } from "../lib/base-url"

/**
 * The head of a review: the pictures of what led the period as a strip of the whole width, so tall that it is the screen's first view,
 * dimmed from below so the sentence over them reads. Without a picture a lit surface. The sentence says what changed; `children` is the small print.
 */
export function ReviewHero({ images, kicker, sentence, children }: { images: readonly string[]; kicker: string; sentence: string; children?: ReactNode }) {
  const shown = images.slice(0, 6)
  return (
    <section className="relative isolate grid min-h-[26rem] overflow-hidden rounded-3xl border border-border bg-card shadow-[0_30px_120px_-40px_var(--primary)] sm:min-h-[34rem] [grid-template-areas:'stack'] *:[grid-area:stack]">
      {shown.length === 0 ? null : (
        <ul aria-hidden="true" className="grid auto-cols-fr grid-flow-col">
          {shown.map((image) => (
            <li key={image} className="min-w-0">
              <img src={appUrl(image)} alt="" decoding="async" className="size-full object-cover" />
            </li>
          ))}
        </ul>
      )}
      <div className="bg-gradient-to-t from-background via-background/60 to-background/0" />
      <div className="relative grid content-end gap-3 p-6 sm:gap-4 sm:p-12">
        <p className="text-xs font-medium tracking-[0.3em] text-primary uppercase">{kicker}</p>
        <p className="max-w-4xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl">{sentence}</p>
        {children}
      </div>
    </section>
  )
}
