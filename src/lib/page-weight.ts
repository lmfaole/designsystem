/**
 * What a page costs to send, and an estimate of its emissions, as pure functions: `designsystem-budget` measures the built pages with them.
 *
 * The emissions follow the Sustainable Web Design Model v4 (sustainablewebdesign.org): energy per GB transferred, operational and embodied,
 * in the data centre, the network and the user's device, times the global grid average. It is a top-down estimate that errs high on
 * purpose; it says whether a page is light or heavy and how a change moves it, not what one component emits.
 */

/** kWh per GB, SWDM v4: operational and embodied for data centres, networks and user devices. */
export const SWDM_V4_KWH_PER_GB = { dataCentre: 0.055 + 0.012, network: 0.059 + 0.013, device: 0.08 + 0.081 } as const

/** The global average grid intensity the model uses, gCO2e per kWh. */
export const GLOBAL_GRID_G_PER_KWH = 494

/** Grams of CO2e for sending `bytes` once (a first visit, nothing cached). */
export function gramsFor(bytes: number): number {
  const kWhPerGb = SWDM_V4_KWH_PER_GB.dataCentre + SWDM_V4_KWH_PER_GB.network + SWDM_V4_KWH_PER_GB.device
  return (bytes / 1e9) * kWhPerGb * GLOBAL_GRID_G_PER_KWH
}

/** SWDM v4's rating of a page view, by grams per view. */
export const RATINGS: readonly (readonly [string, number])[] = [["A+", 0.04], ["A", 0.079], ["B", 0.145], ["C", 0.209], ["D", 0.278], ["E", 0.359]]

export function ratingOf(grams: number): string {
  return RATINGS.find(([, most]) => grams <= most)?.[0] ?? "F"
}

export type PartKind = "html" | "css" | "js" | "font" | "image"

export interface PagePart {
  kind: PartKind
  /** Bytes over the wire: compressed for text, as they are for fonts and pictures. */
  bytes: number
}

export type Weight = Record<PartKind | "total", number>

export function weigh(parts: readonly PagePart[]): Weight {
  const weight: Weight = { html: 0, css: 0, js: 0, font: 0, image: 0, total: 0 }
  for (const part of parts) {
    weight[part.kind] += part.bytes
    weight.total += part.bytes
  }
  return weight
}

/** Kilobytes a page may send, by kind and in all; a missing kind has no limit of its own. */
export type Budget = Partial<Record<PartKind | "total", number>>

/** The budget of the guide «Performance and sustainability»: a content page of this system is far under it; a page over it has a reason. */
export const DEFAULT_BUDGET: Budget = { total: 500, js: 150, css: 50, font: 100 }

/** One line for each kind over its limit; none when the page keeps its budget. */
export function overBudget(weight: Weight, budget: Budget): string[] {
  return (Object.entries(budget) as [PartKind | "total", number][])
    .filter(([kind, kb]) => weight[kind] > kb * 1024)
    .map(([kind, kb]) => `${kind}: ${(weight[kind] / 1024).toFixed(1)} KB over ${kb} KB`)
}
