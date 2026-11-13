import type { Meta, StoryObj } from "@storybook/react-vite"

import { CardLink } from "../src/components/card-link"
import { Cover } from "../src/components/cover"
import { DatedLinkTable } from "../src/components/dated-link-table"
import { EntityRow, EntityRows } from "../src/components/entity-rows"
import { FactList, LinkList } from "../src/components/fact-list"
import { FilterChips } from "../src/components/filter-chips"
import { FoldList } from "../src/components/fold-list"
import { Gallery } from "../src/components/gallery"
import { HeadlineList } from "../src/components/headline-list"
import { Lines } from "../src/components/lines"
import { details, MediaRows } from "../src/components/media-rows"
import { Rows } from "../src/components/rows"
import { StoryList } from "../src/components/story-list"
import { TrackRows } from "../src/components/track-rows"
import { poster, square } from "./sample"

const meta = { title: "Components/Lists" } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const RowsRanked: Story = {
  name: "Rows (rank)",
  render: () => (
    <Rows
      lead="rank"
      rows={["Alfa", "Beta", "Gamma", "Delta"].map((name, i) => ({ key: name, body: <CardLink href="#" look="strong">{name}</CardLink>, trailing: `${40 - i * 7} avspillinger` }))}
    />
  ),
}

export const RowsPoster: Story = {
  name: "Rows (poster)",
  render: () => (
    <Rows
      lead="poster"
      rows={["Alfa", "Beta", "Gamma"].map((name, i) => ({ key: name, lead: <Cover url={poster(i * 70, name[0])} />, body: name, trailing: "★ 4,5" }))}
    />
  ),
}

export const RowsPlain: Story = {
  name: "Rows (plain)",
  render: () => <Rows rows={[{ key: "a", body: "Alfa", trailing: "12" }, { key: "b", body: "Beta", trailing: "7" }]} />,
}

export const MediaRowsStory: Story = {
  name: "MediaRows",
  render: () => (
    <MediaRows
      coverRatio="poster"
      rows={[
        { key: "1", cover: poster(10, "A"), title: "Blade Runner", subtitle: details(["Ridley Scott", "1982", "★ 5"]), when: "i går" },
        { key: "2", cover: poster(120, "B"), title: "Alien", subtitle: details(["Ridley Scott", null, "★ 4"]), when: "3. nov." },
        { key: "3", cover: null, title: "A title with no picture", subtitle: "Someone", when: "1. nov." },
      ]}
    />
  ),
}

export const TrackRowsStory: Story = {
  name: "TrackRows",
  render: () => (
    <TrackRows
      whenHead="Spilt"
      rows={[
        { key: "1", cover: square(200, "A"), track: "Song One", artist: "The Band", album: "Debut", when: "14:02" },
        { key: "2", cover: square(300, "B"), track: "Song Two", artist: "Another", album: "", when: "13:55" },
      ]}
    />
  ),
}

export const EntityRowsStory: Story = {
  name: "EntityRows",
  render: () => (
    <EntityRows caption="Spor på albumet">
      <EntityRow picture={<Cover ratio="square" url={square(40, "1")} />} name={<CardLink href="#" look="strong">Song One</CardLink>} label="Song One" detail="Spor 1" count="12 ganger" loved info={<p>Played first on 3 January.</p>} />
      <EntityRow picture={<Cover ratio="square" url={square(80, "2")} />} name="Song Two" label="Song Two" detail="Spor 2" count="3 ganger" />
      <EntityRow picture={<Cover ratio="square" url={null} />} name="Never played" label="Never played" count="0" muted />
    </EntityRows>
  ),
}

export const GalleryStory: Story = {
  name: "Gallery",
  render: () => (
    <Gallery
      items={Array.from({ length: 10 }, (_, i) => ({ key: String(i), slug: i === 3 ? null : `film-${i}`, title: `Title ${i + 1}`, year: 2000 + i, cover: poster(i * 36, String(i + 1)), ratio: "poster" as const, subtitle: "Director", meta: ["★ 4"] }))}
      link={(item, children, className) => <a href={`#${item.slug}`} className={className}>{children}</a>}
    />
  ),
}

export const Facts: Story = {
  name: "FactList and LinkList",
  render: () => (
    <div className="grid gap-4">
      <FactList facts={[["Utgitt", "1982"], ["Regi", <CardLink key="d" href="#">Ridley Scott</CardLink>], ["Lengde", "117 min"]]} />
      <LinkList links={[["IMDb", "https://example.com"], ["Wikipedia", "https://example.com"], ["Missing", null]]} />
    </div>
  ),
}

export const Chips: Story = {
  name: "FilterChips",
  render: () => <FilterChips label="Kategori" chips={[{ key: "a", label: "Alle", href: "#a", current: true }, { key: "b", label: "Teknologi", href: "#b", current: false }, { key: "c", label: "Politikk", href: "#c", current: false }]} />,
}

export const Folded: Story = {
  name: "FoldList",
  render: () => <FoldList summary="Vis alle verdier" items={[{ key: "1", text: "jan: 12" }, { key: "2", text: "feb: 18" }, { key: "3", text: "mar: 9" }]} />,
}

export const Headlines: Story = {
  name: "HeadlineList",
  render: () => <HeadlineList headlines={[{ key: "1", href: "https://example.com", title: "A headline from elsewhere", note: "example.com · i dag" }, { key: "2", href: "https://example.com", title: "Another one", note: "example.org · i går" }]} />,
}

export const Stories: Story = {
  name: "StoryList",
  render: () => <StoryList stories={[{ key: "1", href: "https://example.com", title: "A large link out to another site", byline: "example.com · 12 poeng" }, { key: "2", href: "https://example.com", title: "A second story", byline: "example.org · 3 poeng" }]} />,
}

export const DatedLinks: Story = {
  name: "DatedLinkTable",
  render: () => <DatedLinkTable dayHead="Dag" titleHead="Tittel" rows={[{ key: "1", day: "12. nov.", href: "https://example.com", title: "A link out", source: "example.com" }, { key: "2", day: "11. nov.", href: "https://example.com", title: "Another", source: "example.org" }]} />,
}

export const Covers: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-6">
      <Cover url={poster(10)} />
      <Cover url={square(100)} ratio="square" />
      <Cover url={poster(200)} size="hero" />
      <Cover url={square(300)} ratio="square" size="hero" />
      <Cover url={null} />
    </div>
  ),
}

export const LinesStory: Story = {
  name: "Lines",
  render: () => <Lines items={["1982", "Blade Runner", null, "Ridley Scott"]} />,
}
