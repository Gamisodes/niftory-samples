import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query"
import { ICollection } from "src/lib/flowConnector/types"
import { BlockchainRequest } from "./request"

export const blockchainKeys = {
  all: ["blockchain"] as const,
  lists: (wallet: string) => [...blockchainKeys.all, "list", wallet] as const,
  specificById: (wallet: string, collection: string, id: string[]) =>
    [...blockchainKeys.lists(wallet), collection, id] as const,
}

interface BlockchainGetListQueryVariables {
  wallet: string
}
type ISuccessResponseGetListReady = Awaited<ReturnType<typeof BlockchainRequest.getList>>
interface IErrorsResponseGetList {
  errors: string[]
  success: boolean
}
export function useGetBlockchainNFT(
  variables: BlockchainGetListQueryVariables,
  options?: UseQueryOptions<ISuccessResponseGetListReady, IErrorsResponseGetList>
) {
  return useQuery<ISuccessResponseGetListReady, IErrorsResponseGetList>(
    blockchainKeys.lists(variables.wallet),
    () => BlockchainRequest.getList(variables.wallet),
    options
  )
}
interface BlockchainGetListBySpecificNFTQueryVariables {
  wallet: string
  collection: string
  ids: string[]
}
type ISuccessResponseGetSpecificNftReady = Awaited<
  ReturnType<typeof BlockchainRequest.getSpecificNFT>
>
interface IErrorsResponseGetSpecificList {
  errors: string[]
  success: boolean
}
export function useGetBlockchainNFTsById(
  variables: BlockchainGetListBySpecificNFTQueryVariables,
  options?: UseQueryOptions<ISuccessResponseGetSpecificNftReady, IErrorsResponseGetSpecificList>
) {
  return useQuery<ISuccessResponseGetSpecificNftReady, IErrorsResponseGetList>(
    blockchainKeys.lists(variables.wallet),
    () => BlockchainRequest.getSpecificNFT(variables.wallet, variables.collection, variables.ids),
    options
  )
}
