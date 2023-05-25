import { useEffect, useMemo, useState } from "react"
import { allFilters } from "src/const/allFilters"
import { ISearchNFT, useFilterSearchStore } from "src/store/filterSearch"
import { INftStore, useNftsStore } from "src/store/nfts"
import shallow from "zustand/shallow"

interface IFilterOption {
  selected: boolean
  value: string
  keyValue?: string
}
interface IFilterSingleCollection {
  label: string
  key?: string
  options: IFilterOption[]
}
interface IFilterState extends IFilterSingleCollection {
  type?: Array<IFilterSingleCollection & { subtype?: IFilterSingleCollection[] }>
}

const selector = ({ allCollections }: INftStore) => ({
  allCollections
})
const getSearchInput = ({ searchInput }: ISearchNFT) => ({ searchInput })

const filterOptionsTrue = (arr, key, label, accum) => {
  const optionTrue = arr
    ?.filter((option) => option.selected === true)
    .map(({ value, keyValue }) => keyValue?.toLowerCase() || value?.toLowerCase())
  if (optionTrue?.length > 0) accum.push({ label: key || label, options: optionTrue })
}

const filterNFTs = (arr, selectedFilter, filter) => arr.reduce((accum, nft) => {
  if (nft.traits !== undefined && !!filter.length) {
    const isMatches = selectedFilter?.every(({ label, options }) => label in nft.traits && options.includes(nft.traits[label]))
    return [...accum, isMatches && nft]
  } else return accum
}, [])

const searchFilter = (arr, searchInput) => arr.filter(({ title }) => title?.toLowerCase().includes(searchInput.toLowerCase()))

export function useCollectionFilter(selectedCollection) {
  const { allCollections } = useNftsStore(selector, shallow)
  const { searchInput } = useFilterSearchStore(getSearchInput, shallow)
  const [filter, setFilter] = useState<IFilterState[]>(() => allFilters[selectedCollection])
  const [initialSet, setInitial] = useState(false)
  const [nfts, setNfts] = useState([])

  useEffect(() => {
    if (allCollections?.[selectedCollection]?.length > 0 && !initialSet) {
      setNfts(allCollections[selectedCollection])
      setInitial(true)
    }
  }, [allCollections, initialSet])

  useEffect(() => {
    setFilter(allFilters[selectedCollection])
    setNfts(allCollections?.[selectedCollection])
  }, [allCollections, selectedCollection])

  const selectedFilters = useMemo(() => (
    filter?.reduce((accum, { options, label, key, type }) => {
      if (Array.isArray(type)) {
        type.forEach((typeItem) => {
          if (Array.isArray(typeItem.subtype)) {
            typeItem.subtype.forEach((subtypeItem) => filterOptionsTrue(subtypeItem.options, key, label, accum))
          } else filterOptionsTrue(typeItem.options, key, label, accum)
        })
      } else filterOptionsTrue(options, key, label, accum)
      return accum
    }, [])
  ), [filter])


  useEffect(() => {
    if (!!filter?.length) {
      if (selectedFilters?.length > 0 || searchInput?.length > 0) {
        const filteredNfts = filterNFTs(allCollections[selectedCollection], selectedFilters, filter)
        setNfts(searchFilter(filteredNfts, searchInput))
      } else setNfts(allCollections?.[selectedCollection])
    } else {
      if (searchInput?.length > 0) {
        setNfts(searchFilter(allCollections[selectedCollection], searchInput))
      } else setNfts(allCollections?.[selectedCollection])
    }
  }, [filter, allCollections, searchInput, selectedCollection, selectedFilters])

  return useMemo(() => ({ nfts, filter, setFilter }), [filter, nfts, searchInput])
}
