import { NativeSelect, NativeSelectOption } from "./ui/native-select"

interface PeriodPickerProps {
  periods: string[]
  selected: string
  /** The address of one period: choosing it goes there (see `enableNavigatingSelects`). */
  hrefTo: (period: string) => string
  /** How a period reads in the list. */
  formatLabel: (period: string) => string
  /** What the picker is called, for a screen reader. */
  label?: string
}

/**
 * Switches the time frame of a page: a native `<select>` with every period, so the list is the platform's own picker (the
 * wheel or sheet of a phone, the menu of a desktop), never a menu drawn here. Each option carries its address (`data-href`), and `enableNavigatingSelects` (`lib/navigating-select`), run once by the page,
 * goes there on a change: the page stays plain HTML, with nothing to hydrate.
 */
export function PeriodPicker({ periods, selected, hrefTo, formatLabel, label = "Periode" }: PeriodPickerProps) {
  return (
    <NativeSelect
      aria-label={label}
      defaultValue={selected}
      data-navigates=""
      className="min-w-40 [&_select]:h-12 [&_select]:rounded-xl [&_select]:pl-3 [&_select]:text-base"
    >
      {periods.map((period) => (
        <NativeSelectOption key={period} value={period} data-href={hrefTo(period)}>
          {formatLabel(period)}
        </NativeSelectOption>
      ))}
    </NativeSelect>
  )
}
