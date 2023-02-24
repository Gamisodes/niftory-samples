import { CompositeSignature } from "@onflow/fcl"
import { authApi } from "../api/baseApi"

interface IPostVerifyWallet {
  signature: CompositeSignature[]
}

interface IPostCheckWalletOwner {
  ourEmail: string
  loggedWithAddress: string
}
export const WalletRequest = {
  async postReadyWallet() {
    return authApi.post("/api/readyWallet").then((val) => val.data)
  },
  async postRegisterWallet() {
    return authApi.post("/api/registerWallet").then((val) => val.data)
  },
  async postVerifyWallet({ signature }: IPostVerifyWallet) {
    return authApi
      .post("/api/verifyWallet", { signedVerificationCode: signature })
      .then((val) => val.data)
  },
  async postCheckWalletOwner({ ourEmail, loggedWithAddress }: IPostCheckWalletOwner) {
    return authApi
      .post("/api/checkWalletOwner", { ourEmail, loggedWithAddress })
      .then((val) => val.data)
  },
}
