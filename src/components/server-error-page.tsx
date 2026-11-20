import { Button } from "./ui/button"
import { ErrorPage } from "./error-page"

/** 500 for a page that crashed while rendering. The Worker's 500 page draws it. */
export function ServerErrorPage({ home = "/" }: { /** The app's front page, with its base path (`/start/`): the site's root is not always it. */ home?: string }) {
  return (
    <ErrorPage
      status={500}
      title="Noe gikk galt"
      description="Siden fikk en feil den ikke kom seg ut av. Det hjelper som regel å laste siden på nytt. Hvis ikke, ligger feilen hos oss."
      actions={
        <>
          {/* An empty address is this page again: a plain link reloads it, with or without JavaScript. */}
          <Button asChild>
            <a href="">Last siden på nytt</a>
          </Button>
          <Button asChild variant="outline">
            <a href={home}>Gå til forsiden</a>
          </Button>
        </>
      }
    />
  )
}
