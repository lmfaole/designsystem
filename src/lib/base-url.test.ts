import { strict as assert } from "node:assert"
import { test } from "node:test"

import { appUrl } from "./base-url.ts"

test("a path of the app goes under its base, whichever way the slashes were written", () => {
  assert.equal(appUrl("/covers/a.jpg", "/music/"), "/music/covers/a.jpg")
  assert.equal(appUrl("covers/a.jpg", "/music"), "/music/covers/a.jpg")
  assert.equal(appUrl("/api/x.json?a=1", "/music/"), "/music/api/x.json?a=1")
})

test("at the root, a path is left as it is", () => {
  assert.equal(appUrl("/covers/a.jpg", "/"), "/covers/a.jpg")
})

test("an address that is not a path of the app is left alone", () => {
  assert.equal(appUrl("https://example.com/a.jpg", "/music/"), "https://example.com/a.jpg")
  assert.equal(appUrl("//cdn.example.com/a.jpg", "/music/"), "//cdn.example.com/a.jpg")
})
