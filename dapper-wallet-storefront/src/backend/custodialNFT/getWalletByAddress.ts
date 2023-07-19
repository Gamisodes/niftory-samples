import {
  WalletByAddressDocument,
  WalletByAddressQuery,
  WalletByAddressQueryVariables,
} from "generated/graphql"
import { GraphQLClient } from "graphql-request"
import { getBackendGraphQLClient } from "src/lib/BackendGraphQLClient"

type IGetWalletByAddressArgs = {
  userAddress: string
  gqclient?: GraphQLClient
}

export async function getWalletByAddress({
  userAddress: address,
  gqclient: _gqclient,
}: IGetWalletByAddressArgs): Promise<{
  success: boolean
  data: WalletByAddressQuery | null
  error: string
}> {
  try {
    const gqclient = _gqclient ?? (await getBackendGraphQLClient())

    const wallet = await gqclient.request<WalletByAddressQuery, WalletByAddressQueryVariables>(
      WalletByAddressDocument,
      { address }
    )
    return {
      success: true,
      data: wallet,
      error: null,
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      data: null,
      error: "Error while getting wallet",
    }
  }
}
