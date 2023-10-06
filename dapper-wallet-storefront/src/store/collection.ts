import { ECollectionNames } from "src/const/enum"
import { createWithEqualityFn } from "zustand/traditional"

const defaultCollection = ECollectionNames.VIP

interface ISelectedCollection {
  selectedCollection: ECollectionNames
  setCollection: (arg: ECollectionNames) => void
}
export const useCollectionStore = createWithEqualityFn<ISelectedCollection>(
  (set) => ({
    selectedCollection: defaultCollection,
    setCollection: (selectedCollection) => set(() => ({ selectedCollection })),
  }),
  Object.is
)
