import { Exact, NftBlockchainState, NftsByWalletQuery } from "generated/graphql"
import { useEffect, useMemo, useState } from "react"
import { UseQueryState } from "urql"
import { allFilters } from 'src/const/allFilters'
interface IFilterState {
  label: string
  options: { selected: boolean; value: string }[]
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

  return useMemo(() => ({ allNfts, nfts, filter, setFilter }), [filter, nfts])
}
