import { strict as assert } from "node:assert"
import { readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { test } from "node:test"

const components = join(import.meta.dirname, "components")
const source = (name: string): string => readFileSync(join(components, name), "utf8")
const files = readdirSync(components).filter((name) => name.endsWith(".tsx"))

test("the page's main picture is lit, and carries the light's source with it (Foundations / Light and shadow, «Where the light goes»)", () => {
  const picture = source("picture.tsx")
  assert.match(picture, /size === 'hero' && 'lit-frame'/)
  assert.match(picture, /<LightSource \/>/)
})

test("the main picture is lit on its frame, outside the picture: nothing of the light is painted over it, except by the disc", () => {
  const css = readFileSync(join(import.meta.dirname, "light.css"), "utf8")
  const frame = css.match(/\.lit-frame \{([^}]*)\}/)?.[1] ?? ""
  assert.match(frame, /box-shadow/)
  assert.doesNotMatch(frame, /background|::after|::before|mix-blend/)
  const painters = files.filter((name) => /light-sheen/.test(source(name)))
  assert.deepEqual(painters, ["disc.tsx"], "a reflection over a picture is the disc's alone (a source's terms may forbid an overlay)")
})

test("the card of what plays now offers the tilt once, and the answer is kept so a reader is not asked at every visit", () => {
  assert.match(source("now-playing-card.tsx"), /<TiltButton \/>/)
  const input = readFileSync(join(import.meta.dirname, "lib", "light-input.ts"), "utf8")
  assert.match(input, /readTiltPreference/)
  assert.match(input, /writeTiltPreference/)
})

test("the guide says where the light goes", () => {
  const guide = readFileSync(join(import.meta.dirname, "..", "stories", "foundations", "Light-and-shadow.mdx"), "utf8")
  assert.match(guide, /## \d+\. Where the light goes/)
})
