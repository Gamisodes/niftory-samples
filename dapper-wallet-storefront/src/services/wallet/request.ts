import { CompositeSignature } from "@onflow/fcl"
import {
  ReadyWalletMutation,
  RegisterWalletMutation,
  VerifyWalletMutation,
} from "generated/graphql"
import { authApi } from "../api/baseApi"

interface IPostVerifyWallet {
  signature: CompositeSignature[]
}

interface IPostCheckWalletOwner {
  loggedWithAddress: string
}
export const WalletRequest = {
  async postReadyWallet() {
    return authApi
      .post<{ data: ReadyWalletMutation; success: boolean }>("/server/wallet/ready")
      .then((val) => val.data)
  },
  async postRegisterWallet() {
    return authApi
      .post<{ data: RegisterWalletMutation; success: boolean }>("/server/wallet/register")
      .then((val) => val.data)
  },
  async postVerifyWallet({ signature }: IPostVerifyWallet) {
    return authApi
      .post<{ data: VerifyWalletMutation; success: boolean }>("/server/wallet/verify", {
        signedVerificationCode: signature,
      })
      .then((val) => val.data)
  },
  async postCheckWalletOwner({ loggedWithAddress }: IPostCheckWalletOwner) {
    return authApi
      .post("/server/wallet/checkOwner", {
        loggedWithAddress,
      })
      .then((val) => val.data)
  },
}
