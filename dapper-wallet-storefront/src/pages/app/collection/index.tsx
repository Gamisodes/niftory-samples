import Head from "next/head"
import { useMemo } from "react"
import CollectionWrapper from "src/components/collection/CollectionWrapper"
import { SectionHeader } from "src/ui/SectionHeader"
import { Nft, useNftsByWalletQuery } from "../../../../generated/graphql"
import AppLayout from "../../../components/AppLayout"
import { CollectionGrid } from "../../../components/collection/CollectionGrid"
import { useWalletContext } from "../../../hooks/useWalletContext"
import { Subset } from "../../../lib/types"

const CollectionPage = () => {
  const { currentUser } = useWalletContext()
  const [nftsByWalletResponse] = useNftsByWalletQuery({
    variables: { address: currentUser?.addr },
    pause: !currentUser?.addr,
    requestPolicy: "cache-and-network",
  })
  const nfts: Subset<Nft>[] = useMemo(
    () => nftsByWalletResponse?.data?.nftsByWallet?.items,
    [nftsByWalletResponse.fetching, nftsByWalletResponse.stale]
  )
  const title = `My Collection | Gamisodes`
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} key="title" />
      </Head>
      <AppLayout>
        <CollectionWrapper>
          <section className="pt-10">
            <SectionHeader text="My Collection" />
          </section>
          <CollectionGrid nfts={nfts} isLoading={nftsByWalletResponse.fetching} />
        </CollectionWrapper>
      </AppLayout>
    </>
  )
}

CollectionPage.requireWallet = true
export default CollectionPage
