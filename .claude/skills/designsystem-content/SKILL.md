---
name: designsystem-content
description: Use when writing or changing any text a person reads in a page or component built with the design system - titles, labels, button and link text, counts, dates and numbers, empty states and error messages. On-screen text is Norwegian bokmål.
---

# Content with the design system

Code and comments are English; **on-screen text is Norwegian bokmål** (rule 9). Words are design material, not decoration.

## Principles

- **Write from the reader's side of the screen.** Name things by what people recognise («Venter på din review»), not by how the
  system is built.
- **Short and specific.** Titles are short noun phrases («Pull requests», «Klar til merge»), not sentences. Prefer specific to clever.
- **A control says exactly what happens.** «Åpne på GitHub», «Se alle 14», «Bruk min posisjon». Never «Klikk her», «Mer», «OK».
- **Links say what they open and where.** A link out names the place; a back link names the list («Pull requests»), never «Tilbake».
- **Active voice,** plain words, the way a knowledgeable person would say it. No stock phrases, no scare quotes.

## States

| State | Write |
| --- | --- |
| Empty | One quiet line: what would be here. «Ingen åpne pull requests.» |
| Error | What went wrong and, where possible, what to do: «Kunne ikke hente pull requesten: GitHub svarte 502». No apology, no vagueness. |
| Not found | Say what was not found and give a way back. |
| Waiting | «Venter på review», «Tester kjører»: the state, not «Vennligst vent». |
| Done | Say what happened: «Lagret». |

## Counts, dates and numbers

- Counts are numbers: «Se alle 14», «2 åpne kommentarer», «1 åpen kommentar» (singular is a separate string).
- Format with `Intl` in **nb-NO** and **Europe/Oslo**: dates `18. nov.`, long `18. november 2026`, time `19:27`. Never a
  hand-written format.
- A minus is **−** (U+2212), not a hyphen: `−3°`. A range is «−2° / 4°». Figures that line up use `numeric` (tabular numbers).
- «i dag», «i morgen» are fine for the near; a date for anything older than a few days. Say how old where age matters («Venter 3 dager»).
- Units are written the Norwegian way: `mm`, `m/s`, `°`.

## Status words

Keep one word for one meaning across the page: «Blokkert» (something stops it and it is for you to fix), «Klar til merge»,
«Venter på din review», «Venter på andre», «Utkast», «Stille i 3 dager». Do not invent a second word for the same state.

## Headings and labels

- Section titles are nouns; a group's title says what is in it («Krever deg», «Issues til deg»).
- An `iconLabel` names the kind in one word («Pull request», «Issue», «Spørsmål»).
- Small-capital section labels (`Heading look="label"`) are short enough to survive upper-casing.

Before finishing, run **designsystem-review**.
