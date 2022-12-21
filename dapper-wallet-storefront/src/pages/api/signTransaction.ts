import { NextApiHandler } from "next"
import { gql } from "graphql-request"
import { getBackendGraphQLClient } from "../../lib/BackendGraphQLClient"
import { getAddressFromCookie } from "../../lib/cookieUtils"
import {
  SignTransactionForDapperWalletDocument,
  SignTransactionForDapperWalletMutation,
  SignTransactionForDapperWalletMutationVariables,
} from "generated/graphql"

const SignTransactionForDapperWallet = gql`
  mutation SignTransactionForDapperWallet($transaction: String) {
    signTransactionForDapperWallet(transaction: $transaction)
  }
`

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).send("Method not allowed, this endpoint only supports POST")
    return
  }

  const address = getAddressFromCookie(req, res)
  if (!address) {
    res.status(401).send("Must be signed in to purchase NFTs.")
    return
  }

  const input = req.body

  if (input?.transaction == null) {
    res.status(400).send("'transaction' isn't specified in the request body")
    return
  }

  try {
    const backendGQLClient = await getBackendGraphQLClient()

    const checkoutResponse = await backendGQLClient.request<
      SignTransactionForDapperWalletMutation,
      SignTransactionForDapperWalletMutationVariables
    >(SignTransactionForDapperWalletDocument, {
      transaction: input.transaction,
    })
    res.status(200).json({ data: checkoutResponse.signTransactionForDapperWallet, success: true })
  } catch (error) {
    console.log("Error: ", error)
    res.status(500).json({
      error: [error],
      success: false,
    })
  }
}

export default handler
