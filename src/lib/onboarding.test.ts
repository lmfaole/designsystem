import { strict as assert } from "node:assert"
import { test } from "node:test"

import { SEEN_COOKIE, addSeen, isNew, isSeen, parseSeen, seenCookieString } from "./onboarding.ts"

test("the cookie is read as ids and versions, and garbled parts are ignored", () => {
  const seen = parseSeen("intro-transport@1, new-historikk@2,,install,@3,Bad@1,x@0,y@abc,install@1")
  assert.deepEqual([...seen], [["intro-transport", 1], ["new-historikk", 2], ["install", 1]])
  assert.equal(parseSeen(undefined).size, 0)
  assert.equal(parseSeen(null).size, 0)
  assert.equal(parseSeen("").size, 0)
})

test("a URL-encoded value is read as well, and a broken encoding is nothing", () => {
  assert.deepEqual([...parseSeen("intro%401%2Cinstall%402")], [["intro", 1], ["install", 2]])
  assert.equal(parseSeen("%E0%A4%A").size, 0)
})

test("an id is seen at its version or an earlier one, not a later one", () => {
  const seen = parseSeen("intro@2")
  assert.equal(isSeen(seen, "intro"), true)
  assert.equal(isSeen(seen, "intro", 2), true)
  assert.equal(isSeen(seen, "intro", 3), false)
  assert.equal(isSeen(seen, "other"), false)
})

test("adding moves the id to the newest place once, and never lowers its version", () => {
  assert.equal(addSeen(undefined, "intro"), "intro@1")
  assert.equal(addSeen("intro@1,install@1", "intro", 2), "install@1,intro@2")
  assert.equal(addSeen("intro@3", "intro", 1), "intro@3")
  assert.equal(addSeen("intro@1", "Not valid", 1), "intro@1")
  assert.equal(addSeen("intro@1", "intro", 0), "intro@1")
})

test("the oldest entries go past 60 entries or 1500 characters", () => {
  let value = ""
  for (let index = 0; index < 70; index++) value = addSeen(value, `intro-${index}`)
  const seen = parseSeen(value)
  assert.equal(seen.size, 60)
  assert.equal(isSeen(seen, "intro-9"), false)
  assert.equal(isSeen(seen, "intro-10"), true)
  assert.equal(isSeen(seen, "intro-69"), true)

  let long = ""
  for (let index = 0; index < 40; index++) long = addSeen(long, `${"a".repeat(60)}-${index}`)
  assert.ok(long.length <= 1500)
  assert.equal(isSeen(parseSeen(long), `${"a".repeat(60)}-39`), true)
})

test("the cookie string is encoded, under the app's path, for a year", () => {
  assert.equal(seenCookieString("intro@1,install@1", "/start"), `${SEEN_COOKIE}=intro%401%2Cinstall%401; path=/start; max-age=31536000; samesite=lax; secure`)
  assert.deepEqual([...parseSeen(decodeURIComponent("intro%401%2Cinstall%401"))], [["intro", 1], ["install", 1]])
})

test("something is new until its time, and a time that cannot be read is not new", () => {
  assert.equal(isNew("2026-12-31T00:00:00Z", "2026-11-20T12:00:00Z"), true)
  assert.equal(isNew("2026-11-20T12:00:00Z", "2026-11-20T12:00:00Z"), false)
  assert.equal(isNew("2026-11-01", "2026-11-20T12:00:00+01:00"), false)
  assert.equal(isNew("snart", "2026-11-20T12:00:00Z"), false)
  assert.equal(isNew("2026-12-31", "nå"), false)
})
