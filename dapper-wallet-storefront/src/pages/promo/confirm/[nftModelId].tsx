import { Skeleton } from "@chakra-ui/react"
import AppLayout from "src/components/AppLayout"
import { MetaTags } from "src/components/general/MetaTags"
import { useNftDetail } from "src/hooks/useNftDetail"
import ConfirmLayout from "src/components/promo/ConfirmLayout"


const ConfirmationPage = () => {
  const { metadata, isSuccess } = useNftDetail()
  const title = `Confirmation | Gamisodes`

  return (
    <>
      <MetaTags title={title} />
      <AppLayout>
        <Skeleton className="mx-auto w-full" isLoaded={isSuccess}>
          <ConfirmLayout metadata={metadata} />
        </Skeleton>
      </AppLayout>
    </>
  )
}

export default ConfirmationPage
