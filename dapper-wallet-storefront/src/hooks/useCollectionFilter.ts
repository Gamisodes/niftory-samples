import { useEffect, useMemo, useState } from "react"
import { allFilters } from "src/const/allFilters"
interface IFilterState {
  label: string
  key?: string
  options: { selected: boolean; value: string; keyValue: string }[]
}

export function useCollectionFilter(allCollections, selectedCollection) {
  const [filter, setFilter] = useState<IFilterState[]>(allFilters[selectedCollection])
  const [initialSet, setInitial] = useState(false)
  const [nfts, setNfts] = useState([])
  
  useEffect(() => {   
    if ( allCollections[selectedCollection]?.length > 0 && !initialSet) {
      setNfts(allCollections[selectedCollection])
      setInitial(true)
    }
  }, [allCollections, initialSet])

  useEffect(() => {
    setFilter(allFilters[selectedCollection])
    setNfts(allCollections[selectedCollection])
  }, [allCollections, selectedCollection])

  useEffect(() => {
    const selectedFilters = filter.reduce((accum, { options, label, key }) => {
      const optionTrue = options
        .filter((option) => option.selected === true)
        .map(({ value, keyValue }) => keyValue || value)
      if (optionTrue.length > 0) return [...accum, { label: key || label, options: optionTrue }]
      return accum
    }, [])

    if (selectedFilters.length > 0) {
      const filteredNfts = allCollections[selectedCollection].filter(({ filters }) => {
        let counter = 0
        selectedFilters?.forEach(({ label, options }) => {
          if (filters !== undefined && label in filters) {
            options.includes(filters[label]) && ++counter
          }
        })
        return selectedFilters.length === counter
      })
      setNfts(filteredNfts)
    } else setNfts(allCollections[selectedCollection])
  }, [filter, allCollections])

  return useMemo(() => ({ nfts, filter, setFilter }), [filter, nfts])
}
