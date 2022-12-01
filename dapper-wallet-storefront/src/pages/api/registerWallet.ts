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
    res.status(405).send("Method not allowed, this endpoint only supports POST")
    return
  }

  const session = await getSession({ req })

  if (!session || !session.user.email) {
    res.status(401).send("Must be signed in to application register a wallet.")
    return
  }
  const email = session.user.email

  const address: string = getAddressFromCookie(req, res)
  if (!address) {
    res.status(401).send("Must consist a wallet to register it.")
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
    if (userInstance && !userInstance?.wallet)
      await prisma.wallet.create({
        data: {
          address,
          user: { connect: { email } },
        },
      })
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json(error)
  }
}

export default handler
