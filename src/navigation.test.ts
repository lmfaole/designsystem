/**
 * The rules for pages and navigation (README, «Pages and navigation»): a link out is always marked, the way between pages
 * says where you are, and a section that shows only the first of a list can link to all of it. These pin the parts that can
 * be pinned, so a later change cannot quietly bring back an unmarked external link or a tab that does not say it is current.
 */

import { strict as assert } from "node:assert"
import { readFileSync } from "node:fs"
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

test("the tabs say which page you are on", () => {
  assert.match(read("components/page-tabs.tsx"), /"aria-current": "page"/)
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
