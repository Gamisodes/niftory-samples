import { useEffect, useState } from "react"
import { FlowCollections } from "src/lib/flowConnector"
import { DavisCollection } from 'src/const/GamisodesCollection'

function waitforme(millisec) {
  return new Promise(resolve => {
      setTimeout(() => { resolve('') }, millisec);
  })
}

const flow = FlowCollections.create()

export function useFlowCollectionData(wallet: string) {
  const [collections, setCollections] = useState(undefined)
  const [loading, setLoading] = useState(false)

  useEffect(() => {

    const getCollections = async () => {
      try {
        setLoading(true)
        await waitforme(3000)
        // const response = await flow.getCollectionsData(
        //   wallet,
        //   process.env.NEXT_PUBLIC_COLLECTION_PATH.split(";")
        // )
        setCollections(DavisCollection)
      } catch {
      } finally {
        setLoading(false)
      }
    }
    getCollections()
  }, [])
  return { collections, loading }
}
