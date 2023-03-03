import { useInfiniteNftsByWalletQuery, useNftsByWalletQuery } from "generated/graphql"
import { useEffect } from "react"
import { useGetBlockchainNFT } from "src/services/blockchain/hooks"
import { INftStore, useNftsStore } from "src/store/nfts"
import shallow from "zustand/shallow"
import { useCollectionMainInterface } from "./useCollectionMainInterface"
import { EServerType, SERVER_TAG } from "src/lib/const"

const setNftState = (state: INftStore) => state.setNfts

export function useGetFlowAndNiftoryData(currentUser) {
  const AVAILABLE_LIST = [EServerType.STAGING, EServerType.PREPORD]
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

  const { fetchNextPage, isFetchingNextPage, hasNextPage } = query

  
  useEffect(() => {
    if (AVAILABLE_LIST.includes(SERVER_TAG)) {
      if (hasNextPage) {
        fetchNextPage()
      }
    }
  }, [hasNextPage])

  // useEffect(() => {
  //   const fetchNiftory = async () => {
  //     if (AVAILABLE_LIST.includes(SERVER_TAG)) {
  //       const data = await fetchNextPage()
  //       let cursor = data.data.pages.at(-1).nftsByWallet.cursor
  //       console.log({data, cursor});
        
  //       while (cursor !== null) {
  //         await fetchNextPage()
  //       }
  //     }
  //   }
  //   fetchNiftory()
  // }, [])

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
      isLoading: loading || query.isLoading || isFetchingNextPage,
      totalAmount: gamisodesAmount + brainTrainAmount,
    })
  }, [
    counter,
    loading,
    query?.isLoading,
    query?.isSuccess,
    gamisodesAmount,
    brainTrainAmount,
    query?.data?.pages,
  ])
}
