import Head from "next/head"
import { useMemo, useState, useEffect } from "react"
import CollectionWrapper from "src/components/collection/CollectionWrapper"
import { useCollectionFilter } from "src/hooks/useCollectionFilter"
import { SectionHeader } from "src/ui/SectionHeader"
import AppLayout from "../../../components/AppLayout"
import { CollectionGrid } from "../../../components/collection/CollectionGrid"
import { useWalletContext } from "../../../hooks/useWalletContext"
import { useGetFlowAndNiftoryData } from "src/hooks/useGetFlowAndNiftoryData"

const CollectionPage = () => {
  const { currentUser } = useWalletContext()
  const { isLoading, collections, nftsByWalletResponse} = useGetFlowAndNiftoryData(currentUser)
  const {nfts, filter, setFilter} = useCollectionFilter(nftsByWalletResponse)
  console.log(collections);
  
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
            nfts={nfts}
            filter={filter}
            setFilter={setFilter}
            isLoading={isLoading}
          />
        </CollectionWrapper>
      </AppLayout>
    </>
  )
}

CollectionPage.requireWallet = true
export default CollectionPage
