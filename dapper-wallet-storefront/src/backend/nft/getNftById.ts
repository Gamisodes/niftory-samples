import {
  NftDocument,
  NftModelDocument,
  NftModelQuery,
  NftModelQueryVariables,
  NftQuery,
  NftQueryVariables,
} from "generated/graphql"
import { GraphQLClient } from "graphql-request"
import { getBackendGraphQLClient } from "src/lib/BackendGraphQLClient"

type IGetNftModelById = {
  nftModelId: NftModelQuery | string
  gqclient?: GraphQLClient
}

export async function getNftModelById({
  gqclient: _gqclient,
  nftModelId: _nftModel,
}: IGetNftModelById): Promise<{
  success: boolean
  data: NftModelQuery | null
  error: string
}> {
  try {
    const gqclient = _gqclient ?? (await getBackendGraphQLClient())
    const nftModelResponse =
      typeof _nftModel === "string"
        ? await gqclient.request<NftModelQuery, NftModelQueryVariables>(NftModelDocument, {
            id: _nftModel as string,
          })
        : _nftModel
    return { data: nftModelResponse, success: true, error: null }
  } catch (error) {
    console.error(error)

    return {
      success: false,
      data: null,
      error: "Error while getting nft by ID",
    }
  }
}

type IGetNftById = {
  nftId: NftQuery | string
  gqclient?: GraphQLClient
}

export async function getNftById({ gqclient: _gqclient, nftId: _nft }: IGetNftById): Promise<{
  success: boolean
  data: NftQuery | null
  error: string
}> {
  try {
    const gqclient = _gqclient ?? (await getBackendGraphQLClient())
    const nftModelResponse =
      typeof _nft === "string"
        ? await gqclient.request<NftQuery, NftQueryVariables>(NftDocument, {
            id: _nft as string,
          })
        : _nft
    return { data: nftModelResponse, success: true, error: null }
  } catch (error) {
    console.error(error)

    return {
      success: false,
      data: null,
      error: "Error while getting nft by ID",
    }
  }
}
