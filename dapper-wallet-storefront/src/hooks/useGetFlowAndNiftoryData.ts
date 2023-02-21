import { useNftsByWalletQuery } from "generated/graphql"
import { useEffect } from "react"
import { useNftsStore } from "src/store/nfts"
import { useCollectionMainInterface } from "./useCollectionMainInterface"
import { useFlowCollectionData } from "./useFlowCollectionData"

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

  const setNfts = useNftsStore((state) => state.setNfts)
  
  useEffect(() => {
    setNfts({ allCollections, counter, isLoading: loading || nftsByWalletResponse?.fetching })
  }, [allCollections, counter, loading, nftsByWalletResponse?.fetching])
}
