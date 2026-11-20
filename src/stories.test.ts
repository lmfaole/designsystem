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
    if (path.startsWith("foundations/tokens/") || path === "foundations/icons/catalogue.stories.tsx" || !/^\s+component: [A-Z]/m.test(text)) continue
    for (const section of SECTIONS) if (!text.includes(`### ${section}\n`)) missing.push(`${path}: ${section}`)
  }
  assert.deepEqual(missing, [], "write the section in the story's docs description (designsystem-components, «Add or change a component»)")
})

// Storybook's id of a title (`Components/Lists/Rows` → `components-lists-rows`), as in the address of its docs page.
const idOf = (title: string) =>
  title
    .toLowerCase()
    .replace(/[ ’–—―′¿'`~!@#$%^&*()_|+\-=?;:",.<>{}[\]\\/]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")

type Order = readonly (string | Order)[]
const placed = (order: Order, prefix = ""): string[] => {
  const out: string[] = []
  let last = ""
  for (const item of order) {
    if (typeof item === "string") out.push((last = prefix + item))
    else out.push(...placed(item, `${last}/`))
  }
  return out
}

const everything = (directory: string): string[] =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? everything(join(directory, entry.name)) : /\.(stories\.tsx|mdx)$/.test(entry.name) ? [join(directory, entry.name)] : [],
  )
const titles = everything(root).map((file) => {
  const match = /title: "([^"]+)"|<Meta title="([^"]+)"/.exec(readFileSync(file, "utf8"))
  return { file: relative(root, file), title: match?.[1] ?? match?.[2] ?? "" }
})
const preview = readFileSync(join(root, "..", ".storybook", "preview.tsx"), "utf8")
const order = JSON.parse(/storySort: \{ order: (\[.*\]) \}/.exec(preview)?.[1] ?? "[]") as Order

test("every story and guide has a place in the sidebar's order, and its file stands in the folder of its title", () => {
  const places = new Set(placed(order))
  assert.deepEqual(titles.filter(({ title }) => !places.has(title)).map(({ title }) => title), [], "place the title in storySort in .storybook/preview.tsx")
  const astray = titles.filter(({ file, title }) => file.includes("/") && file.split("/")[0] !== idOf(title.split("/")[0] ?? "")).map(({ file }) => file)
  assert.deepEqual(astray, [], "a file goes in the folder of its root (stories/components/… for Components/…)")
})

test("the components overview links every component, and every link between docs pages reaches one", () => {
  const ids = new Set(titles.map(({ title }) => idOf(title)))
  const overview = readFileSync(join(root, "components", "Overview.mdx"), "utf8")
  const components = titles.filter(({ title }) => title.startsWith("Components/") && title !== "Components/Overview")
  assert.deepEqual(components.filter(({ title }) => !overview.includes(`(?path=/docs/${idOf(title)}--docs)`)).map(({ title }) => title), [], "add it to stories/components/Overview.mdx")
  const broken = everything(root).flatMap((file) => [...readFileSync(file, "utf8").matchAll(/\(\?path=\/docs\/([a-z0-9-]+)--docs\)/g)].map((m) => m[1] ?? "").filter((id) => !ids.has(id)))
  assert.deepEqual(broken, [])
})
