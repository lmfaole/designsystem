import { strict as assert } from "node:assert"
import { test } from "node:test"

import { DEFAULT_PREFS, PREFS_COOKIE, htmlAttributes, orderSections, parsePrefs, prefsCookieString, serializePrefs } from "./preferences.ts"

test("nothing, or nonsense, is the defaults: the device's theme, effects on, tilt off, every section", () => {
  assert.deepEqual(parsePrefs(undefined), DEFAULT_PREFS)
  assert.deepEqual(parsePrefs(null), DEFAULT_PREFS)
  assert.deepEqual(parsePrefs(""), DEFAULT_PREFS)
  assert.deepEqual(parsePrefs("theme=blue&effects=maybe&tilt=1&x=y"), DEFAULT_PREFS)
  assert.deepEqual(DEFAULT_PREFS, { theme: "system", effects: "on", tilt: "off" })
})

test("what is written is read back the same, encoded for a cookie or not", () => {
  const prefs = { theme: "dark", effects: "off", tilt: "on", sections: ["vaer", "transport", "github"] } as const
  const value = serializePrefs({ ...prefs, sections: [...prefs.sections] })
  assert.equal(value, "theme=dark&effects=off&tilt=on&sections=vaer%2Ctransport%2Cgithub")
  assert.deepEqual(parsePrefs(value), { ...prefs, sections: [...prefs.sections] })
  assert.deepEqual(parsePrefs(encodeURIComponent(value)), { ...prefs, sections: [...prefs.sections] })
  assert.equal(serializePrefs(DEFAULT_PREFS), "theme=system&effects=on&tilt=off")
})

test("sections are trimmed, emptied of blanks and repeats, and an empty list is kept as none", () => {
  assert.deepEqual(parsePrefs("sections= a ,,b,a").sections, ["a", "b"])
  assert.deepEqual(parsePrefs("sections=").sections, [])
  assert.equal(parsePrefs("theme=light").sections, undefined)
  assert.deepEqual(parsePrefs(serializePrefs({ ...DEFAULT_PREFS, sections: [] })).sections, [])
})

test("the cookie is for a year on the base path, lax and secure", () => {
  const cookie = prefsCookieString("theme=dark&tilt=on", "/medier")
  assert.equal(cookie, `${PREFS_COOKIE}=theme%3Ddark%26tilt%3Don; Path=/medier; Max-Age=31536000; SameSite=Lax; Secure`)
  assert.match(prefsCookieString("", ""), /Path=\/;/)
})

test("the html attributes say only what differs from the page's own default, and always the tilt", () => {
  assert.deepEqual(htmlAttributes(DEFAULT_PREFS), { "data-tilt": "off" })
  assert.deepEqual(htmlAttributes({ theme: "light", effects: "off", tilt: "on" }), { "data-theme": "light", "data-effects": "off", "data-tilt": "on" })
  assert.deepEqual(htmlAttributes({ theme: "dark", effects: "on", tilt: "off" }), { "data-theme": "dark", "data-tilt": "off" })
})

test("the order is read and written like the sections, and kept apart from them", () => {
  assert.deepEqual(parsePrefs("order= github ,vaer,,github").order, ["github", "vaer"])
  assert.equal(parsePrefs("sections=a").order, undefined)
  const value = serializePrefs({ ...DEFAULT_PREFS, sections: ["vaer"], order: ["transport", "vaer"] })
  assert.equal(value, "theme=system&effects=on&tilt=off&sections=vaer&order=transport%2Cvaer")
  assert.deepEqual(parsePrefs(value), { ...DEFAULT_PREFS, sections: ["vaer"], order: ["transport", "vaer"] })
})

test("orderSections puts the saved order first, new ids after in their own order, and drops ids that are gone", () => {
  const ids = ["vaer", "transport", "github", "kalender"] as const
  assert.deepEqual(orderSections(ids), [...ids])
  assert.deepEqual(orderSections(ids, []), [...ids])
  assert.deepEqual(orderSections(ids, ["github", "vaer"]), ["github", "vaer", "transport", "kalender"])
  assert.deepEqual(orderSections(ids, ["borte", "kalender", "kalender", "transport", "github", "vaer"]), ["kalender", "transport", "github", "vaer"])
  assert.deepEqual(orderSections(["a"], ["b"]), ["a"])
})
