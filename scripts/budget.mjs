#!/usr/bin/env node
// What each built page sends on a first visit, against a budget, with SWDM v4's estimate of its emissions per view.
//
//   npx designsystem-budget <dist> [--total=500] [--js=150] [--css=50] [--font=100] [--image=…]   (kilobytes)
//
// A page is its HTML, the stylesheets and scripts it links (gzip, as a server sends them), the font files of the `latin` subset its
// stylesheets name (what a page in Norwegian loads; woff2 is already compressed) and the pictures it holds from its own folder. Pictures
// from other hosts are counted, not weighed: say how many. It fails when a page is over its budget (guide «Performance and sustainability»).

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs"
import { join, relative, resolve } from "node:path"
import { gzipSync } from "node:zlib"

import { DEFAULT_BUDGET, gramsFor, overBudget, ratingOf, weigh } from "./page-weight.mjs"

const args = process.argv.slice(2)
const dist = resolve(args.find((arg) => !arg.startsWith("--")) ?? "dist")
const budget = { ...DEFAULT_BUDGET }
for (const arg of args) {
  const match = /^--(total|js|css|font|image)=(\d+(?:\.\d+)?)$/.exec(arg)
  if (match) budget[match[1]] = Number(match[2])
}
if (!existsSync(dist)) {
  console.error(`No build at ${dist}: build the site first.`)
  process.exit(2)
}

const files = (directory) => readdirSync(directory).flatMap((name) => {
  const path = join(directory, name)
  return statSync(path).isDirectory() ? files(path) : [path]
})
const all = files(dist)
const pages = all.filter((path) => path.endsWith(".html"))
const gzipped = (path) => gzipSync(readFileSync(path)).length

/** The file an address in the page means: its path inside the build, whatever base path the site is served under. */
function local(address) {
  if (/^(https?:)?\/\//.test(address) || address.startsWith("data:")) return null
  const clean = address.split(/[?#]/)[0]
  const parts = clean.split("/").filter(Boolean)
  for (let start = 0; start < parts.length; start++) {
    const path = join(dist, ...parts.slice(start))
    if (existsSync(path) && statSync(path).isFile()) return path
  }
  return null
}
const attributes = (html, tag, attribute) => [...html.matchAll(new RegExp(`<${tag}\\b[^>]*\\b${attribute}="([^"]+)"[^>]*>`, "g"))].map((match) => ({ tag: match[0], value: match[1] }))

let failed = false
const rows = []
for (const page of pages.sort()) {
  const html = readFileSync(page, "utf8")
  const parts = [{ kind: "html", bytes: gzipped(page) }]
  const seen = new Set()
  const add = (kind, path, bytes) => {
    if (path === null || seen.has(path)) return
    seen.add(path)
    parts.push({ kind, bytes: bytes(path) })
  }
  for (const { tag, value } of attributes(html, "link", "href")) {
    if (/rel="stylesheet"/.test(tag)) {
      const css = local(value)
      add("css", css, gzipped)
      if (css !== null) {
        // Fontsource names its files <family>-<subset>-…: only `latin` (not latin-ext) is what a page in Norwegian loads.
        for (const font of readFileSync(css, "utf8").matchAll(/url\(["']?([^)"']+\.woff2)["']?\)/g)) {
          if (/-latin-[^/]*normal[^/]*\.woff2$/.test(font[1]) && !/-latin-ext-/.test(font[1])) add("font", local(font[1]), (path) => statSync(path).size)
        }
      }
    }
    if (/rel="modulepreload"/.test(tag)) add("js", local(value), gzipped)
  }
  for (const { value } of attributes(html, "script", "src")) add("js", local(value), gzipped)
  let external = 0
  for (const { value } of attributes(html, "img", "src")) {
    const path = local(value)
    if (path === null) external += 1
    else add("image", path, (file) => statSync(file).size)
  }
  const weight = weigh(parts)
  const grams = gramsFor(weight.total)
  const over = overBudget(weight, budget)
  if (over.length > 0) failed = true
  rows.push({ page: relative(dist, page), kb: (weight.total / 1024).toFixed(1), grams: grams.toFixed(3), rating: ratingOf(grams), external, over })
}

const width = Math.max(...rows.map((row) => row.page.length), 4)
console.log(`${"Page".padEnd(width)}  ${"KB".padStart(7)}  ${"g CO2e".padStart(7)}  Rating  Pictures from other hosts`)
for (const row of rows) console.log(`${row.page.padEnd(width)}  ${row.kb.padStart(7)}  ${row.grams.padStart(7)}  ${row.rating.padEnd(6)}  ${row.external}${row.over.length > 0 ? `  OVER: ${row.over.join("; ")}` : ""}`)
console.log(`\n${pages.length} pages. Budget: ${Object.entries(budget).map(([kind, kb]) => `${kind} ${kb} KB`).join(", ")}. Emissions: Sustainable Web Design Model v4, first visit, global grid.`)
if (failed) process.exit(1)
