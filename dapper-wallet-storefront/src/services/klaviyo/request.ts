import { authApi } from "../api/baseApi"

interface IPostKlaviyoEmail {
  email: string
  year: string
  month: string
}

export const KlaviyoRequest = {
  async postKlaviyoEmail({ email, year, month }: IPostKlaviyoEmail) {
    const body = {
      g: "Wugani",
      $fields: "$first_name, $parent, Birthday Year, Birthday Month ,$source",
      email: email ?? "",
      $first_name: "",
      $parrent: "",
      "Birthday Year": year ?? "1",
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
