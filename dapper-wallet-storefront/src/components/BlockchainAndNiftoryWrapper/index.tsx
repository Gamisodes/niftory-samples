import { PropsWithChildren, useEffect } from "react"
import { useGetFromBlockchain } from "src/hooks/nftDB/useGetFromBlockchain"
import { useGetFromCustodialWallet, useGetFromNiftory } from "src/hooks/nftDB/useGetFromNiftory"
import { useCollectionMainInterface } from "src/hooks/useCollectionMainInterface"
import { useWalletContext } from "src/hooks/useWalletContext"
import { INftStore, useNftsStore } from "src/store/nfts"
import { getCurrentUser, useAuth } from "src/store/users"
import { shallow } from "zustand/shallow"

const setNftState = (state: INftStore) => state.setLoading

export const BlockchainAndNiftoryWrapper = ({ children }: PropsWithChildren) => {
  const { currentUser } = useWalletContext()
  const [user] = useAuth(getCurrentUser, shallow)

  const { isFetchingNextPage, data: niftoryCollections, isLoading, isSuccess } = useGetFromNiftory()
  const {
    isFetchingNextPage: isFetchingNextPageCustodial,
    data: custodialCollection,
    isLoading: isLoadingCustodial,
    isSuccess: isSuccessCustodial,
  } = useGetFromCustodialWallet()

  const { data: blockchainCollections, isLoading: blockChainIsLoading } = useGetFromBlockchain()

  useCollectionMainInterface({
    BlockchainCollections: blockchainCollections,
    Dapper: {
      collection: niftoryCollections,
      isSuccess: isSuccessCustodial,
    },
    NiftoryCustodial: {
      collection: custodialCollection,
      isSuccess: isSuccess,
    },
  })

  const setLoading = useNftsStore(setNftState)
  useEffect(() => {
    console.log({ currentUser })

    let loadingStatus = true
    if (currentUser?.addr && user?.custodialWallet?.niftoryWalletId) {
      loadingStatus =
        blockChainIsLoading ||
        isLoading ||
        isFetchingNextPage ||
        isFetchingNextPageCustodial ||
        isLoadingCustodial
    } else if (currentUser?.addr && !user?.custodialWallet?.niftoryWalletId) {
      loadingStatus = blockChainIsLoading || isLoading || isFetchingNextPage
    } else if (!currentUser?.addr && user?.custodialWallet?.niftoryWalletId) {
      loadingStatus = isFetchingNextPageCustodial || isLoadingCustodial
    }

    setLoading(loadingStatus)
  }, [
    user?.email,
    currentUser,
    blockChainIsLoading,
    isLoading,
    isSuccess,
    niftoryCollections?.pages,
    isFetchingNextPageCustodial,
    isLoadingCustodial,
    isSuccessCustodial,
  ])

  return <>{children}</>
}
