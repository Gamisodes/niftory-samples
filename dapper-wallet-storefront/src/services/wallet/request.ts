import { authApi } from "../api/baseApi"

export const WalletRequest = {
  async postReadyWallet() {
    return authApi.post("/api/readyWallet").then((val) => val.data)
  },
  async postRegisterWallet() {
    return authApi.post("/api/registerWallet").then((val) => val.data)
  },
  async postVerifyWallet() {
    return authApi.post("/api/verifyWallet").then((val) => val.data)
  },
}
