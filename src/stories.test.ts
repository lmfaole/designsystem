import { strict as assert } from "node:assert"
import { readdirSync, readFileSync } from "node:fs"
import { join, relative } from "node:path"
import { test } from "node:test"

const root = join(import.meta.dirname, "..", "stories")
const files = (directory: string): string[] => readdirSync(directory, { withFileTypes: true }).flatMap((entry) => (entry.isDirectory() ? files(join(directory, entry.name)) : entry.name.endsWith(".stories.tsx") ? [join(directory, entry.name)] : []))
const SECTIONS = ["Use it when", "Do not use it when", "Accessibility", "Related"] as const

test("every component's docs page has the sections of the template, as headings (the table of contents and the manifest read them)", () => {
  const missing: string[] = []
  for (const file of files(root)) {
    const text = readFileSync(file, "utf8")
    const path = relative(root, file)
    // The token pages and the icon catalogue show values, not a component.
    if (path.startsWith("tokens/") || path === "icons/catalogue.stories.tsx" || !/^\s+component: [A-Z]/m.test(text)) continue
    for (const section of SECTIONS) if (!text.includes(`### ${section}\n`)) missing.push(`${path}: ${section}`)
  }
  assert.deepEqual(missing, [], "write the section in the story's docs description (designsystem-components, «Add or change a component»)")
})
