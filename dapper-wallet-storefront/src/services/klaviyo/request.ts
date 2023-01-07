import { authApi } from "../api/baseApi"

interface IPostKlaviyoEmail {
  email: string
}

export const KlaviyoRequest = {
  async postKlaviyoEmail({ email }: IPostKlaviyoEmail) {
    // const body = {
    //   g: "Wugani",
    //   $fields: "$first_name, $parent ,$source",
    //   email: email ?? "",
    //   $first_name: "",
    //   $parrent: "",
    //   $source: "Sign up form",
    // }
    // const newData = new URLSearchParams(body)

    return (
      authApi
        .post(`/api/email/${email}`)
        // .post(process.env.NEXT_PUBLIC_KLAVIYO_URL ?? "", newData, {
        //   headers: {
        //     "content-type": "application/x-www-form-urlencoded",
        //     "cache-control": "no-cache",
        //   },
        // })
        .then((val) => val.data)
    )
  },
}
