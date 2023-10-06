import { WALLET_TYPE_SOURCE } from "consts/const"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/router"
import { useCallback, useMemo } from "react"
import AppLayout from "src/components/AppLayout"
import CollectionWrapper from "src/components/collection/CollectionWrapper"
import { NFTDetail } from "src/components/collection/NFTDetail"
import { MetaTags } from "src/components/general/MetaTags"
import CustodialWalletGuard from "src/guard/CustodialWallet"
import WalletGuard from "src/guard/WalletGuard"
import { INftStore, useNftsStore } from "src/store/nfts"
import { INft, WalletType } from "src/typings/INfts"
import { LoginSkeleton } from "src/ui/Skeleton"
import { shallow } from "zustand/shallow"
const getCollections = ({ allCollections, counter, isLoading }: INftStore) => ({
  allCollections,
  counter,
  isLoading,
})

const NFTDetailPage = () => {
  const router = useRouter()
  const { allCollections, counter, isLoading } = useNftsStore(getCollections, shallow)
  const nftId: string = router.query["nftId"]?.toString()
  const nftTitle: string = router.query["title"]?.toString()
  const selectedCollection: string = router.query["collection"]?.toString()
  const nft: INft = useMemo(
    () =>
      allCollections[selectedCollection]?.find(
        ({ id, title }) => id === nftId || title === nftTitle
      ),
    [allCollections, selectedCollection, nftId, nftTitle, isLoading]
  )
  const counterKey = useCallback(
    (nft) => {
      const key = JSON.stringify({
        title: nft?.title,
      })
      return counter[selectedCollection]?.[key]
    },
    [nft, selectedCollection, counter, allCollections]
  )

  if (isLoading || !nft) {
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

function PromoNFTPage() {
  const search = useSearchParams()
  const walletTypeSource = search.get(WALLET_TYPE_SOURCE) as WalletType | null
  if (walletTypeSource === WalletType.Custodial) {
    return (
      <CustodialWalletGuard isActive>
        <NFTDetailPage />
      </CustodialWalletGuard>
    )
  } else if (walletTypeSource === WalletType.External) {
    return (
      <WalletGuard isActive>
        <NFTDetailPage />
      </WalletGuard>
    )
  }
  return <NFTDetailPage />
}

PromoNFTPage.requiredCustodialWallet = true
PromoNFTPage.requireAuth = true

export default PromoNFTPage
