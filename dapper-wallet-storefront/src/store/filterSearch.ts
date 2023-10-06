import { createWithEqualityFn } from "zustand/traditional"

export interface ISearchNFT {
  searchInput: string
  setSearchInput: (arg: string) => void
}
export const useFilterSearchStore = createWithEqualityFn<ISearchNFT>(
  (set) => ({
    searchInput: "",
    setSearchInput: (searchInput) => set(() => ({ searchInput })),
  }),
  Object.is
)
