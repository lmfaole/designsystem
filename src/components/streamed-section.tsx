import { Suspense, type ReactNode } from "react"

import { SectionSkeleton } from "./section-skeleton"

/**
 * A part of a page that arrives on its own while the rest is already shown: the server sends the frame and a skeleton at the part's final
 * height, then the part replaces it. Put one around each source that is slow, so the slowest never holds the page back. A source that can
 * fail returns its failure as a value and shows its own `ErrorMessage` (never a thrown error that takes the page down), and a part that
 * is already on screen stays there while it is renewed. The fallback is never `null`: an empty place makes the page jump.
 */
export function StreamedSection({ title, lines, children }: { title: string; lines?: number; children: ReactNode }) {
  return <Suspense fallback={<SectionSkeleton title={title} {...(lines === undefined ? {} : { lines })} />}>{children}</Suspense>
}
