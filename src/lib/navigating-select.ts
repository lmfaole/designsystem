/** The selector of a native `<select>` whose options are addresses (`PeriodPicker`): the one a page's script listens to. */
export const NAVIGATING_SELECT = "select[data-navigates]"

/**
 * Makes every `select[data-navigates]` go to the `data-href` of the option chosen. One listener on the document, so it
 * covers selects of a page that is plain HTML with no island to hydrate. Returns what removes it.
 */
export function enableNavigatingSelects(doc: Document = document): () => void {
  const onChange = (event: Event) => {
    const select = event.target
    if (!(select instanceof HTMLSelectElement) || !select.matches(NAVIGATING_SELECT)) return
    const href = select.selectedOptions[0]?.dataset.href
    if (href !== undefined) window.location.assign(href)
  }
  doc.addEventListener("change", onChange)
  return () => doc.removeEventListener("change", onChange)
}
