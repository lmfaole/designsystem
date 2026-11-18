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

test("the back link and the counts are links, not buttons: they go somewhere", () => {
  for (const file of ["components/back-link.tsx", "components/summary-bar.tsx"]) assert.match(read(file), /<a href=/, file)
  assert.doesNotMatch(read("components/summary-bar.tsx"), /onClick|<button/)
})
