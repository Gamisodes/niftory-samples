import {
  WalletByAddressDocument,
  WalletByAddressQuery,
  WalletByAddressQueryVariables,
} from "generated/graphql"
import { NextApiHandler } from "next"
import { getBackendGraphQLClient } from "src/lib/BackendGraphQLClient"
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
    res.status(405).json({ errors: ["Must have content"], success: false })
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: ourEmail,
      },
      include: {
        wallet: true,
      },
    })

    const wallet = await prisma.wallet.findUnique({
      where: {
        address: loggedWithAddress,
      },
    })
    //If this wallet don't exist at all and you don't have wallet
    if (!wallet && user?.wallet === null) {
      const backendGQLClient = await getBackendGraphQLClient()
      const response = await backendGQLClient.request<
        WalletByAddressQuery,
        WalletByAddressQueryVariables
      >(WalletByAddressDocument, { address: loggedWithAddress })
      const walletByAddress = response?.walletByAddress ?? null
      //If this wallet not exist at all - we might wan't create it in future
      if (!walletByAddress) {
        res.status(200).json({ shouldLogout: false, success: true })
        return
      } else {
        //If for some reason, this wallet marked as registered and our user didn't have assigned it yet - let's do this
        await prisma.wallet.create({
          data: {
            address: loggedWithAddress,
            user: { connect: { email: user.email } },
          },
        })
      }
      res.status(200).json({ shouldLogout: false, success: true })
      return
    }
    //If this wallet used by me
    else if (wallet && wallet.userEmail === ourEmail) {
      res.status(200).json({ shouldLogout: false, success: true })
      return
    }
    res.status(200).json({ shouldLogout: true, success: true })
  } catch (error) {
    res.status(500).json({
      success: false,
      errors: ["Something occurred"],
    })
  }
}

export default handler
