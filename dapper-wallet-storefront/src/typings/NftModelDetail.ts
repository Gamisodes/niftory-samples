import { EModelTypes } from "consts/const"

export type NFTModelDetail = {
  metadata: {
    type: EModelTypes
    title: string
    description: string
    amount: number
    quantityMinted: number
    price: number
    editionSize: string | null
    checkoutDisclaimer: string | null
    content: {
      contentType: string
      contentUrl: string
      thumbnailUrl: string
      alt: string
    }[]
  }
}
