import { ENftCollection, INft } from "src/typings/INfts"
import { createWithEqualityFn } from "zustand/traditional"

export interface ICounter {
  counter: number
  editions: number[]
  nfts: INft[]
}
interface CollectionProps {
  isLoading?: boolean
  allCollections: { [key: string]: INft[] }
  counter: {
    [key in ENftCollection]?: {
      [key: string]: ICounter
    }
  }
}

export interface INftStore extends CollectionProps {
  setNfts: (arg: CollectionProps) => void
  setNewNft: (arg: INft) => void
  setLoading: (arg: boolean) => void
}

export const useNftsStore = createWithEqualityFn<INftStore>(
  (set, get) => ({
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
      if (allCollections[nft.collection].some(({ title }) => title === nft.title)) {
        const newCounter = { ...counter }
        const val = JSON.stringify({ title: nft.title })
        newCounter[nft.collection][val].counter += 1
        newCounter[nft.collection][val].editions.push(nft.edition)
        newCounter[nft.collection][val].nfts.push(nft)
        set(() => ({
          allCollections,
          counter: newCounter,
        }))
      } else {
        const newAllCollection = { ...allCollections }
        newAllCollection[nft.collection].push(nft)
        const newCounter = { ...counter }
        const val = JSON.stringify({ title: nft.title })
        newCounter[nft.collection][val] = { counter: 1, editions: [nft.edition], nfts: [nft] }
        set(() => ({
          allCollections: newAllCollection,
          counter: newCounter,
        }))
      }
    },
    setLoading: (isLoading) => set({ isLoading }),
  }),
  Object.is
)
