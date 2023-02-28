import { useInfiniteNftsByWalletQuery, useNftsByWalletQuery } from "generated/graphql"
import { useEffect } from "react"
import { useGetBlockchainNFT } from "src/services/blockchain/hooks"
import { INftStore, useNftsStore } from "src/store/nfts"
import shallow from "zustand/shallow"
import { useCollectionMainInterface } from "./useCollectionMainInterface"

const setNftState = (state: INftStore) => state.setNfts

export function useGetFlowAndNiftoryData(currentUser) {
  const query = useInfiniteNftsByWalletQuery(
    "cursor",
    { address: currentUser?.addr },
    {
      enabled: !!currentUser?.addr,
      networkMode: "offlineFirst",
      getPreviousPageParam: (firstPage) => {
        return { cursor: firstPage.nftsByWallet.cursor ?? undefined, address: currentUser?.addr }
      },
      getNextPageParam(lastPage) {
        if (lastPage.nftsByWallet.cursor)
          return { cursor: lastPage.nftsByWallet.cursor ?? undefined, address: currentUser?.addr }
        return false
      },
    }
  )

  // console.log(query);

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
      totalAmount: gamisodesAmount + brainTrainAmount
    })
  }, [counter, loading, query?.isLoading, query?.isSuccess, gamisodesAmount, brainTrainAmount, query?.data?.pages])
}
