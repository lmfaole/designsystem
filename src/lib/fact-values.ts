/** What a fact is worth: one value, or several that belong under the same term (`["zenabii", "Stormoen"]`). */
export type FactValue<Node> = Node | readonly Node[]

const isList = <Node>(value: FactValue<Node>): value is readonly Node[] => Array.isArray(value)

const filled = <Node>(value: Node): boolean => value !== null && value !== undefined && value !== "" && value !== false

/** The values of a fact, empty ones left out: one value is `[value]`, none is `[]`. */
export function valuesOf<Node>(value: FactValue<Node>): Node[] {
  const values: readonly Node[] = isList(value) ? value : [value]
  return values.filter(filled)
}
