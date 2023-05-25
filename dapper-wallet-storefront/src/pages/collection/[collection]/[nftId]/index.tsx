import { useRouter } from "next/router"
import { useCallback, useMemo } from "react"
import AppLayout from "src/components/AppLayout"
import CollectionWrapper from "src/components/collection/CollectionWrapper"
import { NFTDetail } from "src/components/collection/NFTDetail"
import { MetaTags } from "src/components/general/MetaTags"
import { useNftsStore } from "src/store/nfts"
import { INft } from "src/typings/INfts"
import { LoginSkeleton } from "src/ui/Skeleton"
import shallow from "zustand/shallow"

interface INftCounter {
  counter: number,
  editions: number[]
}

const getCollections = ({ allCollections, counter }) => ({ allCollections, counter })

export const NFTDetailPage = () => {
  const router = useRouter()
  const { allCollections, counter } = useNftsStore(getCollections, shallow)    
  const nftId: string = router.query["nftId"]?.toString()
  const nftTitle: string = router.query["title"]?.toString()
  const selectedCollection: string = router.query["collection"]?.toString()
  const nft: INft = useMemo(() => allCollections[selectedCollection]?.find(({ id, title }) => id === nftId || title === nftTitle)
  , [allCollections, selectedCollection, nftId, nftTitle])
  
  const counterKey = useCallback(
    (nft) => {
      const key = JSON.stringify({
        title: nft?.title,
      })
      return counter[selectedCollection]?.[key]
    },
    [nft, selectedCollection, counter, allCollections]
  )

  if (!nft) {
    return <LoginSkeleton />
  }

  const title = `${nft?.title ?? "Your's idea with"} | Gamisodes`
  
  return (
    <>
      <MetaTags title={title} description={nft?.description ?? ""}>
        <meta property="og:image" content={nft?.imageUrl?.thumbnailUrl ?? ""} key="image" />
      </MetaTags>
      <AppLayout>
        <CollectionWrapper paddingBottom={false}>
          <NFTDetail nft={nft} nftEditions={counterKey(nft)} />
        </CollectionWrapper>
      </AppLayout>
    </>
  )
}

export default NFTDetailPage
