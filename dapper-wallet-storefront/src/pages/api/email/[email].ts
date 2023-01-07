import axios from "axios"
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import { getAddressFromCookie } from "src/lib/cookieUtils"

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(405).send("Method not allowed, this endpoint only supports POST")
    return
  }

  const address = getAddressFromCookie(req, res)
  if (!address) {
    res.status(401).send("Must be signed in to purchase NFTs.")
    return
  }

  const email = req.query.email as string
  if (!email) {
    res.status(400).send("email is required")
    return
  }

  try {
    const body = {
      g: "Wugani",
      $fields: "$first_name, $parent ,$source",
      email: email ?? "",
      $first_name: "",
      $parrent: "",
      $source: "Sign up form",
    }
    const newData = new URLSearchParams(body)
    const data = await axios
      .post(process.env.NEXT_PUBLIC_KLAVIYO_URL ?? "", newData, {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "cache-control": "no-cache",
        },
      })
      .then((val) => val.data)
    res.status(200).json({ data, success: true })
  } catch (error) {
    res.status(500).json({
      error: [error],
      success: false,
    })
  }
}

export default handler
