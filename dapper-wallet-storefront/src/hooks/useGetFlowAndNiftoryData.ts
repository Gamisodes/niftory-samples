import { useNftsByWalletQuery } from "generated/graphql"
import { useCollectionMainInterface } from "./useCollectionMainInterface"
import { useFlowCollectionData } from "./useFlowCollectionData"

export function useGetFlowAndNiftoryData (currentUser) {
    const [nftsByWalletResponse] = useNftsByWalletQuery({
      variables: { address: currentUser?.addr },
      pause: !currentUser?.addr,
      requestPolicy: "cache-and-network",
    })
    const { gamisodesCollections, loading} = useFlowCollectionData(currentUser?.addr)
    const allCollections = useCollectionMainInterface(gamisodesCollections, nftsByWalletResponse)

    return {
      isLoading: loading || nftsByWalletResponse?.fetching, 
      allCollections
    }
}