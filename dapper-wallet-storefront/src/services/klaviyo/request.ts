import { authApi } from "../api/baseApi"

interface IPostKlaviyoEmail {
  email: string
}

export const KlaviyoRequest = {
  async postKlaviyoEmail({ email }: IPostKlaviyoEmail) {
    const newData = new URLSearchParams({ email })

    return authApi
      .post(`/server/auth/email`, undefined, { params: newData })
      .then((val) => val.data)
  },
}
