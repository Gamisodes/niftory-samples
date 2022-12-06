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
