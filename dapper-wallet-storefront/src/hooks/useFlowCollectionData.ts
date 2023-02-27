import { useEffect, useState } from "react"
import { FlowCollections } from "src/lib/flowConnector"
import { DavisCollection } from "src/const/GamisodesCollection"
import { EServerType, SERVER_TAG } from "src/lib/const"
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

export function useFlowCollectionData(wallet: string) {
  const [gamisodesCollections, setCollections] = useState(undefined)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getCollections = async () => {
      try {
        if (process.env.NODE_ENV === "development") {
          setLoading(true)
          console.log("development")
          await waitforme(3000)
          setCollections(DavisCollection)
        } else if (AVAILABLE_LIST.includes(SERVER_TAG)) {
          setLoading(true)
          console.log("feature flag: ", SERVER_TAG)
          const response = await flow.getCollectionsData(
            wallet,
            process.env.NEXT_PUBLIC_COLLECTION_PATH.split(";")
          )
          console.log("FlowResponse", response)
          setCollections(response["GamisodesCollection"])
        } else {
          console.log("not available")
          setCollections([])
        }
      } catch {
      } finally {
        setLoading(false)
      }
    }
    getCollections()
  }, [wallet])
  return { gamisodesCollections, loading }
}
