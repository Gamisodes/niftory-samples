import { NextApiHandler } from "next"
import { getBackendGraphQLClient } from "../../lib/BackendGraphQLClient"
import {
  ReadyWalletDocument,
  ReadyWalletMutation,
  ReadyWalletMutationVariables,
  TransferNftToWalletDocument,
  TransferNftToWalletMutation,
  TransferNftToWalletMutationVariables,
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
  const address = req?.body?.address;
  const nftModelId = req?.body?.nftModelId;

  if (!address || !nftModelId) {
    res.status(405).json({
      success: false,
      errors: ["Error, there is no data"],
    })
    return
  }

  console.log(address, nftModelId);
  
  const transfer = await backendGQLClient.request<TransferNftToWalletMutation, TransferNftToWalletMutationVariables>(TransferNftToWalletDocument, {nftModelId, address})
  
  res.status(200).json({
    data: transfer,
    success: true,
  })
}

export default handler
