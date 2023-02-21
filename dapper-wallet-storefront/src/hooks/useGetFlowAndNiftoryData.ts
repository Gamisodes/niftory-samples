import { useNftsByWalletQuery } from "generated/graphql"
import { useEffect } from "react"
import { useNftsStore } from "src/store/nfts"
import { useCollectionMainInterface } from "./useCollectionMainInterface"
import { useFlowCollectionData } from "./useFlowCollectionData"
import shallow from "zustand/shallow"

const setNftState = (state) => state.setNfts

export function useGetFlowAndNiftoryData(currentUser) {
  const [nftsByWalletResponse] = useNftsByWalletQuery({
    variables: { address: currentUser?.addr },
    pause: !currentUser?.addr,
    requestPolicy: "cache-and-network",
  })
  const { gamisodesCollections, loading } = useFlowCollectionData(currentUser?.addr)

  const { allCollections, counter } = useCollectionMainInterface(
    gamisodesCollections,
    nftsByWalletResponse
  )

  const setNfts = useNftsStore(setNftState, shallow)
  
  useEffect(() => {
    setNfts({ allCollections, counter, isLoading: loading || nftsByWalletResponse?.fetching })
  }, [allCollections, counter, loading, nftsByWalletResponse?.fetching])
}
