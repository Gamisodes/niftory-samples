import Head from "next/head"
import { useMemo, useState, useEffect } from "react"
import CollectionWrapper from "src/components/collection/CollectionWrapper"
import { useCollectionFilter } from "src/hooks/useCollectionFilter"
import { SectionHeader } from "src/ui/SectionHeader"
import { Nft, NftBlockchainState, useNftsByWalletQuery } from "../../../../generated/graphql"
import AppLayout from "../../../components/AppLayout"
import { CollectionGrid } from "../../../components/collection/CollectionGrid"
import { useWalletContext } from "../../../hooks/useWalletContext"



const CollectionPage = () => {
  const { currentUser } = useWalletContext()
  const [nftsByWalletResponse] = useNftsByWalletQuery({
    variables: { address: currentUser?.addr },
    pause: !currentUser?.addr,
    requestPolicy: "cache-and-network",
  })
  const {allNfts, nfts, filter, setFilter} = useCollectionFilter(nftsByWalletResponse);
  
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
            <SectionHeader classNames="pb-7" text="My Collection" />
          </section>
          <CollectionGrid
            allNfts={allNfts}
            nfts={nfts}
            filter={filter}
            setFilter={setFilter}
            isLoading={nftsByWalletResponse.fetching}
          />
        </CollectionWrapper>
      </AppLayout>
    </>
  )
}

CollectionPage.requireWallet = true
export default CollectionPage
