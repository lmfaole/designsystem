/** A reader's preferences in the browser (`localStorage`): there is no user to key them by, and none leaves the device. */

// Storage throws when the browser has it switched off (some private modes); not remembering is then the whole cost.
export function readStored(key: string): string | null {
  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

/** Keeps `value` under `key`, or forgets the key when `value` is null. */
export function writeStored(key: string, value: string | null): void {
  try {
    if (value === null) window.localStorage.removeItem(key)
    else window.localStorage.setItem(key, value)
  } catch {
    // See readStored.
  }
}
