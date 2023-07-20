import { EmailFunction } from "."
import { getNftModelById } from "../nft/getNftById"
import { promoNftHtml } from "./content/promoNftHtml"
import { promoNftText } from "./content/promoNftText"

export const promoNftEmail: EmailFunction = async function promoNftEmail(params, additional) {
  const { url, theme } = params
  const _url = new URL(url)
  _url.searchParams.append("nftModelId", additional.nftModelId)
  const { host } = _url

  const { data: nftModelResponse } = await getNftModelById({ nftModelId: additional.nftModelId })

  return {
    subject: "Go Go Get Your Free Digital Edition Now!",
    html: promoNftHtml({ url: `${_url}`, host, theme, nftModel: nftModelResponse }),
    text: promoNftText({ url: `${_url}`, host }),
  }
}
