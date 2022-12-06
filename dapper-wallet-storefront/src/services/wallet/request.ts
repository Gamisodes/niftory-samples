import { authApi } from "../api/baseApi"

export const WalletRequest = {
  async postReadyWallet() {
    return authApi.post("/api/readyWallet").then((val) => val.data)
  },
}
