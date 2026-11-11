import { Button } from "./ui/button"
import { ButtonGroup } from "./ui/button-group"

interface SegmentedToggleOption<T extends string> {
  value: T
  label: string
}

interface SegmentedToggleProps<T extends string> {
  options: SegmentedToggleOption<T>[]
  value: T
  onChange: (value: T) => void
}

/**
 * An either/or (or either/or/or) view switch — "Per month" vs "Per year",
 * "Yearly" vs "Monthly" — rendered as a `ButtonGroup` whose active option is
 * the only one in the `default` variant. Not for filtering a list down (see
 * `FilterChipGroup`); this always has exactly one option selected and never
 * narrows what's shown below it to a subset, only how it's shown.
 */
export function SegmentedToggle<T extends string>({ options, value, onChange }: SegmentedToggleProps<T>) {
  return (
    <ButtonGroup>
      {options.map((option) => (
        <Button
          key={option.value}
          type="button"
          size="sm"
          variant={value === option.value ? "default" : "outline"}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </ButtonGroup>
  )
}
