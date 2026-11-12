/**
 * Closed by default (README rule 8). These tests keep the components from growing open props again, keep `Card` out of
 * components that are not a card, and keep colours in `theme.css`.
 *
 * `ALLOWED` and `CARD_USERS` may only shrink: each entry is a use a consumer still has, and goes when the consumer is migrated.
 */

import { strict as assert } from "node:assert"
import { readFileSync, readdirSync } from "node:fs"
import { join, relative } from "node:path"
import { test } from "node:test"

const src = import.meta.dirname

const files = (directory: string, extension: RegExp): string[] =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) return entry.name === "ui" ? [] : files(path, extension)
    return extension.test(entry.name) ? [path] : []
  })

const components = files(join(src, "components"), /\.tsx$/)
const name = (path: string): string => relative(src, path)

/** Open props that are left, per file, with the reason: the consumer's use that blocks removing them. */
const ALLOWED: Readonly<Record<string, readonly string[]>> = {
  // implemented by the consumer's links (packages/watch/src/links.tsx, packages/shelf/src/links.tsx): the entity look is handed to the app's link
  "components/item-link.tsx": ["className?:"],
}

/** The components that draw a `Card`: a card is one item among its kind, or a frame around a chart. */
const CARD_USERS: readonly string[] = ["components/backdrop-card.tsx", "components/chart-card.tsx", "components/page-links.tsx"]

test("no component has an open className, style or ComponentProps prop beyond ALLOWED", () => {
  const found: Record<string, string[]> = {}
  for (const file of components) {
    const text = readFileSync(file, "utf8")
    const hits = [...new Set(text.match(/\b(?:className|style)\?:|ComponentProps(?:WithoutRef)?<|HTMLAttributes<|\.\.\.props\b/g) ?? [])]
      .toSorted()
    if (hits.length > 0) found[name(file)] = hits
  }
  const expected = Object.fromEntries(Object.entries(ALLOWED).filter(([, hits]) => hits.length > 0))
  assert.deepEqual(found, expected, "a component got an open prop (make it a closed variant), or ALLOWED lists more than is left (lower it)")
})

test("only the listed components draw a Card", () => {
  const users = components
    .filter((file) => /import\s*\{[^}]*\bCard\b[^}]*\}\s*from\s*["']\.\/ui\/card["']/.test(readFileSync(file, "utf8")))
    .map(name)
    .toSorted()
  assert.deepEqual(users, [...CARD_USERS].toSorted(), "a component uses Card without being a card (use PageSection and a list, README rule 8), or CARD_USERS lists more than is left")
})

test("no raw colour outside theme.css", () => {
  const sources = [...files(src, /\.(?:tsx?|css)$/)].filter((file) => !file.endsWith("theme.css") && !file.endsWith(".test.ts"))
  const raw = /#[0-9a-fA-F]{3}(?:[0-9a-fA-F]{3}(?:[0-9a-fA-F]{2})?)?\b|\brgba?\(|\bhsla?\(|\b(?:bg|text|border|fill|stroke)-(?:white|black)\b|\bbackdrop:bg-black\b/
  const found = sources.flatMap((file) =>
    readFileSync(file, "utf8")
      .split("\n")
      .flatMap((line, index) => (raw.test(line) ? [`${name(file)}:${index + 1}: ${line.trim()}`] : [])),
  )
  assert.deepEqual(found, [], "a colour is a token of theme.css (var(--...) or a theme colour class)")
})
