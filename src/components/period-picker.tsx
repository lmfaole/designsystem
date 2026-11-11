import { useId } from "react"

import { ChevronDown, X } from "../lib/icons"
import { CommandButton } from "./command-button"
import { Button } from "./ui/button"

interface PeriodPickerProps {
  periods: string[]
  selected: string
  /** The address of one period: each choice is a link, so the picker changes the page without a script. */
  hrefTo: (period: string) => string
  /** How a period reads in the list. */
  formatLabel: (period: string) => string
  /** What the picker is called: the popover's title, and what a screen reader hears before the chosen value. */
  label?: string
}

/**
 * Switches the time frame of a page: a button with the chosen period that opens a `popover` with every period to pick
 * from, each a link. It is a sheet from the bottom on a phone and a list under the button on a wide screen (`overlay.css`).
 */
export function PeriodPicker({ periods, selected, hrefTo, formatLabel, label = "Periode" }: PeriodPickerProps) {
  const key = useId().replace(/[^a-zA-Z0-9_-]/g, "")
  const popoverId = `period-${key}`
  const anchor = `--period-${key}`
  return (
    <>
      <Button asChild variant="outline" className="h-12 min-w-40 justify-between" style={{ anchorName: anchor }}>
        <CommandButton command="toggle-popover" commandFor={popoverId} aria-label={`${label}: ${formatLabel(selected)}`}>
          {formatLabel(selected)}
          <ChevronDown />
        </CommandButton>
      </Button>
      <div id={popoverId} popover="auto" data-overlay="sheet" aria-label={label} style={{ positionAnchor: anchor }}>
        <div data-overlay-body="">
          <h2 className="font-medium">{label}</h2>
          <CommandButton command="hide-popover" commandFor={popoverId} data-overlay-close="" aria-label="Lukk">
            <X aria-hidden="true" />
          </CommandButton>
          <ul data-overlay-list="">
            {periods.map((period) => (
              <li key={period}>
                <a href={hrefTo(period)} data-period-choice={period} aria-current={period === selected ? "page" : undefined}>
                  {formatLabel(period)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
