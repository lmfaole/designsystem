import { Button } from "./ui/button"
import { ErrorPage } from "./error-page"

/**
 * 404 for a path the app has no page for, drawn in the page chrome of an island. The Worker's own 404 is
 * `@designsystem/config/error-pages`. A plain `<a>`.
 */
export function NotFoundPage({ home = "/" }: { /** The app's front page, with its base path (`/start/`): the site's root is not always it. */ home?: string }) {
  return (
    <ErrorPage
      status={404}
      title="Siden finnes ikke"
      description="Det er ingenting på denne adressen. Siden kan ha flyttet, eller lenken har en skrivefeil."
      actions={
        <Button asChild>
          <a href={home}>Gå til forsiden</a>
        </Button>
      }
    />
  )
}
