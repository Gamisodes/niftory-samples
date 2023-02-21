import { convertNumber } from "consts/helpers"
import {
  CheckoutWithDapperWalletMutation,
  CheckoutWithDapperWalletMutationVariables,
  NftModelDocument,
  NftModelQuery,
  NftModelQueryVariables,
  NftsByWalletDocument,
  NftsByWalletQuery,
  NftsByWalletQueryVariables,
  TransferNftToWalletDocument,
  TransferNftToWalletMutation,
  TransferNftToWalletMutationVariables,
  WalletByAddressDocument,
  WalletByAddressQuery,
  WalletByAddressQueryVariables,
  WalletState,
} from "generated/graphql"
import { gql } from "graphql-request"
import { NextApiHandler } from "next"
import { DEFAULT_NFT_PRICE } from "src/lib/const"
import { getBackendGraphQLClient } from "../../../../lib/BackendGraphQLClient"
import { getAddressFromCookie } from "../../../../lib/cookieUtils"

const CheckoutWithDapperWallet = gql`
  mutation CheckoutWithDapperWallet(
    $nftModelId: ID!
    $address: String!
    $price: UnsignedFloat
    $expiry: UnsignedInt
  ) {
    checkoutWithDapperWallet(
      nftModelId: $nftModelId
      address: $address
      price: $price
      expiry: $expiry
    ) {
      cadence
      brand
      expiry
      nftId
      nftDatabaseId
      nftTypeRef
      price
      registryAddress
      setId
      templateId
      signerAddress
      signerKeyId
    }
  }
`

export enum EErrorIdentity {
  NO_PRICE = "NO_PRICE",
  NFT_LIMIT_REACHED = "NFT_LIMIT_REACHED",
}

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

  const { nftModelId } = req.query as { nftModelId: string }
  if (!nftModelId) {
    res.status(400).send("nftModelId is required")
    return
  }

  try {
    const backendGQLClient = await getBackendGraphQLClient()
    const walletByAddressQuery = await backendGQLClient.request<
      WalletByAddressQuery,
      WalletByAddressQueryVariables
    >(WalletByAddressDocument, { address })
    const state = walletByAddressQuery?.walletByAddress?.state
    if (state !== WalletState.Ready) {
      throw new Error(
        "To complete checkout, please visit My Account and connect a Dapper digital collectibles wallet."
      )
    }
    const nftModelResponse = await backendGQLClient.request<NftModelQuery, NftModelQueryVariables>(
      NftModelDocument,
      {
        id: nftModelId as string,
      }
    )
    const price = convertNumber(nftModelResponse?.nftModel?.attributes?.price, DEFAULT_NFT_PRICE)
    if (price > 0) {
      const checkoutResponse = await backendGQLClient.request<
        CheckoutWithDapperWalletMutation,
        CheckoutWithDapperWalletMutationVariables
      >(CheckoutWithDapperWallet, {
        nftModelId: nftModelId as string,
        address,
        price: convertNumber(+price, DEFAULT_NFT_PRICE),
        expiry: Number.MAX_SAFE_INTEGER,
      })
      res.status(200).json({ data: checkoutResponse.checkoutWithDapperWallet, success: true })
    } else if (price === 0) {
      const maxNftForUser = convertNumber(nftModelResponse?.nftModel?.attributes?.maxNftForUser)
      if (maxNftForUser === 0) {
        const transferToUser = await backendGQLClient.request<
          TransferNftToWalletMutation,
          TransferNftToWalletMutationVariables
        >(TransferNftToWalletDocument, { address, nftModelId })
        res.status(200).json({ data: transferToUser.transfer, success: true })
        return
      }
      let cursor = ""
      const nftsItems: NftsByWalletQuery["nftsByWallet"]["items"] = []
      do {
        const nfts = await backendGQLClient.request<NftsByWalletQuery, NftsByWalletQueryVariables>(
          NftsByWalletDocument,
          { address, filter: { nftModelIds: [nftModelId] }, cursor }
        )
        nftsItems.push(...nfts.nftsByWallet.items)
        cursor = nfts.nftsByWallet.cursor
      } while (typeof cursor === "string")
      if (nftsItems.length < maxNftForUser) {
        const transferToUser = await backendGQLClient.request<
          TransferNftToWalletMutation,
          TransferNftToWalletMutationVariables
        >(TransferNftToWalletDocument, { address, nftModelId })
        res.status(200).json({ data: transferToUser.transfer, success: true })
      } else {
        throw new Error(EErrorIdentity.NFT_LIMIT_REACHED)
      }
    } else {
      throw new Error(EErrorIdentity.NO_PRICE)
    }
  } catch (error) {
    res.status(500).json({
      error: [error?.message ? `${error?.message ?? ""}` : error],
      success: false,
    })
  }
}

export default handler
