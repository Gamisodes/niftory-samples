import { NextApiHandler } from "next"
import { getBackendGraphQLClient } from "../../lib/BackendGraphQLClient"
import {
  ReadyWalletDocument,
  ReadyWalletMutation,
  ReadyWalletMutationVariables,
} from "../../../generated/graphql"
import { getAddressFromCookie } from "../../lib/cookieUtils"

const handler: NextApiHandler = async (req, res) => {
  const backendGQLClient = await getBackendGraphQLClient()

  if (req.method !== "POST") {
    res.status(405).json({
      success: false,
      errors: ["Method not allowed, this endpoint only supports POST"],
    })
    return
  }

  const address = getAddressFromCookie(req, res)
  if (!address) {
    res.status(401).json({ errors: ["Must be signed in to ready wallet."], success: false })
  }
  const response = await backendGQLClient.request<
    ReadyWalletMutation,
    ReadyWalletMutationVariables
  >(ReadyWalletDocument, { address })
  res.status(200).json({
    data: response,
    success: true,
  })
}

export default handler
