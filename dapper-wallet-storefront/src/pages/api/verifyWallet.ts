import { NextApiHandler } from "next"
import { getBackendGraphQLClient } from "../../lib/BackendGraphQLClient"
import {
  VerifyWalletDocument,
  VerifyWalletMutation,
  VerifyWalletMutationVariables,
} from "../../../generated/graphql"
import { getAddressFromCookie } from "../../lib/cookieUtils"

const handler: NextApiHandler = async (req, res) => {
  const backendGQLClient = await getBackendGraphQLClient()

  if (req.method !== "POST") {
    res.status(405).json({
      errors: ["Method not allowed, this endpoint only supports POST"],
      success: false,
    })
    return
  }

  const address = getAddressFromCookie(req, res)
  if (!address) {
    res.status(401).json({
      errors: ["Must be signed in to verify wallet."],
      success: false,
    })
    return
  }

  const signedVerificationCode = req.body?.signedVerificationCode
  if (!signedVerificationCode) {
    res.status(400).json({
      errors: ['"signedVerificationCode" is required.'],
      success: false,
    })
  }

  try {
    const postData = await backendGQLClient.request<
      VerifyWalletMutation,
      VerifyWalletMutationVariables
    >(VerifyWalletDocument, {
      address,
      signedVerificationCode,
    })
    res.status(200).json({
      data: postData,
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
