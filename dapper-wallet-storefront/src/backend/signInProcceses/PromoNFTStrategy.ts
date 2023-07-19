import { AuthOptions } from "next-auth"
import { Convertor } from "src/lib/Nfts/convertor"
import { WalletType } from "src/typings/INfts"
import { createSuccessRedirectToBoughtenNFT } from "src/utils/createSuccessRedirectToBoughtenNFT"
import { IProcessArgs, SignInProcessStrategy } from "."
import { assignFreeNftToWallet } from "../custodialNFT/assignFreeNFT"
import { createOrReturnWallet } from "../custodialNFT/createCustodialWallet"
import { getNftById } from "../nft/getNftById"

type IPromoProcessArgs = IProcessArgs & { nftModelId: string }
export class PromoNFTStrategy implements SignInProcessStrategy {
  holdAuth(data: IPromoProcessArgs): Pick<AuthOptions, "events" | "callbacks"> {
    return {
      events: {
        //After user clicks his link
        async signIn(message) {
          const userEmail = message.user.email
          const nftModelId = data.nftModelId
          const wallet = await createOrReturnWallet({ userEmail })
          if (wallet.success) {
            let assignNFTResponse: Awaited<ReturnType<typeof assignFreeNftToWallet>> | null = null
            let walletTypeSource: WalletType | null = null
            if (wallet?.data?.address) {
              assignNFTResponse = await assignFreeNftToWallet({
                nftModelToAssign: nftModelId,
                userAddress: wallet?.data?.address ?? "",
              })
              walletTypeSource = WalletType.External
            } else if (wallet.data.niftoryWalletId) {
              assignNFTResponse = await assignFreeNftToWallet({
                nftModelToAssign: nftModelId,
                walletId: wallet?.data?.niftoryWalletId ?? "",
              })
              walletTypeSource = WalletType.Custodial
            }
            if (assignNFTResponse?.success) {
              const nft = await getNftById({ nftId: assignNFTResponse.data.transfer.id })
              const convertedNFT = Convertor.Niftory(nft.data.nft, walletTypeSource)

              if (nft.success) {
                return createSuccessRedirectToBoughtenNFT({
                  collectionName: convertedNFT.collection,
                  nftID: convertedNFT.id,
                  edition: convertedNFT?.edition,
                  title: convertedNFT?.title,
                  walletTypeSource,
                })
              }
            } else {
              const params = new URLSearchParams()
              if (assignNFTResponse?.error) params.set("error", assignNFTResponse?.error)
              return `/promo/error/${data?.nftModelId}?${params}`
            }
          }
          const params = new URLSearchParams()
          params.set("error", "error-while-transferring")
          return `/promo/error/${data?.nftModelId}?${params}`
        },
      },
      callbacks: {
        //Before email send
        signIn: async (message) => {
          try {
            if (message?.email?.verificationRequest) {
              const captcha = data.captcha
              const response = await fetch(
                `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`,
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                  method: "POST",
                }
              )
              const captchaValidation = await response.json()
              return captchaValidation.success
            }
            return true
          } catch {
            return false
          }
        },
      },
    }
  }
}
