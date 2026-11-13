import type { Meta, StoryObj } from "@storybook/react-vite"

import { Download, Star, Trash2 } from "../src/lib/icons"
import { Button } from "../src/components/ui/button"
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from "../src/components/ui/button-group"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../src/components/ui/card"
import { NativeSelect, NativeSelectOptGroup, NativeSelectOption } from "../src/components/ui/native-select"
import { Separator } from "../src/components/ui/separator"
import { Skeleton } from "../src/components/ui/skeleton"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../src/components/ui/table"

const meta = { title: "Components/UI (shadcn)" } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

const VARIANTS = ["default", "outline", "secondary", "ghost", "destructive", "link"] as const
const SIZES = ["xs", "sm", "default", "lg"] as const

export const Buttons: Story = {
  render: () => (
    <div className="grid gap-4">
      {SIZES.map((size) => (
        <div key={size} className="flex flex-wrap items-center gap-3">
          {VARIANTS.map((variant) => (
            <Button key={variant} variant={variant} size={size}>{variant} / {size}</Button>
          ))}
        </div>
      ))}
      <div className="flex flex-wrap items-center gap-3">
        <Button size="icon-xs" aria-label="Star"><Star /></Button>
        <Button size="icon-sm" variant="outline" aria-label="Download"><Download /></Button>
        <Button size="icon" variant="secondary" aria-label="Star"><Star /></Button>
        <Button size="icon-lg" variant="ghost" aria-label="Delete"><Trash2 /></Button>
        <Button disabled>Disabled</Button>
        <Button><Download data-icon="inline-start" />With icon</Button>
      </div>
    </div>
  ),
}

export const ButtonGroups: Story = {
  render: () => (
    <div className="grid gap-4">
      <ButtonGroup>
        <Button variant="outline">Dag</Button>
        <Button variant="outline">Uke</Button>
        <Button variant="outline">Måned</Button>
      </ButtonGroup>
      <ButtonGroup>
        <ButtonGroupText>Sorter</ButtonGroupText>
        <ButtonGroupSeparator />
        <Button variant="outline">Navn</Button>
      </ButtonGroup>
      <ButtonGroup orientation="vertical" className="w-fit">
        <Button variant="outline">Opp</Button>
        <Button variant="outline">Ned</Button>
      </ButtonGroup>
    </div>
  ),
}

export const Cards: Story = {
  render: () => (
    <div className="grid max-w-sm gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>A line under the title.</CardDescription>
          <CardAction><Button size="sm" variant="outline">Action</Button></CardAction>
        </CardHeader>
        <CardContent>Content of the card.</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>
      <Card size="sm">
        <CardHeader><CardTitle>Small card</CardTitle></CardHeader>
        <CardContent>size="sm"</CardContent>
      </Card>
    </div>
  ),
}

export const NativeSelects: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <NativeSelect aria-label="Default">
        <NativeSelectOption>Alle</NativeSelectOption>
        <NativeSelectOption>Filmer</NativeSelectOption>
        <NativeSelectOption>Serier</NativeSelectOption>
      </NativeSelect>
      <NativeSelect size="sm" aria-label="Small">
        <NativeSelectOptGroup label="Medier">
          <NativeSelectOption>Musikk</NativeSelectOption>
          <NativeSelectOption>Podkast</NativeSelectOption>
        </NativeSelectOptGroup>
      </NativeSelect>
      <NativeSelect disabled aria-label="Disabled"><NativeSelectOption>Disabled</NativeSelectOption></NativeSelect>
    </div>
  ),
}

export const Separators: Story = {
  render: () => (
    <div className="grid max-w-sm gap-3">
      <span>Above</span>
      <Separator />
      <span>Below</span>
      <div className="flex h-5 items-center gap-3"><span>Left</span><Separator orientation="vertical" /><span>Right</span></div>
    </div>
  ),
}

export const Skeletons: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Skeleton className="size-12 rounded-full" />
      <div className="grid gap-2"><Skeleton className="h-4 w-48" /><Skeleton className="h-4 w-32" /></div>
    </div>
  ),
}

export const Tables: Story = {
  render: () => (
    <Table>
      <TableCaption>A table</TableCaption>
      <TableHeader>
        <TableRow><TableHead>Navn</TableHead><TableHead className="text-right">Antall</TableHead></TableRow>
      </TableHeader>
      <TableBody>
        <TableRow><TableCell>Alfa</TableCell><TableCell className="text-right">12</TableCell></TableRow>
        <TableRow><TableCell>Beta</TableCell><TableCell className="text-right">7</TableCell></TableRow>
      </TableBody>
      <TableFooter><TableRow><TableCell>Sum</TableCell><TableCell className="text-right">19</TableCell></TableRow></TableFooter>
    </Table>
  ),
}
