import Head from "next/head"
import { useRouter } from "next/router"
import CollectionWrapper from "src/components/collection/CollectionWrapper"

import AppLayout from "src/components/AppLayout"
import { NFTDetail } from "src/components/collection/NFTDetail"
import { ECollectionNames } from "src/const/enum"
import { Subset } from "src/lib/types"
import { useNftsStore } from "src/store/nfts"
import { LoginSkeleton } from "src/ui/Skeleton"
import shallow from "zustand/shallow"
import { Nft, useNftQuery } from "../../../../../../generated/graphql"

const getCollections = ({ allCollections }) => allCollections

export const NFTDetailPage = () => {
  const router = useRouter()
  const allCollections = useNftsStore(getCollections, shallow)

  const nftId: string = router.query["nftId"]?.toString()
  const selectedCollection: string = router.query["collection"]?.toString()

  const { data: nftResponse, isLoading } = useNftQuery(
    { id: nftId },
    { refetchInterval: 10 * 1000 }
  )

  const nft: Subset<Nft> =
    selectedCollection === ECollectionNames.BrainTrain
      ? nftResponse?.nft
      : allCollections[selectedCollection]?.find(({ id }) => id === nftId)

  if (!nftId || isLoading) {
    return <LoginSkeleton />
  }

  const nftModel = nft?.model
  const title = `${nftModel?.title ?? "Your's idea with"} | Gamisodes`

  return (
    <>
      <Head>
        <title>{nftModel?.title ?? ""}</title>
        <meta property="og:title" content={title} key="title" />
        <meta property="og:description" content={nftModel?.description ?? ""} key="description" />
        <meta property="og:image" content={nftModel?.content?.files[0]?.url ?? ""} key="image" />
      </Head>
      <AppLayout>
        <CollectionWrapper paddingBottom={false}>
          <NFTDetail nft={nft} />
        </CollectionWrapper>
      </AppLayout>
    </>
  )
}

export default NFTDetailPage
