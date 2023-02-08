import { Exact, NftBlockchainState, NftsByWalletQuery } from "generated/graphql"
import { useEffect, useMemo, useState } from "react"
import { UseQueryState } from "urql"
import { allFilters } from 'src/const/allFilters'
interface IFilterState {
  label: string
  options: { selected: boolean; value: string }[]
  // optionsHash: { [key: string]: number }
}

export function useCollectionFilter(
  nftsByWalletResponse: UseQueryState<
    NftsByWalletQuery,
    Exact<{
      address?: string
    }>
  >
) {
  const [filter, setFilter] = useState<IFilterState[]>(allFilters);
  const [nfts, setNfts] = useState([])

  // const intarfaceAllBTNFTS = allBTNFTS.map((nft) => {
  //   return {
  //     ...nft,
  //     attributes: nft.attributes?.reduce((accum, trait) => {
  //       return { ...accum, [trait.trait_type]: trait.value, ["Costume Type"]: nft?.costumeType }
  //     }, {}),
  //   }
  // })

  // useEffect(() => {
  //   const filterHashMap = {}
  //   const baseFilter = []

  //   intarfaceAllBTNFTS?.forEach((nft) => {
  //     try {
  //       Object.keys(nft.attributes).forEach((key) => {
  //         const index = filterHashMap[key]
  //         const value = nft.attributes[key]

  //         if (typeof index === "number") {
  //           const j = baseFilter[index].optionsHash[value]
  //           if (typeof j !== "number") {
  //             baseFilter[index].optionsHash[value] = baseFilter[index].options.length
  //             baseFilter[index].options.push({ selected: false, value })
  //           }
  //         } else {
  //           filterHashMap[key] = baseFilter.length
  //           baseFilter.push({
  //             label: key,
  //             options: [{ selected: false, value }],
  //             optionsHash: { [value]: 0 },
  //           })
  //         }
  //       })
  //     } catch {}
  //   })
  //   setAllFilters(baseFilter)
  // }, [])


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
                return {
                  ...accum,
                  [trait.trait_type]: trait.value,
                  ["Costume Type"]: nft?.model?.attributes?.costumeType,
                }
              }, {}),
            },
          },
        }
      })
    return nftsList
  }, [nftsByWalletResponse.fetching, nftsByWalletResponse.stale])

  useEffect(() => {
    setNfts(allNfts)
    // const filterHashMap = {}
    // const baseFilter = []

    // allNfts?.forEach((nft) => {
    //   try {
    //     Object.keys(nft.model.metadata.traits).forEach((key) => {
    //       const index = filterHashMap[key]
    //       const value = nft.model.metadata.traits[key]

    //       if (typeof index === "number") {
    //         const j = baseFilter[index].optionsHash[value]
    //         if (typeof j !== "number") {
    //           baseFilter[index].optionsHash[value] = baseFilter[index].options.length
    //           baseFilter[index].options.push({ selected: false, value })
    //         }
    //       } else {
    //         filterHashMap[key] = baseFilter.length
    //         baseFilter.push({
    //           label: key,
    //           options: [{ selected: false, value }],
    //           optionsHash: { [value]: 0 },
    //         })
    //       }
    //     })
    //   } catch {}
    // })
    // setFilter(baseFilter)
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
      const filteredNfts = allNfts?.filter(({ model }) => {
        let counter = 0
        selectedFilters?.forEach(({ label, options }) => {
          if (model?.metadata?.traits !== undefined && label in model?.metadata?.traits) {
            options.includes(model.metadata.traits[label]) && ++counter
          }
        })
        return selectedFilters.length === counter
      })
      setNfts(filteredNfts)
    } else setNfts(allNfts)
  }, [filter])

  return useMemo(() => ({ nfts, filter, setFilter }), [filter, nfts])
}
