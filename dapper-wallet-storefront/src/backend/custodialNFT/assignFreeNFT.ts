import { convertNumber } from "consts/helpers"
import {
  NftModelDocument,
  NftModelQuery,
  NftModelQueryVariables,
  NftsByWalletDocument,
  NftsByWalletQuery,
  NftsByWalletQueryVariables,
  TransferNftToWalletDocument,
  TransferNftToWalletMutation,
  TransferNftToWalletMutationVariables,
} from "generated/graphql"
import { GraphQLClient } from "graphql-request"
import { getBackendGraphQLClient } from "src/lib/BackendGraphQLClient"
import { DEFAULT_NFT_PRICE } from "src/lib/const"
import { EErrorIdentity } from "src/pages/api/nftModel/[nftModelId]/initiateCheckout"
import { EitherField } from "src/typings/EitherField"
import { getNftModelById } from "../nft/getNftById"

type IAssignFreeNFTArgs = {
  nftModelToAssign: NftModelQuery | string
  gqclient?: GraphQLClient
} & EitherField<{ userAddress?: string; walletId?: string }>

export async function assignFreeNftToWallet({
  userAddress: address,
  walletId,
  gqclient: _gqclient,
  nftModelToAssign: _nftModel,
}: IAssignFreeNFTArgs): Promise<{
  success: boolean
  data: TransferNftToWalletMutation | null
  error: string
}> {
  try {
    const gqclient = _gqclient ?? (await getBackendGraphQLClient())
    const { data: nftModelResponse } = await getNftModelById({ gqclient, nftModelId: _nftModel })
    const nftModelId = nftModelResponse?.nftModel?.id
    const price = convertNumber(nftModelResponse?.nftModel?.attributes?.price, DEFAULT_NFT_PRICE)
    if (price > 0) {
      return { success: false, error: "This is NFT is not free", data: null }
    } else if (price === 0) {
      const maxNftForUser = convertNumber(nftModelResponse?.nftModel?.attributes?.maxNftForUser)
      if (maxNftForUser === 0) {
        const transferToUser = await gqclient.request<
          TransferNftToWalletMutation,
          TransferNftToWalletMutationVariables
        >(TransferNftToWalletDocument, { address, walletId, nftModelId })
        console.log("PRICE:", price, transferToUser)
        return {
          success: true,
          data: transferToUser,
          error: null,
        }
      }
      let cursor = ""
      const nftsItems: NftsByWalletQuery["nftsByWallet"]["items"] = []

      do {
        const nfts = await gqclient.request<NftsByWalletQuery, NftsByWalletQueryVariables>(
          NftsByWalletDocument,
          { address, walletId, filter: { nftModelIds: [nftModelId] }, cursor }
        )
        nftsItems.push(...nfts.nftsByWallet.items)
        cursor = nfts.nftsByWallet.cursor
      } while (typeof cursor === "string")

      if (nftsItems.length < maxNftForUser) {
        const transferToUser = await gqclient.request<
          TransferNftToWalletMutation,
          TransferNftToWalletMutationVariables
        >(TransferNftToWalletDocument, { address, walletId, nftModelId })
        return {
          success: true,
          data: transferToUser,
          error: null,
        }
      } else {
        return {
          success: false,
          data: null,
          error: EErrorIdentity.NFT_LIMIT_REACHED,
        }
      }
    } else {
      return { success: false, data: null, error: EErrorIdentity.NO_PRICE }
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      data: null,
      error: "Error while attaching free NFT",
    }
  }
}
