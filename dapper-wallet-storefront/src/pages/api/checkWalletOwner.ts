import { NextApiHandler } from "next"
import { getBackendGraphQLClient } from "../../lib/BackendGraphQLClient"
import { ReadyWalletDocument } from "../../../generated/graphql"
import { getAddressFromCookie } from "../../lib/cookieUtils"
import prisma from "src/lib/prisma"

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({
      success: false,
      errors: ["Method not allowed, this endpoint only supports POST"],
    })
    return
  }

  const ourEmail: string | null = req.body.ourEmail
  const loggedWithAddress: string | null = req.body.loggedWithAddress
  if (!loggedWithAddress || !ourEmail) {
    res.status(401).json({ errors: ["Must have content"], success: false })
  }

  try {
    const wallet = await prisma.wallet.findUnique({
      where: {
        address: loggedWithAddress,
      },
    })
    // await prisma.user.findUnique({
    //   include: { wallet: true },
    //   where: {
    //     wallet: {
    //       address: loggedWithAddress,
    //     },
    //   },
    // })
    if (wallet && wallet.userEmail === ourEmail) {
      res.status(200).json({ mine: true, success: true })
      return
    }
    res.status(200).json({ mine: false, success: true })
  } catch {
    res.status(500).json({
      success: false,
      errors: ["Something occurred"],
    })
  }
}

export default handler
