export const DEFAULT_NFT_PRICE = +process.env.NEXT_PUBLIC_DEFAULT_PRICE_FOR_NFT ?? 25
export const WEBSITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? ""
export enum EServerType {
  STAGING = "staging",
  PREPORD = "preprod",
  PRODUCTION = "production",
  NO_MATCH = "no-match",
}
export const SERVER_TAG: EServerType = Object.values(EServerType).includes(
  process.env.NEXT_PUBLIC_SERVER_TAG as EServerType
)
  ? (process.env.NEXT_PUBLIC_SERVER_TAG as EServerType)
  : EServerType.NO_MATCH
