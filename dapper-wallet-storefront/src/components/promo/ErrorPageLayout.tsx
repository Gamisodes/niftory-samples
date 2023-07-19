import { EModelTypes } from "consts/const"
import Image from "next/image"
import { PropsWithChildren, memo, useMemo } from "react"
import LogoGamisodes from "src/icon/promo-logo-1.svg"
import LogoInspectorGadget from "src/icon/promo-logo-2.svg"
import { EErrorIdentity } from "src/pages/api/nftModel/[nftModelId]/initiateCheckout"
import { NFTModelDetail } from "src/typings/NftModelDetail"
import MetaTags from "../general/MetaTags"
import { EmojyInfoBlock } from "./EmojyInfoBlock"
import { ConfirmPageTexts } from "./texts"

export type INftModelDetail = PropsWithChildren &
  NFTModelDetail & {
    error: EErrorIdentity | string
  }

const ERROR_TEXT = {
  [EErrorIdentity.NFT_LIMIT_REACHED]: (
    <h1 className="uppercase leading-[32px] text-[28px] lg:leading-[61px] lg:text-[56px] mb-2 md:mb-6">
      MISSION ACCOMPLISHED! YOUR WALLET'S CAPACITY FOR THIS CARD HAS BEEN MAXED OUT.
      <br />
      <span className="text-[#EFAC37]">Want more? – Read below!</span>
    </h1>
  ),
  [EErrorIdentity.NO_PRICE]: (
    <h1 className="uppercase leading-[32px] text-[28px] lg:leading-[61px] lg:text-[56px] mb-2 md:mb-6">
      WE PREPARE NEW MISSION FOR YOU! PLEASE, CONTACT US IF YOU FACED WITH THIS ERROR!{" "}
      <span className="text-[#EFAC37]">
        {" "}
        DON'T WORRY, YOUR SPECIAL CARD MIGHT BE REQUESTED AGAIN!
      </span>
      <br />
      Want more? – Read below!
    </h1>
  ),
}

const ErrorPageLayout: React.FC<INftModelDetail> = function NFTModelDrop({ metadata, error }) {
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
          return (
            <Image
              className="h-full w-fit"
              src="/product.png"
              alt="BrainTrain Product"
              width={556}
              height={498}
            />
          )
        } else {
          return (
            <Image
              className="h-full w-fit"
              alt="Product"
              src="/San-Diego.png"
              width={556}
              height={459}
            />
          )
          // return <Image className="h-full w-fit" alt="Product" src={mainImage.contentUrl} width={556} height={459} />
        }
    }
  }, [mainImage.contentType])
  return (
    <>
      <MetaTags.Product metadata={metadata} availableCount={10000}>
        <meta property="og:image" content={metadata.content[0].contentUrl ?? ""} key="image" />
      </MetaTags.Product>
      <section className="flex flex-col justify-between min-w-screen w-full min-h-screen h-full p-7 pb-0 bg-cover relative -top-16 py-16 mb-[-30px]">
        <div className="flex justify-center gap-1 items-center flex-col pt-8 pb-3">
          <LogoGamisodes className="hidden lg:block" />
          <LogoInspectorGadget />
          <div className="">Where Cartoons, Collectibles, & Gaming Collide</div>
        </div>
        <div className="flex justify-center gap-5 items-center h-full flex-col lg:flex-row lg:items-start">
          <div className="z-10 lg:h-[470px] lg:mr-4">{renderImage}</div>
          <div className=" font-bangers max-w-md flex flex-col justify-center">
            {ERROR_TEXT[error] ?? (
              <h1 className="uppercase leading-[32px] text-[28px] lg:leading-[61px] lg:text-[56px] mb-2 md:mb-6">
                MISSION ACCOMPLISHED! You faced with some error while attaching this NFT.
                <span className="text-[#EFAC37]">
                  {" "}
                  DON'T WORRY, YOUR SPECIAL CARD MIGHT BE REQUESTED AGAIN!
                </span>
              </h1>
            )}
            <div className="lg:hidden">
              <EmojyInfoBlock title={ConfirmPageTexts[0].title} text={ConfirmPageTexts[0].text} />
              <iframe
                className="w-full aspect-video"
                id="ytplayer"
                src="https://www.youtube.com/embed/EK-2AgKjlJ0?autoplay=1&controls=0&disablekb=1&fs=0&modestbranding=1&iv_load_policy=3"
                frameBorder="0"
                allowFullScreen
              />
              <EmojyInfoBlock title={ConfirmPageTexts[1].title} text={ConfirmPageTexts[1].text} />
              <EmojyInfoBlock title={ConfirmPageTexts[2].title} text={ConfirmPageTexts[2].text} />
            </div>
          </div>
        </div>
        <div className="flex-col gap-4 mt-4 items-center hidden lg:flex">
          <div className="flex gap-10 justify-center">
            <EmojyInfoBlock title={ConfirmPageTexts[0].title} text={ConfirmPageTexts[0].text} />
            <EmojyInfoBlock title={ConfirmPageTexts[1].title} text={ConfirmPageTexts[1].text} />
            <EmojyInfoBlock title={ConfirmPageTexts[2].title} text={ConfirmPageTexts[2].text} />
          </div>
          <iframe
            className="w-full aspect-video max-w-[1100px]"
            id="ytplayer"
            src="https://www.youtube.com/embed/EK-2AgKjlJ0?autoplay=1&controls=0&disablekb=1&fs=0&modestbranding=1&iv_load_policy=3"
            frameBorder="0"
            allowFullScreen
          />
        </div>
      </section>
    </>
  )
}

export default memo(ErrorPageLayout)
