import { useRouter } from "next/router"
import AppLayout from "src/components/AppLayout"
import { MetaTags } from "src/components/general/MetaTags"
import { useWalletContext } from "src/hooks/useWalletContext"
import { COLLECTIONS_PATH } from "src/lib/const"
import { useGetBlockchainNFTsById } from "src/services/blockchain/hooks"
import { LoginSkeleton } from "src/ui/Skeleton"
import CollectionWrapper from "../CollectionWrapper"
import { NFTDetail } from "../NFTDetail"

export default function GamisodesCollection() {
  const router = useRouter()
  const { currentUser } = useWalletContext()

  const nftId: string = router.query["nftId"]?.toString()

  const { data: nftResponse, isLoading } = useGetBlockchainNFTsById(
    { wallet: currentUser?.addr, collection: COLLECTIONS_PATH[0], ids: [nftId] },
    { enabled: !!currentUser?.addr }
  )
  const nft = nftResponse?.items[0]

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
