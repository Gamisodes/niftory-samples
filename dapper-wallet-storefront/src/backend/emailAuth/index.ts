import { SendVerificationRequestParams } from "next-auth/providers"
import { createTransport } from "nodemailer"
import { defaultHTML } from "./content/defaultHtml"
import { defaultText } from "./content/defaultText"
import { promoNftEmail } from "./promoNft"

type IBaseProps = {
  subject: string
  text: string
  html: string
}

export type EmailFunction = (
  params: SendVerificationRequestParams,
  additional: CustomParamsType
) => Promise<IBaseProps>
const base: EmailFunction = async function base(params) {
  const { url, theme } = params
  const { host } = new URL(url)
  return {
    subject: `Sign in to ${host}`,
    text: defaultText({ url, host }),
    html: defaultHTML({ url, host, theme }),
  }
}

export type CustomParamsType = {
  nftModelId?: string
}

enum EFunctionType {
  PROMO,
  BASE,
}

const functionPicker = {
  [EFunctionType.PROMO]: promoNftEmail,
  [EFunctionType.BASE]: base,
}

export function useSendVerificationRequest(additionalData: CustomParamsType) {
  let strategy: EFunctionType
  if (additionalData.nftModelId) {
    strategy = EFunctionType.PROMO
  } else {
    strategy = EFunctionType.BASE
  }

  const msgFunc = functionPicker[strategy] ?? base

  return async function defaultVerificationRequest(params: SendVerificationRequestParams) {
    try {
      const { provider, identifier } = params

      const transport = createTransport(provider.server)
      const response = await msgFunc(params, additionalData)

      const result = await transport.sendMail({
        to: identifier,
        from: provider.from,
        ...response,
      })
      const failed = result.rejected.concat(result.pending).filter(Boolean)
      if (failed.length) {
        throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`)
      }
    } catch (error) {
      throw new Error(`Email could not be sent`)
    }
  }
}
