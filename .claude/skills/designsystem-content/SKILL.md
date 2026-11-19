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
| Empty | What would be here, and why it is empty when the reader can change that («Ingen treff. Prøv færre filtre.»). When nothing is wrong, say so: «Ingen åpne pull requests. Alt er behandlet.» Where many sections are empty at once, one quiet line each. `EmptyState`. |
| Error | What happened, then what to do: «Kunne ikke hente pull requesten: GitHub svarte 502». No «Vennligst», «Beklager», «Ups», «ugyldig» or «Noe gikk galt». Use the same words in a summary and next to the field. |
| Stale or offline | «Oppdatert 19:27 · dataene kan være gamle», «Du er frakoblet. Det du ser er fra sist siden ble hentet.» Back online: nothing. |
| Source failed | «Henting fra Yr feilet. Viser vær fra 19:27.» with old data; «Kunne ikke hente værmeldingen fra Yr. Prøv igjen.» without. A retry says «Prøv igjen», and «Henter …» while it runs. |
| Not found | Say what was not found and give a way back. |
| Waiting | «Venter på review», «Tester kjører»: the state, not «Vennligst vent». |
| Done | Say what happened: «Lagret». |

## Text that people wrote

A description or a comment written in Markdown is shown with `Markdown`, never as flat text and never as inserted HTML. Show enough to
decide, cut at a paragraph and not in the middle of a construct, and say where the rest is («Åpne på GitHub» last).

## Counts, dates and numbers

- Counts are numbers: «Se alle 14», «2 åpne kommentarer», «1 åpen kommentar» (singular is a separate string).
- Format with `Intl` in **nb-NO** and **Europe/Oslo**: dates `18. nov.`, long `18. november 2026`, time `19:27`. Never a
  hand-written format.
- A minus is **−** (U+2212), not a hyphen: `−3°`. A range is «−2° / 4°». Figures that line up use `numeric` (tabular numbers).
- «i dag», «i morgen» are fine for the near; a date for anything older than a few days. Say how old where age matters («Venter 3 dager»). A relative time («for 3 timer siden») always has the exact time with it: use `Time` (relative under seven days, a date after, the exact time in `title` and `datetime`).
- Units are written the Norwegian way: `mm`, `m/s`, `°`, without a period, and money as «kr» after the number («500 000 kr»). Thousands are grouped in threes with a space (`Intl` gives a non-breaking one), never a comma or a period, and a number and its unit or `%` stay together («93 %»).
- A time is `19:27` and in a sentence «kl. 19:27» (what `Intl` gives in nb-NO; Skatteetaten writes it with a colon, while Aksel writes «kl. 14.00», so we follow one and keep it). A range is «fra 08:00 til 15:30» or an en dash without spaces («9–15», «2020–2025»), never a spaced hyphen. Avoid «24:00»: say «ved midnatt».
- Small numbers in running text are words up to twelve and digits above; **counts and figures that are the point stay digits** («2 åpne kommentarer», «Se alle 14»).

## Status words

A status is a short word with a symbol, sentence case, never truncated and never colour alone (`Badge`, `StatusLine`). Colour only for what stops something. Keep one word for one meaning across the page: «Blokkert» (something stops it and it is for you to fix), «Klar til merge»,
«Venter på din review», «Venter på andre», «Utkast», «Stille i 3 dager». Do not invent a second word for the same state.

## Wording buttons, links and titles

- **Verbs for actions, not noun phrases:** «Åpne på GitHub», not «Åpning av GitHub»; «Lagre», not «Lagring».
- **A link says where it goes.** Never «Les mer», «Mer info» or «Klikk her». A file gets its type in parentheses: «Årsrapport (pdf)».
- Write **«du»** to the reader. Sentence case in titles and labels; a list item that is a full sentence takes a capital and a full stop, a fragment neither.
- Explain **why** a question is asked when it is not obvious, and say what happens next.
- A copy button says «Kopier» and then «Kopiert».

Sources: Aksel, *Skriveregler i Nav* and *Skriveguide* (aksel.nav.no); Skatteetaten, *Skriveregler* (skatteetaten.no).

## Headings and labels

- Section titles are nouns; a group's title says what is in it («Krever deg», «Issues til deg»).
- An `iconLabel` names the kind in one word («Pull request», «Issue», «Spørsmål»).
- Small-capital section labels (`Heading look="label"`) are short enough to survive upper-casing.

Before finishing, run **designsystem-review**.
