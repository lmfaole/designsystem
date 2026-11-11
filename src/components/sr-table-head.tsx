/** The header row of a table the page does not show a header for: read by a screen reader with every cell, never drawn. */
export function SrTableHead({ columns }: { columns: readonly string[] }) {
  return (
    <thead role="rowgroup" className="sr-only">
      <tr role="row">
        {columns.map((column) => (
          <th key={column} role="columnheader" scope="col">
            {column}
          </th>
        ))}
      </tr>
    </thead>
  )
}
