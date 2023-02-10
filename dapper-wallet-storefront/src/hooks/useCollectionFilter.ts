import { useEffect, useMemo, useState } from "react"
import { allFilters } from 'src/const/allFilters'
interface IFilterState {
  label: string
  options: { selected: boolean; value: string }[]
  // optionsHash: { [key: string]: number }
}

export function useCollectionFilter(allCollections, selectedCollection) {
  const [filter, setFilter] = useState<IFilterState[]>(allFilters[selectedCollection]);
  const [nfts, setNfts] = useState([])

  console.log(filter, nfts);
  

  useEffect(() => {
    setNfts(allCollections?.brainTrainCollection)
  }, [allCollections])

  useEffect(() => {
    setFilter(allFilters[selectedCollection])
    setNfts(allCollections[selectedCollection])
  }, [selectedCollection])

  useEffect(() => {    
    const selectedFilters = filter.reduce((accum, { options, label }) => {
      const optionTrue = options
        .filter((option) => option.selected === true)
        .map(({ value }) => value)
      if (optionTrue.length > 0) return [...accum, { label, options: optionTrue }]
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
  }, [filter])


  // useEffect(() => {
  //   setNfts(allCollections?.brainTrainCollection)
  //   const filterHashMap = {}
  //   const baseFilter = []

  //   allNfts?.forEach((nft) => {
  //     try {
  //       Object.keys(nft.model.metadata.traits).forEach((key) => {
  //         const index = filterHashMap[key]
  //         const value = nft.model.metadata.traits[key]

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
  //   setFilter(baseFilter)
  // }, [allCollections])

  return useMemo(() => ({ nfts, filter, setFilter }), [filter, nfts])
}
