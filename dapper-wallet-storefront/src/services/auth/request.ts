import { IUser } from "src/typings/IUser"
import { authApi } from "../api/baseApi"

export interface IPostMailAuthLink {
  email: string
  redirectUrl?: string
  nftModelId?: string
  captcha?: string
}
export const AuthRequest = {
  async getMyAuthStatus() {
    return authApi.get<IUser>("/server/auth/me").then((val) => val.data)
  },
  async getMailAuthLink({ email, redirectUrl, nftModelId, captcha }: IPostMailAuthLink) {
    const params = new URLSearchParams()
    if (redirectUrl) params.set("redirectUrl", redirectUrl)
    if (nftModelId) params.set("nftModelId", nftModelId)
    return authApi
      .post("/server/auth/mail", { email, "g-recaptcha": captcha }, { params })
      .then((val) => val.data)
  },
  async logout() {
    return authApi.delete("/server/auth/logout").then((val) => val.data)
  },
}
