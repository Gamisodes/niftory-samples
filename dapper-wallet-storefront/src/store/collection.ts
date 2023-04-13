import { EServerType, SERVER_TAG } from "src/lib/const"
import { ECollectionNames } from "src/const/enum"
import create from "zustand"

const AVAILABLE_LIST = [EServerType.STAGING, EServerType.PREPORD]
const defaultCollection = AVAILABLE_LIST.includes(SERVER_TAG) ? ECollectionNames.VIP : ECollectionNames.BrainTrain

interface ISelectedCollection {
  selectedCollection: ECollectionNames,
  setCollection: (arg: ECollectionNames) => void
}
export const useCollectionStore = create<ISelectedCollection>((set) => ({
  selectedCollection: defaultCollection,
  setCollection: (selectedCollection) => set(() => ({ selectedCollection }))
}))