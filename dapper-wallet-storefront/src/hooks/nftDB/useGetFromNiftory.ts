import { useInfiniteNftsByWalletQuery } from "generated/graphql"
import { useEffect } from "react"
import { useWalletContext } from "../useWalletContext"

export function useGetFromNiftory() {
  const { currentUser } = useWalletContext()

  const query = useInfiniteNftsByWalletQuery(
    "cursor",
    { address: currentUser?.addr },
    {
      enabled: !!currentUser?.addr,
      networkMode: "offlineFirst",
      refetchInterval: 1000 * 60 * 10, // every 10 minutes,
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

  useEffect(() => {
      if (query.hasNextPage) {
        query.fetchNextPage()
      }
  }, [query.hasNextPage])

  return query
}
