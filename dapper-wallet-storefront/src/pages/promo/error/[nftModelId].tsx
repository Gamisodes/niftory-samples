import { Skeleton } from "@chakra-ui/react"
import { useSearchParams } from "next/navigation"
import AppLayout from "src/components/AppLayout"
import { MetaTags } from "src/components/general/MetaTags"
import ErrorPageLayout from "src/components/promo/ErrorPageLayout"
import { useNftDetail } from "src/hooks/useNftDetail"

const ErrorPage = () => {
  const title = `Error | Gamisodes`

  const { metadata, isSuccess } = useNftDetail()

  const search = useSearchParams()
  const errorState = search.get("error") as string | null

  return (
    <>
      <MetaTags title={title} />
      <AppLayout>
        <Skeleton className="mx-auto w-full" isLoaded={isSuccess}>
          <ErrorPageLayout metadata={metadata} error={errorState} />
        </Skeleton>
      </AppLayout>
    </>
  )
}

export default ErrorPage
