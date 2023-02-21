import { useNftsByWalletQuery } from "generated/graphql"
import { useEffect } from "react"
import { INftStore, useNftsStore } from "src/store/nfts"
import { useCollectionMainInterface } from "./useCollectionMainInterface"
import { useFlowCollectionData } from "./useFlowCollectionData"
import shallow from "zustand/shallow"

const setNftState = (state: INftStore) => state.setNfts

export function useGetFlowAndNiftoryData(currentUser) {
  const query = useNftsByWalletQuery(
    { address: currentUser?.addr },
    { enabled: !!currentUser?.addr, networkMode: "offlineFirst" }
  )

  const { gamisodesCollections, loading } = useFlowCollectionData(currentUser?.addr)

  const { allCollections, counter, gamisodesAmount, brainTrainAmount } = useCollectionMainInterface(
    gamisodesCollections,
    query
  )

  const setNfts = useNftsStore(setNftState, shallow)

  useEffect(() => {
    setNfts({
      allCollections,
      counter,
      isLoading: loading || query.isLoading,
      totalAmount: gamisodesAmount + brainTrainAmount,
    })
  }, [counter, loading, query?.isLoading, query?.isSuccess, gamisodesAmount, brainTrainAmount])
}
