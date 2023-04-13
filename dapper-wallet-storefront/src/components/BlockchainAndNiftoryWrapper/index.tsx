import React, { PropsWithChildren, useEffect } from "react"
import { useGetFromBlockchain } from "src/hooks/nftDB/useGetFromBlockchain"
import { useGetFromNiftory } from "src/hooks/nftDB/useGetFromNiftory"
import { useCollectionMainInterface } from "src/hooks/useCollectionMainInterface"
import { INftStore, useNftsStore } from "src/store/nfts"

const setNftState = (state: INftStore) => state.setLoading

export const BlockchainAndNiftoryWrapper = ({ children }: PropsWithChildren) => {
  const { isFetchingNextPage, data: niftoryCollections, isLoading, isSuccess } = useGetFromNiftory()
  const { data: blockchainCollections, isLoading: blockChainIsLoading } = useGetFromBlockchain()
  useCollectionMainInterface(blockchainCollections, niftoryCollections, isSuccess)
  
  const setLoading = useNftsStore(setNftState)

  useEffect(() => {
    setLoading(blockChainIsLoading || isLoading || isFetchingNextPage)
  }, [blockChainIsLoading, isLoading, isSuccess, niftoryCollections?.pages])

  return <>{children}</>
}
