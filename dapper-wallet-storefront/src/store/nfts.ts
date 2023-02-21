import { Nft } from "generated/graphql"
import { Subset } from "src/lib/types"
import create from "zustand"

interface CollectionProps {
  isLoading: boolean
  allCollections: { [key: string]: Subset<Nft>[] }
  counter: {[key: string]: {[key: string]: number}},
}

interface INftStore extends CollectionProps {
  setNfts: ( arg: CollectionProps) => void
}

export const useNftsStore = create<INftStore>((set) => ({
  allCollections: {},
  counter: {},
  isLoading: false,
  setNfts: ({ allCollections, counter, isLoading }) =>
    set(() => ({
      allCollections,
      counter,
      isLoading,
    })),
}))
