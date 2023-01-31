import Head from "next/head"
import { useMemo, useState, useEffect } from "react"
import CollectionWrapper from "src/components/collection/CollectionWrapper"
import { SectionHeader } from "src/ui/SectionHeader"
import { Nft, NftBlockchainState, useNftsByWalletQuery } from "../../../../generated/graphql"
import AppLayout from "../../../components/AppLayout"
import { CollectionGrid } from "../../../components/collection/CollectionGrid"
import { useWalletContext } from "../../../hooks/useWalletContext"

interface IFilterState {
  label: string
  options: { selected: boolean; value: string }[]
  optionsHash: { [key: string]: number }
}

const CollectionPage = () => {
  const { currentUser } = useWalletContext()
  const [nftsByWalletResponse] = useNftsByWalletQuery({
    variables: { address: currentUser?.addr },
    pause: !currentUser?.addr,
    requestPolicy: "cache-and-network",
  })

  const [filter, setFilter] = useState<IFilterState[]>([])
  const [nfts, setNfts] = useState([])

  const allNfts = useMemo(() => {
    const nftsList = nftsByWalletResponse?.data?.nftsByWallet?.items
      .filter((nft) =>
        [NftBlockchainState.Transferred, NftBlockchainState.Transferring].includes(
          nft.blockchainState
        )
      )
      .map((nft) => {
        return {
          ...nft,
          model: {
            ...nft.model,
            metadata: {
              ...nft.model.metadata,
              traits: nft.model.metadata.traits?.reduce((accum, trait) => {
                return { ...accum, [trait.trait_type]: trait.value }
              }, {}),
            },
          },
        }
      })
      return nftsList
  }, [nftsByWalletResponse.fetching, nftsByWalletResponse.stale])

  useEffect(() => {
    setNfts(allNfts)
    const filterHashMap = {}
    const baseFilter = []

    allNfts?.forEach((nft) => {
      try {
        Object.keys(nft.model.metadata.traits).forEach((key) => {
          const index = filterHashMap[key]
          const value = nft.model.metadata.traits[key]

          if (typeof index === "number") {
            const j = baseFilter[index].optionsHash[value]
            if (typeof j !== "number") {
              baseFilter[index].optionsHash[value] = baseFilter[index].options.length
              baseFilter[index].options.push({ selected: false, value })
            }
          } else {
            filterHashMap[key] = baseFilter.length
            baseFilter.push({
              label: key,
              options: [{ selected: false, value }],
              optionsHash: { [value]: 0 },
            })
          }
        })
      } catch {}
    })
    setFilter(baseFilter)
  }, [allNfts])

  useEffect(() => {
    const selectedFilters = filter.reduce((accum, { options, label }) => {
      const optionTrue = options
        .filter((option) => option.selected === true)
        .map(({ value }) => value)
      if (optionTrue.length > 0) return [...accum, { label, options: optionTrue }]
      return accum
    }, [])
    
    if (selectedFilters.length > 0) {
      const filteredNfts = allNfts?.filter(({ model }) =>
      selectedFilters?.some(({ label, options }) => {
        if (
          model?.metadata?.traits !== undefined &&
          label in model?.metadata?.traits
        ) return options.includes(model.metadata.traits[label])
        return false
      })
    )    
    setNfts(filteredNfts)
    } else setNfts(allNfts)
  }, [filter])

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
            isLoading={nftsByWalletResponse.fetching}
          />
        </CollectionWrapper>
      </AppLayout>
    </>
  )
}

CollectionPage.requireWallet = true
export default CollectionPage
