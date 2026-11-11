import { Button } from "./ui/button"
import { ErrorPage } from "./error-page"

/**
 * 404 for a path the app has no page for, drawn in the page chrome of an island. The Worker's own 404 is
 * `@designsystem/config/error-pages`. A plain `<a>`.
 */
export function NotFoundPage() {
  return (
    <ErrorPage
      status={404}
      title="Siden finnes ikke"
      description="Det er ingenting på denne adressen. Siden kan ha flyttet, eller lenken har en skrivefeil."
      actions={
        <Button asChild>
          <a href="/">Gå til forsiden</a>
        </Button>
      }
    />
  )
}
