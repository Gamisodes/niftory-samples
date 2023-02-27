export const DEFAULT_NFT_PRICE = +process.env.NEXT_PUBLIC_DEFAULT_PRICE_FOR_NFT ?? 25

enum EServerType {
  STAGING = "staging",
  PREPORD = "preprod",
  PRODUCTION = "production",
}
export const SERVER_TAG = process.env.NEXT_PUBLIC_SERVER_TAG as EServerType
