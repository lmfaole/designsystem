/**
 * The lines of a `ListField` as a list: split at line breaks and commas, trimmed, without blanks and repeats (the first stays), at most
 * `max` (the rest are dropped). Pure, for the server that reads the form, so a test pins it.
 */
export function parseListField(value: string | null | undefined, max = Number.POSITIVE_INFINITY): string[] {
  if (value === null || value === undefined) return []
  const items = value
    .split(/[\n\r,]+/)
    .map((item) => item.trim())
    .filter((item) => item !== "")
  return [...new Set(items)].slice(0, max)
}
