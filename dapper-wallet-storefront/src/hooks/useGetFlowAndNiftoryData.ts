import { useNftsByWalletQuery } from "generated/graphql"
import { useFlowCollectionData } from "./useFlowCollectionData"

export function useGetFlowAndNiftoryData (currentUser) {
    const [nftsByWalletResponse] = useNftsByWalletQuery({
      variables: { address: currentUser?.addr },
      pause: !currentUser?.addr,
      requestPolicy: "cache-and-network",
    })
    const {collections, loading} = useFlowCollectionData(currentUser?.addr)

    return {isLoading: loading || nftsByWalletResponse?.fetching, collections, nftsByWalletResponse}
}