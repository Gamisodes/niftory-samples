import { COLLECTIONS_PATH, EServerType, SERVER_TAG } from "src/lib/const"
import { FlowCollections } from "src/lib/flowConnector"
import { DavisCollection } from "src/const/GamisodesCollection"
import { ICollection } from "src/lib/flowConnector/types"
// import danilCollection from 'src/const/answer.json'

function waitforme(millisec) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("")
    }, millisec)
  })
}

const flow = FlowCollections.create()

const AVAILABLE_LIST = [EServerType.STAGING, EServerType.PREPORD]

export const BlockchainRequest = {
  async getList(wallet: string) {
    if (process.env.NODE_ENV === "development") {
      console.log("development")
      await waitforme(3000)
      return DavisCollection
    } else if (AVAILABLE_LIST.includes(SERVER_TAG)) {
      console.log("feature flag: ", SERVER_TAG)
      const response = await flow.getCollectionsData(
        wallet,
        process.env.NEXT_PUBLIC_COLLECTION_PATH.split(";")
      )
      return response[COLLECTIONS_PATH[0]]
    }

    console.log("not available")
    return []
  },
  async getSpecificNFT(wallet: string, collection: string, ids: string[]): Promise<ICollection> {
    if (process.env.NODE_ENV === "development") {
      console.log("development")
      await waitforme(3000)
      return { items: [], remained: [] } as ICollection
    } else if (AVAILABLE_LIST.includes(SERVER_TAG)) {
      console.log("feature flag: ", SERVER_TAG)
      const response = await flow.getTokensByIds(wallet, collection, ids)
      return response
    }
    console.log("not available")
    return { items: [], remained: [] } as ICollection
  },
}
