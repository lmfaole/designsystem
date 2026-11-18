/** Several short facts about one thing, each on a line of its own (a year and a maker, a name and its original name), never run together with a separator. */
export function Lines({ items }: { items: readonly (string | null | undefined)[] }) {
  const shown = items.filter((item): item is string => item !== null && item !== undefined && item !== "")
  return shown.length === 0 ? null : (
    <>
      {shown.map((item) => (
        <span key={item} className="block">
          {item}
        </span>
      ))}
    </>
  )
}
