import { Skeleton } from "@chakra-ui/react"
import { useRouter } from "next/router"
import NFTModelDetail from "src/components/drops/NFTModelDetail"

import { useNftModelQuery } from "../../../../generated/graphql"
import AppLayout from "../../../components/AppLayout"
// import { NFTModelDetail } from "../../../components/drops/NFTModelDetail"

const NFTModelDetailPage = () => {
  const router = useRouter()
  const nftModelId = router.query["nftModelId"]?.toString()

  const [nftModelResponse] = useNftModelQuery({ variables: { id: nftModelId } })

  const nftModel = nftModelResponse?.data?.nftModel
  const metadata = {
    title: nftModel?.title,
    description: nftModel?.description,
    amount: nftModel?.quantity,
    quantityMinted: +nftModel?.quantityMinted,
    price: nftModel?.attributes?.price ? nftModel?.attributes?.price ?? 25 : 25,
    content: [
      {
        contentType: nftModel?.content?.files[0]?.contentType,
        contentUrl: nftModel?.content?.files[0]?.url,
        thumbnailUrl: nftModel?.content?.poster?.url,
        alt: nftModel?.title,
      },
    ],
  }
  console.log(metadata)
  return (
    <AppLayout>
      <Skeleton className="mx-auto w-full" isLoaded={!nftModelResponse.fetching}>
        <NFTModelDetail id={nftModelId} metadata={metadata} />
      </Skeleton>
    </AppLayout>
  )
}

export default NFTModelDetailPage
