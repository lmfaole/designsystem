import { strict as assert } from "node:assert"
import { test } from "node:test"

import { inScope, webManifest, type ManifestInput } from "./manifest.ts"

const icons: ManifestInput["icons"] = [
  { src: "/i/192.png", sizes: "192x192", type: "image/png", purpose: "any" },
  { src: "/i/512.png", sizes: "512x512", type: "image/png", purpose: "any" },
  { src: "/i/m192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
  { src: "/i/m512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
]
const base: ManifestInput = { name: "Startside", shortName: "Start", description: "En startside", id: "/start/", scope: "/start/", startUrl: "/start/", icons, background: "#0a0a0a", theme: "#0a0a0a" }

test("a valid manifest is standalone, Norwegian and dark", () => {
  const manifest = webManifest(base)
  assert.equal(manifest.display, "standalone")
  assert.equal(manifest.lang, "nb")
  assert.equal(manifest.theme_color, "#0a0a0a")
})

test("a scope without a closing slash, a start outside it and a transparent colour are errors", () => {
  assert.throws(() => webManifest({ ...base, scope: "/start" }), /scope must start and end/)
  assert.throws(() => webManifest({ ...base, startUrl: "/annet/" }), /startUrl must be inside scope/)
  assert.throws(() => webManifest({ ...base, theme: "rgba(0,0,0,0.5)" }), /opaque/)
})

test("both kinds of icon are needed, in two sizes", () => {
  assert.throws(() => webManifest({ ...base, icons: icons.filter((icon) => icon.purpose === "any") }), /maskable at 192x192/)
})

test("a scope is a prefix on a whole segment", () => {
  assert.ok(inScope("/start", "/start/"))
  assert.ok(inScope("/start/varsler", "/start/"))
  assert.ok(!inScope("/startfoo", "/start/"))
})
