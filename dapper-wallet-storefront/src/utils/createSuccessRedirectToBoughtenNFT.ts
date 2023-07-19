import { WALLET_TYPE_SOURCE } from "consts/const"
import { WalletType } from "src/typings/INfts"

type ICreateSuccessRedirectToBoughtNFT = {
  collectionName: string
  nftID: string
  title?: string
  edition?: number
  walletTypeSource?: WalletType
}
export function createSuccessRedirectToBoughtenNFT({
  collectionName,
  nftID,
  walletTypeSource,
  edition,
  title,
}: ICreateSuccessRedirectToBoughtNFT) {
  const params = new URLSearchParams()

  if (walletTypeSource) params.set(WALLET_TYPE_SOURCE, walletTypeSource)
  if (edition) params.set("edition", `${edition}`)
  if (title) params.set("title", `${title}`)

  return `/collection/${collectionName}/${nftID}?${params}`
}
