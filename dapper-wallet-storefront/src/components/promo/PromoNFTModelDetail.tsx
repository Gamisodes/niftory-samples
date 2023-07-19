import { EModelTypes } from "consts/const"
import Image from "next/image"
import { memo, PropsWithChildren, useMemo } from "react"
import LogoGamisodes from "src/icon/promo-logo-1.svg"
import LogoInspectorGadget from "src/icon/promo-logo-2.svg"
import { EErrorIdentity } from "src/pages/api/nftModel/[nftModelId]/initiateCheckout"
import { NFTModelDetail } from "src/typings/NftModelDetail"
import useCheckout from "../drops/checkout/CheckoutProvider"
import MetaTags from "../general/MetaTags"
import { EmojyInfoBlock } from "./EmojyInfoBlock"
import { PromoPageTexts } from "./texts"

const ERROR_MESSAGES = {
  [EErrorIdentity.NFT_LIMIT_REACHED]: "You reached the limit for this wallet",
  [EErrorIdentity.NO_PRICE]: "You should contact our administrator if you have this error",
}

export type INftModelDetail = PropsWithChildren & NFTModelDetail

const PromoNFTModelDrop: React.FC<INftModelDetail> = function NFTModelDrop({ metadata, children }) {
  const { error } = useCheckout()

  const NFT_READY_TO_BUY =
    metadata.amount - metadata.quantityMinted > 0 ? metadata.amount - metadata.quantityMinted : 0

  const mainImage = metadata.content[0]

  const renderImage = useMemo(() => {
    switch (mainImage.contentType) {
      case "video/mp4":
        return (
          <video
            src={mainImage.contentUrl}
            loop
            muted
            playsInline
            autoPlay
            width={556}
            height={498}
            className="rounded-[32px]"
          />
        )
      case "image/png":
      default:
        if (metadata.type === EModelTypes.WRAPPER) {
          return <Image src="/product.png" alt="BrainTrain Product" width={556} height={498} />
        } else {
          return <Image alt="Product" src={mainImage.contentUrl} width={556} height={459} />
        }
    }
  }, [mainImage.contentType])
  
  return (
    <>
      <MetaTags.Product metadata={metadata} availableCount={NFT_READY_TO_BUY}>
        <meta property="og:image" content={metadata.content[0].contentUrl ?? ""} key="image" />
      </MetaTags.Product>
      <section className="flex flex-col justify-between min-w-screen w-full min-h-screen h-full p-7 pb-6 relative -top-16 py-16">
        <div className="flex justify-center gap-1 items-center flex-col pt-8 pb-5">
          <LogoGamisodes className="hidden lg:block" />
          <LogoInspectorGadget />
          <div className="">Where Cartoons, Collectibles, & Gaming Collide</div>
        </div>
        <div className="flex justify-center gap-6 items-start h-full flex-col lg:flex-row">
          <div className="z-10 w-2/5 lg:w-1/5 self-center lg:self-start">{renderImage}</div>
          <div className="font-bangers max-w-xl 2xl:max-w-lg flex flex-col justify-center">
            <h1 className="uppercase leading-[32px] text-[28px] lg:leading-[54px] lg:text-[48px] mb-4 md:mb-6">
              Great work Inspector, but there's no time to waste!{" "}
              <span className="text-[#EFAC37]">
                Claim your free Mission: San Diego digital edition
              </span>{" "}
              before this offer self-destructs!
            </h1>
            {error && (
              <>
                <p className="font-dosis text-lg mb-3">{ERROR_MESSAGES[error] ?? error ?? ""}</p>
              </>
            )}
            {children}
            <div className="lg:hidden">
              <EmojyInfoBlock title={PromoPageTexts[0].title} text={PromoPageTexts[0].text} />
              <EmojyInfoBlock title={PromoPageTexts[1].title} text={PromoPageTexts[1].text} />
              <EmojyInfoBlock title={PromoPageTexts[2].title} text={PromoPageTexts[2].text} />
            </div>
          </div>
        </div>
        <div className="flex-col gap-4 items-center hidden lg:flex">
          <div className="flex gap-10 justify-center">
            <EmojyInfoBlock title={PromoPageTexts[0].title} text={PromoPageTexts[0].text} />
            <EmojyInfoBlock title={PromoPageTexts[1].title} text={PromoPageTexts[1].text} />
            <EmojyInfoBlock title={PromoPageTexts[2].title} text={PromoPageTexts[2].text} />
          </div>
        </div>
      </section>
    </>
  )
}

export default memo(PromoNFTModelDrop)
