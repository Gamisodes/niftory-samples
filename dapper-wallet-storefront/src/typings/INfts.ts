export enum ENftType {
  COLLECTOR = "Collector’s Edition",
  TICKET = "Ticket",
  OPEN = "Open Edition",
  WRAPPER = "Wrapper",
  LIVE_DRAW = "Live Draw",
}
export enum ENftRarity {
  COMMON = "common",
  ULTRA_COMMON = "ultra-common",
  RARE = "rare",
  EPIC = "epic",
  LEGENDARY = "legendary",
  SUPER_LEGENDARY = "super-legendary",
}
export enum ENftCollection {
  GADGETS = "gadgets",
  // "VIP" its changed name for "Commemorative Card"
  VIP = "vip",
  MISSIONS = "missions",
  BRAIN_TRAIN = "braintrain",
  GAMISODES = "gamisodes",
}
export enum ENftSource {
  BLOCKCHAIN = "BlockChain",
  NIFTORY = "Niftory",
}

export interface INft {
  id: string
  title: string
  description: string
  source: ENftSource
  imageUrl: {
    contentType: string
    thumbnailUrl: string
    mediaURL: string
  }
  level: number
  collection: ENftCollection
  platform?: string
  series?: number
  rarity?: ENftRarity
  editionSize?: number
  edition?: number
  isOpenEdition?: boolean
  price?: number
  isBlocked?: boolean
  maxNftForUser?: number
  traits?: { [key: string]: string }
  walletType: WalletType
}

enum EBrainTrainTraitsLabel {
  COSTUME_TYPE = "Costume Type",
  BACKGROUND_COLOR = "Background Color",
  BACKGROUND_PATTERN = "Background Pattern",
  OUTFIT = "Outfit",
  COMS = "Coms",
  EYES = "Eyes",
  HEAD_PIECE = "Head Piece",
  MOUTH = "Mouth",
  TYPE = "Type",
}

export interface IBrainTrainNft extends INft {
  traits: {
    [key in EBrainTrainTraitsLabel]: string
  }
}

enum EGadgetsTraitsLabel {
  GADGET = "Gadget",
  RARITY = "Rarity",
  LEVEL = "Level",
  RANK = "Rank",
}

export interface IGadgetNft extends INft {
  traits: { [key in EGadgetsTraitsLabel]: string }
}

enum EVipTraitsLabel {
  CARD_NUMBER = "Card Number",
}

export interface IVipNft extends INft {
  traits: { [key in EVipTraitsLabel]: string }
}

enum EMissionsTraitsLabel {
  LOCATION = "Location",
  RARITY = "Rarity",
}

export enum EMissionsLocation {
  DUBLIN = "dublin",
  NEWYORK = "new york",
  PARIS = "paris",
  SANDIEGO = "san diego",
  SINGAPORE = "singapore",
  SYDNEY = "sydney",
  TRANSYLVANIA = "transylvania",
}

export interface IMissionsNft extends INft {
  traits: { [key in EMissionsTraitsLabel]: string }
}

export enum WalletType {
  /** A custodial wallet created by the niftory API. */
  Custodial = 'CUSTODIAL',
  /** An external wallet linked by the user. */
  External = 'EXTERNAL'
}