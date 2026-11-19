/**
 * What a page costs to send, and an estimate of its emissions, as pure functions: `designsystem-budget` measures the built pages with them.
 *
 * The emissions follow the Sustainable Web Design Model v4 (sustainablewebdesign.org): energy per GB transferred, operational and embodied,
 * in the data centre, the network and the user's device, times the global grid average. Plain JavaScript, since `designsystem-budget`
 * runs it from a project's node_modules, where Node does not strip types. It is a top-down estimate that errs high on
 * purpose; it says whether a page is light or heavy and how a change moves it, not what one component emits.
 */

/** kWh per GB, SWDM v4: operational and embodied for data centres, networks and user devices. */
export const SWDM_V4_KWH_PER_GB = Object.freeze({ dataCentre: 0.055 + 0.012, network: 0.059 + 0.013, device: 0.08 + 0.081 })

/** The global average grid intensity the model uses, gCO2e per kWh. */
export const GLOBAL_GRID_G_PER_KWH = 494

/** Grams of CO2e for sending `bytes` once (a first visit, nothing cached). */
/** @param {number} bytes @returns {number} */
export function gramsFor(bytes) {
  const kWhPerGb = SWDM_V4_KWH_PER_GB.dataCentre + SWDM_V4_KWH_PER_GB.network + SWDM_V4_KWH_PER_GB.device
  return (bytes / 1e9) * kWhPerGb * GLOBAL_GRID_G_PER_KWH
}

/** SWDM v4's rating of a page view, by grams per view. */
/** @type {ReadonlyArray<readonly [string, number]>} */
export const RATINGS = [["A+", 0.04], ["A", 0.079], ["B", 0.145], ["C", 0.209], ["D", 0.278], ["E", 0.359]]

/** @param {number} grams @returns {string} */
export function ratingOf(grams) {
  return RATINGS.find(([, most]) => grams <= most)?.[0] ?? "F"
}

/** @typedef {"html" | "css" | "js" | "font" | "image"} PartKind */

/** @typedef {{ kind: PartKind, bytes: number }} PagePart Bytes over the wire: compressed for text, as they are for fonts and pictures. */

/** @typedef {Record<PartKind | "total", number>} Weight */

/** @param {readonly PagePart[]} parts @returns {Weight} */
export function weigh(parts) {
  const weight = { html: 0, css: 0, js: 0, font: 0, image: 0, total: 0 }
  for (const part of parts) {
    weight[part.kind] += part.bytes
    weight.total += part.bytes
  }
  return weight
}

/** @typedef {Partial<Record<PartKind | "total", number>>} Budget Kilobytes a page may send, by kind and in all; a missing kind has no limit of its own. */

/** The budget of the guide «Performance and sustainability»: a content page of this system is far under it; a page over it has a reason. */
/** @type {Budget} */
export const DEFAULT_BUDGET = { total: 500, js: 150, css: 50, font: 100 }

/** One line for each kind over its limit; none when the page keeps its budget. */
/** @param {Weight} weight @param {Budget} budget @returns {string[]} */
export function overBudget(weight, budget) {
  return Object.entries(budget)
    .filter(([kind, kb]) => weight[kind] > kb * 1024)
    .map(([kind, kb]) => `${kind}: ${(weight[kind] / 1024).toFixed(1)} KB over ${kb} KB`)
}
