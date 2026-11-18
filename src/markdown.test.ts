/**
 * Markdown is shown by the design system's own forms and safely (README, «Markdown»): the text never sets its own look, raw HTML in
 * it is never inserted, and a link out is marked. These pin the choices that make that so.
 */

import { strict as assert } from "node:assert"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import { test } from "node:test"

const source = readFileSync(join(import.meta.dirname, "components/markdown.tsx"), "utf8")

test("the text's HTML is never inserted: no dangerouslySetInnerHTML, no raw-HTML plugin", () => {
  assert.doesNotMatch(source, /dangerouslySetInnerHTML/)
  assert.doesNotMatch(source, /rehype-raw|rehypeRaw|allowDangerousHtml|skipHtml\s*=\s*\{?\s*false/)
  assert.doesNotMatch(source, /urlTransform\s*=\s*\{\s*\(?\w*\)?\s*=>\s*\w+\s*\}/, "unsafe addresses are dropped by the default transform: do not replace it with the identity")
})

test("raw HTML in the text is dropped (skipHtml), not shown as text and not inserted", () => {
  assert.match(source, /<ReactMarkdown[^>]*\bskipHtml\b/)
})

test("GitHub's Markdown is read (tables, task lists, strike-through, bare links)", () => {
  assert.match(source, /remarkGfm/)
})

test("headings are demoted so they never break the page's outline: the first level is an h3, never an h1 or h2", () => {
  assert.match(source, /h3: \["h3", "h4", "h5", "h6", "h6", "h6"\]/)
  assert.doesNotMatch(source, /<h1|<h2|"h1"|"h2"/)
})

test("a link to another site is an ExternalLink, so it is marked and read as external", () => {
  assert.match(source, /<ExternalLink href=\{href\}>/)
})

test("the text takes no class, style or colour of its own: only the design system's tokens", () => {
  assert.doesNotMatch(source, /(?:className|style)\?:/)
  assert.doesNotMatch(source, /#[0-9a-fA-F]{3,8}\b|\brgba?\(/)
})
