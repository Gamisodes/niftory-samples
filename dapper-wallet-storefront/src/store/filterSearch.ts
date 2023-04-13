import create from "zustand"

export interface ISearchNFT {
    searchInput: string,
    setSearchInput: (arg: string) => void
}
export const useFilterSearchStore = create<ISearchNFT>((set) => ({
    searchInput: '',
    setSearchInput: (searchInput) => set(() => ({ searchInput }))
}))