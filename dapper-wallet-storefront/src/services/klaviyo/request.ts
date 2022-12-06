import { authApi } from "../api/baseApi"

interface IPostKlaviyoEmail {
  email: string
  day: string
  month: string
}

export const KlaviyoRequest = {
  async postKlaviyoEmail({ email, day, month }: IPostKlaviyoEmail) {
    const body = {
      g: "Wugani",
      $fields: "$first_name, $parent, Birthday Day, Birthday Month ,$source",
      email: email ?? "",
      $first_name: "",
      $parrent: "",
      "Birthday Day": day ?? "1",
      "Birthday Month": month ?? "January",
      $source: "Sign up form",
    }
    const newData = new URLSearchParams(body)

    return authApi
      .post(process.env.NEXT_PUBLIC_KLAVIYO_URL ?? "", newData, {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "cache-control": "no-cache",
        },
      })
      .then((val) => val.data)
  },
}
