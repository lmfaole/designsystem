/**
 * The questions a step of `FirstRun` asks: the names of the fields in it a visitor fills in (a radio group or a list of checkboxes is one
 * question, hidden fields and buttons are none). The rule of the introduction is one question per step; `FirstRunEnhancer` warns in the
 * console of a step that asks more.
 */
export const stepQuestions = (step: Element): string[] => [
  ...new Set(
    [...step.querySelectorAll("input, select, textarea")]
      .filter((control) => control instanceof HTMLInputElement || control instanceof HTMLSelectElement || control instanceof HTMLTextAreaElement)
      .filter((control) => control.name !== "" && !["hidden", "submit", "button", "reset", "image"].includes(control.type))
      .map((control) => control.name),
  ),
]
