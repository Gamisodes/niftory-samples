import { INft } from "src/typings/INfts"
import create from "zustand"

interface CollectionProps {
  isLoading?: boolean
  allCollections: { [key: string]: INft[] }
  counter: { 
    [key: string]: { 
      [key: string]: { counter: number; editions: number[] }
    }[]
  }
}

export interface INftStore extends CollectionProps {
  setNfts: (arg: CollectionProps) => void
  setLoading: (arg: boolean) => void
}

export const useNftsStore = create<INftStore>((set) => ({
  allCollections: {},
  counter: {},
  isLoading: false,
  setNfts: ({ allCollections, counter }) =>
    set(() => ({
      allCollections,
      counter,
    })),
  setLoading: (isLoading) => set({ isLoading }),
}))
