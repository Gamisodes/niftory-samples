import { NextApiHandler } from "next"
import { getBackendGraphQLClient } from "../../lib/BackendGraphQLClient"
import {
  RegisterWalletDocument,
  RegisterWalletMutation,
  RegisterWalletMutationVariables,
} from "../../../generated/graphql"
import { getAddressFromCookie } from "../../lib/cookieUtils"
import { getSession } from "next-auth/react"
import prisma from "src/lib/prisma"

const handler: NextApiHandler = async (req, res) => {
  const backendGQLClient = await getBackendGraphQLClient()
  if (req.method !== "POST") {
    res.status(405).json({
      errors: ["Method not allowed, this endpoint only supports POST"],
      success: false,
    })
    return
  }

  const session = await getSession({ req })

  if (!session || !session.user.email) {
    res.status(401).json({
      errors: ["Must be signed in to application register a wallet."],
      success: false,
    })
    return
  }
  const email = session.user.email

  const address: string = getAddressFromCookie(req, res)
  if (!address) {
    res.status(401).json({
      errors: ["Must consist a wallet to register it."],
      success: false,
    })
    return
  }

  try {
    const response = await backendGQLClient.request<
      RegisterWalletMutation,
      RegisterWalletMutationVariables
    >(RegisterWalletDocument, { address })
    const userInstance = await prisma.user.findUnique({
      where: { email },
      include: { wallet: true },
    })
    if (userInstance && !userInstance?.wallet) {
      const wallet = await prisma.wallet.findUnique({ where: { address } })
      if (wallet) {
        res.status(500).json({
          error: ["This wallet exist"],
          success: false,
        })
      }
      await prisma.wallet.create({
        data: {
          address,
          user: { connect: { email } },
        },
      })
    }

    res.status(200).json({
      data: response,
      success: true,
    })
  } catch (error) {
    res.status(500).json({
      error: [error],
      success: false,
    })
  }
}

export default handler
