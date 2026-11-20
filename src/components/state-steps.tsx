import { durationsBetween, formatDuration, type StateStep } from "../lib/timeline"
import { Icon } from "./icon"
import { Time } from "./time"

export type { StateStep } from "../lib/timeline"

export interface StateStepsProps {
  /** What the steps are of, for a screen reader: «Status for pull request 42». */
  label: string
  steps: readonly StateStep[]
  /** The time now (ISO): the current step's time runs to it. */
  now: string
}

type State = StateStep["state"]

/** The line from a step to the next: solid and strong for what is behind, the event colour for where it is or what failed, dashed for what was skipped. */
const LINE: Readonly<Record<State, string>> = {
  done: "border-foreground",
  current: "border-(--event-accent)",
  upcoming: "border-border",
  failed: "border-(--event-danger)",
  skipped: "border-dashed border-muted-foreground",
}

/** The marker: filled with a tick when done, a ring with a dot where it is, an empty ring ahead, filled with a cross when it failed, a dashed ring when skipped. */
const MARKER: Readonly<Record<State, string>> = {
  done: "bg-foreground text-background",
  current: "border-2 border-(--event-accent) text-(--event-accent)",
  upcoming: "border-2 border-muted-foreground",
  failed: "bg-(--event-danger) text-(--event-danger-foreground)",
  skipped: "border-2 border-dashed border-muted-foreground",
}

/** What the state is, in words: for a screen reader beside the label, and on the line under it where the marker alone would say it. */
const SAID: Readonly<Record<State, string>> = { done: "fullført", current: "nå", upcoming: "ikke ennå", failed: "feilet", skipped: "hoppet over" }

/**
 * The steps a thing goes through and where it is now, at the top of its page: «Åpnet → Review → Godkjent → Merget», as Carbon's progress
 * indicator. Each step has a marker for its state (done, current, upcoming, failed, skipped), its label, when it was reached and how long
 * it lasted until the next («2 t»; the current one «3 d så langt», to `now`). Side by side where there is room, under each other on a
 * phone. The state is in the marker's shape and in words, never in its colour alone. Rendered on the server with no script.
 */
export function StateSteps({ label, steps, now }: StateStepsProps) {
  const durations = durationsBetween(steps, now)
  const clock = new Date(now)
  return (
    <div className="@container">
      <ol aria-label={label} className="grid @xl:auto-cols-fr @xl:grid-flow-col">
        {steps.map((step, index) => {
          const duration = durations[index] ?? null
          return (
            <li
              key={`${step.label}-${index}`}
              {...(step.state === "current" ? { "aria-current": "step" as const } : {})}
              className={`grid min-w-0 content-start gap-1 border-l-2 pb-4 pl-4 last:pb-0 @xl:border-t-2 @xl:border-l-0 @xl:pt-3 @xl:pr-4 @xl:pb-0 @xl:pl-0 ${LINE[step.state]}`}
            >
              <span className={`flex min-w-0 items-center gap-2 text-sm ${step.state === "upcoming" || step.state === "skipped" ? "text-muted-foreground" : "font-medium"}`}>
                <Marker state={step.state} />
                {step.icon === undefined ? null : <Icon name={step.icon} size="sm" tone={step.state === "upcoming" || step.state === "skipped" ? "muted" : "inherit"} />}
                <span className="min-w-0 [overflow-wrap:anywhere]">{step.label}</span>
                <span className="sr-only">, {SAID[step.state]}</span>
              </span>
              <span className="flex flex-wrap gap-x-3 gap-y-0.5 pl-7 text-xs text-muted-foreground">
                {step.state === "failed" ? (
                  <span aria-hidden="true" className="font-medium text-destructive">
                    Feilet
                  </span>
                ) : null}
                {step.state === "skipped" || step.state === "upcoming" ? <span aria-hidden="true">{step.state === "skipped" ? "Hoppet over" : "Ikke ennå"}</span> : null}
                {step.at === undefined ? null : <Time value={step.at} now={clock} />}
                {duration === null ? null : (
                  <span className={`inline-flex items-center gap-1 tabular-nums ${step.state === "current" ? "font-medium text-foreground" : ""}`}>
                    <Icon name="duration" size="sm" />
                    <span className="sr-only">{step.state === "current" ? "Har vart i " : "Varte "}</span>
                    {formatDuration(duration)}
                    {step.state === "current" ? <span aria-hidden="true"> så langt</span> : null}
                  </span>
                )}
              </span>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

function Marker({ state }: { state: State }) {
  return (
    <span aria-hidden="true" className={`flex size-5 shrink-0 items-center justify-center rounded-full ${MARKER[state]}`}>
      {state === "done" ? <Icon name="done" size="sm" /> : null}
      {state === "failed" ? <Icon name="close" size="sm" /> : null}
      {state === "current" ? <span className="size-2 rounded-full bg-(--event-accent)" /> : null}
    </span>
  )
}
