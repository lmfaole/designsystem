import assert from "node:assert/strict"
import { test } from "node:test"

import { readTiltPreference, resolveTiltPreference, TILT_KEY, writeTiltPreference } from "./light-preference.ts"

const memory = () => {
  const data = new Map<string, string>()
  return { data, getItem: (key: string) => data.get(key) ?? null, setItem: (key: string, value: string) => void data.set(key, value), removeItem: (key: string) => void data.delete(key) }
}

test("a yes and a no are kept and read back, and anything else is not an answer", () => {
  const storage = memory()
  assert.equal(readTiltPreference(storage), null)
  writeTiltPreference(storage, "on")
  assert.equal(readTiltPreference(storage), "on")
  writeTiltPreference(storage, "denied")
  assert.equal(readTiltPreference(storage), "denied")
  storage.data.set(TILT_KEY, "maybe")
  assert.equal(readTiltPreference(storage), null)
  writeTiltPreference(storage, null)
  assert.equal(storage.data.has(TILT_KEY), false)
})

test("storage that is missing or throws loses the answer and breaks nothing", () => {
  const broken = { getItem: () => { throw new Error("blocked") }, setItem: () => { throw new Error("blocked") }, removeItem: () => { throw new Error("blocked") } }
  assert.equal(readTiltPreference(null), null)
  assert.equal(readTiltPreference(broken), null)
  assert.doesNotThrow(() => writeTiltPreference(broken, "on"))
  assert.doesNotThrow(() => writeTiltPreference(null, "on"))
})

test("the page's data-tilt comes before what the browser kept, and without it the kept answer counts", () => {
  const storage = memory()
  writeTiltPreference(storage, "denied")
  assert.equal(resolveTiltPreference("on", storage), "on")
  writeTiltPreference(storage, "on")
  assert.equal(resolveTiltPreference("off", storage), "denied")
  assert.equal(resolveTiltPreference(undefined, storage), "on")
  assert.equal(resolveTiltPreference("maybe", null), null)
})
