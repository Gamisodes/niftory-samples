import { CompositeSignature } from "@onflow/fcl"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { MyWalletsQuery } from "generated/graphql"
import { WalletRequest } from "./request"

export const walletKeys = {
  all: ["wallet"] as const,
  lists: (userId: number) => [...walletKeys.all, "list", userId] as const,
}

type ISuccessResponseSendReady = Awaited<ReturnType<typeof WalletRequest.postReadyWallet>>
interface IErrorsResponseFromReadyWallet {
  errors: string[]
  success: boolean
}
export function useSendReadyWalletQuery() {
  const queryClient = useQueryClient()

  return useMutation<ISuccessResponseSendReady, IErrorsResponseFromReadyWallet>(
    () => WalletRequest.postReadyWallet(),
    {
      onSuccess(data) {
        queryClient.setQueriesData<MyWalletsQuery>(
          ["myWallets", { address: data?.data?.readyWallet?.address ?? "" }],
          (oldData) => {
            return {
              ...oldData,
              walletByAddress: {
                ...oldData.walletByAddress,
                ...data.data.readyWallet,
              },
            } as MyWalletsQuery
          }
        )
      },
    }
  )
}
type ISuccessResponseFromRegisterWallet = Awaited<
  ReturnType<typeof WalletRequest.postRegisterWallet>
>

interface IErrorsResponseFromRegisterWallet {
  errors: string[]
  success: boolean
}
export function useSendRegisterWalletQuery() {
  const queryClient = useQueryClient()

  return useMutation<ISuccessResponseFromRegisterWallet, IErrorsResponseFromRegisterWallet, void>(
    () => WalletRequest.postRegisterWallet(),
    {
      onSuccess(data) {
        queryClient.setQueriesData<MyWalletsQuery>(
          ["myWallets", { address: data?.data?.registerWallet?.address ?? "" }],
          (oldData) => {
            return {
              ...oldData,
              walletByAddress: {
                ...oldData.walletByAddress,
                ...data.data.registerWallet,
              },
            } as MyWalletsQuery
          }
        )
      },
    }
  )
}

type ISuccessResponseFromVerifyWallet = Awaited<ReturnType<typeof WalletRequest.postVerifyWallet>>
interface IErrorsResponseFromVerifyWallet {
  errors: string[]
  success: boolean
}
interface IVerifyWalletData {
  signature: CompositeSignature[]
}
export function useSendVerifyWalletQuery() {
  const queryClient = useQueryClient()

  return useMutation<
    ISuccessResponseFromVerifyWallet,
    IErrorsResponseFromVerifyWallet,
    IVerifyWalletData
  >((props) => WalletRequest.postVerifyWallet(props), {
    onSuccess(data) {
      queryClient.setQueriesData<MyWalletsQuery>(
        ["myWallets", { address: data?.data?.verifyWallet?.address ?? "" }],
        (oldData) => {
          return {
            ...oldData,
            walletByAddress: {
              ...oldData.walletByAddress,
              ...data.data.verifyWallet,
            },
          } as MyWalletsQuery
        }
      )
    },
  })
}

interface ISuccessResponseCheckWalletOwner {
  shouldLogout: boolean
  success: boolean
}
interface IErrorsResponseCheckWalletOwner {
  errors: string[]
  success: boolean
}
interface ICheckWalletOwnerData {
  loggedWithAddress: string
}
/**
 * To check if this account registered before. Return ``true`` - if this wallet registered by user. Return ``false`` - if this wallet registered by another person
 * @returns
 */
export function useCheckWalletOwnerQuery() {
  return useMutation<
    ISuccessResponseCheckWalletOwner,
    IErrorsResponseCheckWalletOwner,
    ICheckWalletOwnerData
  >((props) => WalletRequest.postCheckWalletOwner(props))
}
