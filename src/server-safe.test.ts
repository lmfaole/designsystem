import { strict as assert } from "node:assert"
import { readFileSync, readdirSync } from "node:fs"
import { join } from "node:path"
import { test } from "node:test"

const dir = join(import.meta.dirname, "components")
const files = readdirSync(dir).filter((name) => name.endsWith(".tsx"))

test("a component that uses a hook or a handler is a client component: it starts with \"use client\"", () => {
  const wrong = files.filter((name) => {
    const source = readFileSync(join(dir, name), "utf8")
    const needsClient = /\buse(State|Effect|LayoutEffect|Ref|Virtualizer|WindowVirtualizer|SyncExternalStore|Reducer)\b|\bon(Click|Change|Input|Submit)=/.test(source)
    return needsClient && !/^\s*"use client"/.test(source)
  })
  assert.deepEqual(wrong, [], "add \"use client\" at the top, or the component fails in a server component (Next.js) and is not hydrated as intended")
})

test("no component reads the clock or a random number in its render: the first render is the same on the server and in the browser", () => {
  const found = files.filter((name) => /Date\.now\(|Math\.random\(|new Date\(\)/.test(readFileSync(join(dir, name), "utf8")))
  // The clock is read in an effect, after the first render, by the two components that follow the device (their first render uses what is passed in).
  assert.deepEqual(found.filter((name) => !["freshness.tsx"].includes(name)), [], "pass the time in (`now`), as `Time` does")
})

test("numbers and dates are formatted with a named locale: no `toLocaleString()` without one, no `Intl` formatter without one", () => {
  const found = files.filter((name) => /\.toLocale(?:Date|Time)?String\(\s*\)|new Intl\.\w+\(\s*\)/.test(readFileSync(join(dir, name), "utf8")))
  assert.deepEqual(found, [], "say `nb-NO` (and `Europe/Oslo` for a time): the runtime's default differs between the server and the browser")
})
