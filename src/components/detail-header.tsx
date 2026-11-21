import type { ReactNode } from "react";

import type { PictureCorners } from "../lib/picture-frames";
import type { PictureSource } from "../lib/picture-sources";
import { AlbumSleeve } from "./album-sleeve";
import { Picture } from "./picture";
import { Stage } from "./stage";
import { Heading, Text } from "./text";

/** One of the few numbers that say most about the thing to the reader: the number, and what it counts. */
export interface DetailFigure {
  /** The number as it is read, formatted («10 903», «22 %»). */
  value: string;
  /** What it counts, in a few words after the number («avspillinger», «av alt du har hørt»). */
  label: string;
}

/** The figures, each its number above what it counts. A `<dl>`, so a screen reader hears what is counted before the number. */
function Figures({
  figures,
  across,
}: {
  figures: readonly DetailFigure[];
  across: boolean;
}) {
  return (
    <dl
      className={
        across
          ? "flex flex-wrap gap-x-8 gap-y-3"
          : "grid content-center gap-3 @xl:flex @xl:flex-wrap @xl:gap-x-8"
      }
    >
      {figures.map((figure) => (
        <div
          key={figure.label}
          className="flex min-w-0 flex-col-reverse gap-0.5"
        >
          <dt className="text-sm [overflow-wrap:anywhere]">{figure.label}</dt>
          <dd className="font-heading text-2xl font-semibold tracking-tight tabular-nums @xl:text-3xl">
            {figure.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * The head of a page of a thing (an artist, an album, a film, a person): its main picture and its name together, on a stage whose ground is the picture's own colours drawn in WebGL, moving with the page's light.
 * It is the page's `<h1>`, so the page leaves out its own title. On a phone the picture stands beside the name and not above it, so neither is alone; the picture is the lit main picture
 * (`Picture size="hero"`, lit on its frame), and nothing is painted over it. What belongs to the head goes in `children`, under the name: by whom, an attribution. Text in the head is the full text colour, never `muted`: the ground is tinted, and muted text would fall under 4.5:1.
 * `figures` are the two or three numbers that say most about the thing, large, under the name; each is said here and not again on the page.
 * With `size="large"` the picture is the page's face (an artist's or a person's portrait, `Picture size="feature"`): in a narrow head (under 36rem of its own room: a phone, a tablet beside the menu) the name goes first, the width of the head, and the picture under it, half the head wide, beside the figures; from 36rem
 * the picture is beside the name, at 14rem growing to 20rem, with the name, the figures and `children` in a column centred on it. Never `sleeve` with it.
 */
export function DetailHeader({
  kind,
  title,
  picture,
  sources,
  ratio = "square",
  corners = "normal",
  sleeve = false,
  size = "normal",
  figures = [],
  children,
}: {
  /** What kind of thing it is, in words above the name: «Artist», «Album», «Film». */ kind: string;
  /** Its name: the page's `<h1>`. */ title: string;
  picture?: string | null;
  sources?: readonly PictureSource[];
  ratio?: "poster" | "square";
  /** What kind of thing it is, as a shape (see `PictureCorners`). */ corners?: PictureCorners;
  /** An album: its cover as a sleeve in 3D with a record pulled half out (`AlbumSleeve`), under the light. For a cover the app may alter (Last.fm's), never Spotify's; needs `ratio="square"`. */ sleeve?: boolean;
  /** `large`: the picture is the page's face, as large as the head allows (an artist, a person). */ size?:
    "normal" | "large";
  /** Two or three numbers that say most about the thing, large under the name (`DetailFigure`). */ figures?: readonly DetailFigure[];
  children?: ReactNode;
}) {
  const name = (
    <>
      <Text size="sm" weight="medium">
        {kind}
      </Text>
      <Heading level={1}>{title}</Heading>
    </>
  );
  const own = sources === undefined ? {} : { sources };
  if (size === "large") {
    const beside = figures.length > 0;
    return (
      <Stage as="header" picture={picture ?? null} {...own}>
        {/* Its own container: the layout follows the room the head has, not the page's. */}
        <div className="@container">
          <div
            className={`grid gap-x-4 gap-y-4 [overflow-wrap:anywhere] @xl:grid-cols-[14rem_minmax(0,1fr)] @xl:grid-rows-[1fr_auto_auto_auto_1fr] @xl:gap-x-8 @xl:gap-y-4 @xl:[grid-template-areas:'picture_.'_'picture_name'_'picture_figures'_'picture_more'_'picture_.'] @3xl:grid-cols-[16rem_minmax(0,1fr)] @5xl:grid-cols-[20rem_minmax(0,1fr)] ${beside ? "grid-cols-[minmax(0,11fr)_minmax(0,9fr)] [grid-template-areas:'name_name'_'picture_figures'_'more_more']" : "grid-cols-[minmax(0,3fr)_minmax(0,2fr)] [grid-template-areas:'name_name'_'picture_.'_'more_more']"}`}
          >
            <div className="grid min-w-0 gap-1 [grid-area:name]">{name}</div>
            <div className="min-w-0 [grid-area:picture]">
              <Picture
                src={picture ?? null}
                {...own}
                ratio={ratio}
                corners={corners}
                size="feature"
                priority
              />
            </div>
            {beside ? (
              <div className="min-w-0 self-center [grid-area:figures]">
                <Figures figures={figures} across={false} />
              </div>
            ) : null}
            {children === undefined || children === null ? null : (
              <div className="grid min-w-0 gap-2 [grid-area:more]">
                {children}
              </div>
            )}
          </div>
        </div>
      </Stage>
    );
  }
  return (
    <Stage as="header" picture={picture ?? null} {...own}>
      <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-4 @3xl:gap-x-8">
        {sleeve && ratio === "square" ? (
          <AlbumSleeve src={picture ?? null} {...own} />
        ) : (
          <Picture
            src={picture ?? null}
            {...own}
            ratio={ratio}
            corners={corners}
            size="hero"
            priority
          />
        )}
        <div className="grid min-w-0 gap-1 [overflow-wrap:anywhere]">
          {name}
          {figures.length === 0 ? null : (
            <div className="py-2">
              <Figures figures={figures} across />
            </div>
          )}
          {children}
        </div>
      </div>
    </Stage>
  );
}
