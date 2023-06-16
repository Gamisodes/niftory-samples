import { EServerType, SERVER_TAG } from "src/lib/const"
import { FlowCollections } from "src/lib/flowConnector"
import { DavisCollection } from "src/const/GamisodesCollection"

function waitforme(millisec) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("")
    }, millisec)
  })
}

const flow = FlowCollections.create()

const AVAILABLE_LIST = [EServerType.PREPORD, EServerType.PRODUCTION]

export const BlockchainRequest = {
  async getList(wallet: string) {
    if (process.env.NODE_ENV === "development") {
      await waitforme(3000)
      return DavisCollection
    } else if (AVAILABLE_LIST.includes(SERVER_TAG)) {
      const response = await flow.getCollectionsData(
        wallet,
        process.env.NEXT_PUBLIC_COLLECTION_PATH.split(";")
      )
      return response["GamisodesCollection"]
    }
    console.log("not available")
    return []
  },
}
