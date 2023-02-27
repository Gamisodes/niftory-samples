import { useEffect, useState } from "react"
import { FlowCollections } from "src/lib/flowConnector"
import { DavisCollection } from 'src/const/GamisodesCollection'
// import danilCollection from 'src/const/answer.json'


function waitforme(millisec) {
  return new Promise(resolve => {
    setTimeout(() => { resolve('') }, millisec);
  })
}

const flow = FlowCollections.create()

export function useFlowCollectionData(wallet: string) {
  const [gamisodesCollections, setCollections] = useState(undefined)
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    const getCollections = async () => {
      try {
        setLoading(true)
        setCollections([]);
        // if (process.env.NODE_ENV === "development") {
        //   await waitforme(3000)
        //   setCollections(DavisCollection)
        // } else {
        //   const response = await flow.getCollectionsData(
        //     wallet,
        //     process.env.NEXT_PUBLIC_COLLECTION_PATH.split(";")
        //   )
        //   console.log('FlowResponse', response);
        //   setCollections(response["GamisodesCollection"])
        // }
      } catch {
      } finally {
        setLoading(false)
      }
    }
    getCollections()
  }, [wallet])
  return { gamisodesCollections, loading }
}
