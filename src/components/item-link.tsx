// A name that has a page of its own, as a link. The link itself is each app's (its routes are typed per app), so the
// shared pages take it as a `SlugLink` and this only gives it the look every list shares.

import type { ReactNode } from 'react'

import { ENTITY_LINK } from '../lib/link-style.ts'

/** The app's own link to a slug of something (an item, a person, a place). */
export type SlugLink = (props: { slug: string; children: ReactNode; className?: string; /** `block`: the link fills its line and is not underlined (it holds a picture and a text). */ look?: "block" }) => ReactNode

export function ItemLink({ as: Link, slug, children }: { as: SlugLink; slug: string; children: string }) {
  return <Link slug={slug} className={ENTITY_LINK}>{children}</Link>
}
