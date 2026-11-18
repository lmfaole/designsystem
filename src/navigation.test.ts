/**
 * The rules for pages and navigation (README, «Pages and navigation»): a link out is always marked, the way between pages
 * says where you are, and a section that shows only the first of a list can link to all of it. These pin the parts that can
 * be pinned, so a later change cannot quietly bring back an unmarked external link or a tab that does not say it is current.
 */

import { strict as assert } from "node:assert"
import { readFileSync, readdirSync } from "node:fs"
import { join } from "node:path"
import { test } from "node:test"

const read = (path: string): string => readFileSync(join(import.meta.dirname, path), "utf8")

test("a link out to another site is marked with the external symbol and read as external, wherever it is", () => {
  for (const file of ["components/external-link.tsx", "components/link-button.tsx"]) {
    const source = read(file)
    assert.match(source, /name="external"/, `${file}: marks the link with the external symbol`)
    assert.match(source, /sr-only/, `${file}: tells a screen reader that it leaves`)
    assert.match(source, /noopener noreferrer/, `${file}: opens without handing the new page window.opener`)
  }
})

test("the navigation says which place you are in, and is a bar at the foot on a phone and a rail at the left from tablet width, not tabs", () => {
  const nav = read("components/nav-bar.tsx")
  assert.match(nav, /"aria-current": "page"/)
  assert.match(nav, /fixed inset-x-0 bottom-0/, "a bar at the foot of the screen on a phone")
  assert.match(nav, /md:inset-y-0 md:left-0/, "a rail down the left side from tablet width")
  assert.doesNotMatch(nav, /role="tab(?:list)?"/, "navigation goes to other pages; tabs switch views of one page")
  assert.match(read("components/page-layout.tsx"), /nav\?: ReactNode/, "PageLayout leaves room for it")
})

test("there is no tabs component: tabs switch views of the same content, and the design system does not hide content in tabs", () => {
  assert.equal(readdirSync(join(import.meta.dirname, "components")).some((file) => /tabs/.test(file)), false)
})

test("a section, a group and a subsection can link to the page with all of it", () => {
  const section = read("components/page-section.tsx")
  assert.match(section, /export interface More\b/)
  for (const name of ["PageSection", "SubSection", "SectionGroup"]) {
    assert.match(section, new RegExp(`export function ${name}\\([^)]*more\\??: More`), `${name} takes \`more\``)
  }
})

test("the breadcrumbs, the list of subpages and the counts are links, not buttons: they go somewhere", () => {
  for (const file of ["components/breadcrumbs.tsx", "components/sub-pages.tsx", "components/summary-bar.tsx"]) assert.match(read(file), /<a\s+href=/, file)
  assert.doesNotMatch(read("components/summary-bar.tsx"), /onClick|<button/)
})

test("the breadcrumbs are a labelled nav with an ordered list, the current page marked and not a link, and only the parent on a phone", () => {
  const crumbs = read("components/breadcrumbs.tsx")
  assert.match(crumbs, /<nav aria-label="Brødsmuler"/)
  assert.match(crumbs, /<ol\b/)
  assert.match(crumbs, /aria-current="page"/)
  assert.match(crumbs, /md:hidden/, "the parent alone, as a way back, on a phone")
  assert.match(crumbs, /hidden[^"]*md:flex/, "the whole trail from tablet width")
  assert.match(crumbs, /items\.length < 2\) return null/, "a page with no parent has none")
})

test("subpages are a list in ONE column, never a grid of cards or buttons", () => {
  const list = read("components/sub-pages.tsx")
  assert.match(list, /<ul className="grid gap-1">/)
  assert.doesNotMatch(list, /grid-cols-\[repeat|columns-\d|Card\b/)
})

test("the components this replaced are gone: no BackLink (the breadcrumbs are the way back) and no NavCards (SubPages is the list of pages)", () => {
  const files = readdirSync(join(import.meta.dirname, "components"))
  assert.equal(files.includes("back-link.tsx"), false)
  assert.equal(files.includes("nav-cards.tsx"), false)
})
