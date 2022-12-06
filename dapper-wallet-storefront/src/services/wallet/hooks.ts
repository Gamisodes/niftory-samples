import { CompositeSignature } from "@onflow/fcl"
import { useMutation } from "@tanstack/react-query"
import { WalletRequest } from "./request"

export const walletKeys = {
  all: ["wallet"] as const,
  lists: (userId: number) => [...walletKeys.all, "list", userId] as const,
}
interface ISuccessResponseFromReadyWallet {
  data: unknown
  success: boolean
}
interface IErrorsResponseFromReadyWallet {
  errors: string[]
  success: boolean
}
export function useSendReadyWalletQuery() {
  return useMutation<ISuccessResponseFromReadyWallet, IErrorsResponseFromReadyWallet, void>(() =>
    WalletRequest.postReadyWallet()
  )
}
interface ISuccessResponseFromRegisterWallet {
  data: unknown
  success: boolean
}
interface IErrorsResponseFromRegisterWallet {
  errors: string[]
  success: boolean
}
export function useSendRegisterWalletQuery() {
  return useMutation<ISuccessResponseFromRegisterWallet, IErrorsResponseFromRegisterWallet, void>(
    () => WalletRequest.postRegisterWallet()
  )
}
interface ISuccessResponseFromVerifyWallet {
  data: unknown
  success: boolean
}
interface IErrorsResponseFromVerifyWallet {
  errors: string[]
  success: boolean
}
interface IVerifyWalletData {
  signature: CompositeSignature[]
}
export function useSendVerifyWalletQuery() {
  return useMutation<
    ISuccessResponseFromVerifyWallet,
    IErrorsResponseFromVerifyWallet,
    IVerifyWalletData
  >((props) => WalletRequest.postVerifyWallet(props))
}
