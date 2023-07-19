export type ITextAnswerParams = { url: string; host: string }

/** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
export function promoNftText({ url, host }: ITextAnswerParams) {
  return `Get your free NFT in ${host}\n${url}\n\n`
}
