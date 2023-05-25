import { INft } from "src/typings/INfts"
import create from "zustand"

interface CollectionProps {
  isLoading?: boolean
  allCollections: { [key: string]: INft[] }
  counter: { 
    [key: string]: { 
      [key: string]: { counter: number; editions: number[] }
    }
  }
}

export interface INftStore extends CollectionProps {
  setNfts: (arg: CollectionProps) => void
  setNewNft: (arg: INft) => void
  setLoading: (arg: boolean) => void
}

export const useNftsStore = create<INftStore>((set, get) => ({
  allCollections: {},
  counter: {},
  isLoading: false,
  setNfts: ({ allCollections, counter }) =>
    set(() => ({
      allCollections,
      counter,
    })),
  setNewNft: (nft: INft) => {
    const { allCollections, counter } = get()
    // if has NFT
    if (allCollections[nft.collection].some(({title}) => title === nft.title)) {
      const newCounter = {...counter}
      const val = JSON.stringify({title: nft.title})
      newCounter[nft.collection][val].counter +=1
      newCounter[nft.collection][val].editions.push(nft.edition)
      set(() => ({
        allCollections,
        counter: newCounter,
      }))
    } else {
      const newAllCollection = {...allCollections}
      newAllCollection[nft.collection].push(nft)
      const newCounter = {...counter}
      const val = JSON.stringify({title: nft.title})
      newCounter[nft.collection][val] = { counter: 1, editions: [nft.edition] }
      set(() => ({
        allCollections: newAllCollection,
        counter: newCounter,
      }))
    }
  },
  setLoading: (isLoading) => set({ isLoading }),
}))
