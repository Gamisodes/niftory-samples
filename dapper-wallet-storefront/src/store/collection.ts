import { ECollectionNames } from "src/const/enum"
import create from "zustand"

const defaultCollection = ECollectionNames.VIP

interface ISelectedCollection {
  selectedCollection: ECollectionNames,
  setCollection: (arg: ECollectionNames) => void
}
export const useCollectionStore = create<ISelectedCollection>((set) => ({
  selectedCollection: defaultCollection,
  setCollection: (selectedCollection) => set(() => ({ selectedCollection }))
}))