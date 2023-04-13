import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { BlockchainRequest } from "./request"

export const blockchainKeys = {
  all: ["blockchain"] as const,
  lists: (wallet: string) => [...blockchainKeys.all, "list", wallet] as const,
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
