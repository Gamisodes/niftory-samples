import { Nft, useNftQuery } from "generated/graphql"
import router from "next/router"
import AppLayout from "src/components/AppLayout"
import { MetaTags } from "src/components/general/MetaTags"
import { Subset } from "src/lib/types"
import { LoginSkeleton } from "src/ui/Skeleton"
import CollectionWrapper from "../CollectionWrapper"
import { NFTDetail } from "../NFTDetail"

export default function BrainTrain() {
  const nftId: string = router.query["nftId"]?.toString()

  const { data: nftResponse, isLoading } = useNftQuery(
    { id: nftId },
    { refetchInterval: 10 * 1000, enabled: !!nftId }
  )

  const nft: Subset<Nft> = nftResponse?.nft

  const nftModel = nft?.model
  const title = `${nftModel?.title ?? "Your's idea with"} | Gamisodes`

  if (isLoading) {
    return <LoginSkeleton />
  }
  return (
    <>
      <MetaTags title={title} description={nftModel?.description ?? ""}>
        <meta property="og:image" content={nftModel?.content?.files[0]?.url ?? ""} key="image" />
      </MetaTags>
      <AppLayout>
        <CollectionWrapper paddingBottom={false}>
          <NFTDetail nft={nft} />
        </CollectionWrapper>
      </AppLayout>
    </>
  )
}
