import { useNftsByWalletQuery } from "generated/graphql"
import { useEffect } from "react"
import { useGetBlockchainNFT } from "src/services/blockchain/hooks"
import { INftStore, useNftsStore } from "src/store/nfts"
import shallow from "zustand/shallow"
import { useCollectionMainInterface } from "./useCollectionMainInterface"

const setNftState = (state: INftStore) => state.setNfts

export function useGetFlowAndNiftoryData(currentUser) {
  const query = useNftsByWalletQuery(
    { address: currentUser?.addr },
    { enabled: !!currentUser?.addr, networkMode: "offlineFirst" }
  )

  const { data: gamisodesCollections, isLoading: loading } = useGetBlockchainNFT(
    {
      wallet: currentUser?.addr,
    },
    { enabled: !!currentUser?.addr, networkMode: "offlineFirst" }
  )
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
