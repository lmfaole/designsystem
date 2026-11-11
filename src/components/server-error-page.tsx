import { Button } from "./ui/button"
import { ErrorPage } from "./error-page"

/** 500 for a page that crashed while rendering. The Worker's 500 page draws it. */
export function ServerErrorPage() {
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
            <a href="/">Gå til forsiden</a>
          </Button>
        </>
      }
    />
  )
}
