import { Text } from "@chakra-ui/react"
import { EModelTypes } from "consts/const"
import { useWalletByAddressQuery, WalletState } from "generated/graphql"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import * as React from "react"
import { Loading } from "src/icon/Loading"
import { EErrorIdentity } from "src/pages/api/nftModel/[nftModelId]/initiateCheckout"
import Button from "src/ui/Button"
import { useWalletContext } from "../../hooks/useWalletContext"
import MetaTags from "../general/MetaTags"
import useCheckout from "./checkout/CheckoutProvider"
import { NFTModelDetail } from "src/typings/NftModelDetail"

const checkoutStatusMessages = [
  "",
  "Starting checkout...",
  "Waiting for transaction approval...",
  "Waiting for transaction completion...",
  "Completing checkout...",
  "Purchase complete! Redirecting...",
]

const ERROR_MESSAGES = {
  [EErrorIdentity.NFT_LIMIT_REACHED]: "You reached the limit for this wallet",
  [EErrorIdentity.NO_PRICE]: "You should contact our administrator if you have this error",
}

const brain_train_links = [
  "/brain_train/Detective.webp",
  "/brain_train/Frenchman.webp",
  "/brain_train/Goat.webp",
  "/brain_train/Hotel-Waiter.webp",
  "/brain_train/Mechanic.webp",
  "/brain_train/Ninja.webp",
  "/brain_train/Pirate.webp",
  "/brain_train/Police-Officer.webp",
  "/brain_train/Scarecrow.webp",
]

interface IBuyButton {
  nftAvailableToBuy: number
  errorState?: string
}
const BuyButton = React.memo(function BuyButton({ nftAvailableToBuy }: IBuyButton) {
  const { currentUser } = useWalletContext()
  const { data: walletData } = useWalletByAddressQuery(
    { address: currentUser?.addr },
    { enabled: !!currentUser?.addr, networkMode: "offlineFirst" }
  )
  const { status } = useSession()
  const { checkout, error, checkoutProgress } = useCheckout()

  const wallet = currentUser?.addr && walletData?.walletByAddress

  //If user authed via Google
  if (status === "authenticated") {
    //If user authed via Google and Blockchain
    if (currentUser?.addr && wallet?.state === WalletState.Ready) {
      if (nftAvailableToBuy > 0) {
        return (
          <>
            <p className="font-dosis text-lg mb-3">{checkoutStatusMessages[checkoutProgress]}</p>
            <Button
              disabled={error && error === EErrorIdentity.NFT_LIMIT_REACHED}
              isLoading={checkoutProgress > 0}
              onClick={checkout}
            >
              Checkout
            </Button>
          </>
        )
      } else {
        return (
          <Button disabled>
            <Text>Not Available</Text>
          </Button>
        )
      }
    }
    //If user authed via Google but didn't connect his wallet OR his wallet isn't configured to allow purchases
    else if (currentUser?.addr === null || (wallet && wallet?.state !== WalletState.Ready)) {
      return (
        <>
          <p className="font-dosis text-lg mb-3">
            To proceed with CHECKOUT, please connect your Dapper digital collectibles wallet. If
            you’ve already connected your wallet, please refresh this page.
          </p>
          <Link href={"/account"}>
            <Button>Connect Wallet</Button>
          </Link>
        </>
      )
    }
  }
  //If user unauthed via Google
  else if (status === "unauthenticated")
    return (
      <>
        <p className="font-dosis text-lg mb-3">
          The proceed with checkout, please Sign In. If you've already signed in, please refresh
          this page.
        </p>
        <Link href="/sign-in">
          <Button>Sign In</Button>
        </Link>
      </>
    )

  return <Loading />
})

const NFTModelDrop: React.FC<NFTModelDetail> = function NFTModelDrop({ metadata }) {
  const { error } = useCheckout()

  const NFT_READY_TO_BUY =
    metadata.amount - metadata.quantityMinted > 0 ? metadata.amount - metadata.quantityMinted : 0
  const TOTAL_AVAILABLE =
    `${
      metadata?.editionSize !== "Open" && NFT_READY_TO_BUY < metadata.amount
        ? `${NFT_READY_TO_BUY} /`
        : ""
    }` +
    ` ${
      metadata?.editionSize && metadata?.editionSize === "Open"
        ? `Open Edition`
        : `${metadata?.amount} Remaining`
    }`

  const mainImage = metadata.content[0]

  const renderImage = React.useMemo(() => {
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
      <section className="flex flex-col justify-between min-w-screen w-full min-h-screen h-full p-7 pb-6 bg-header.opacity bg-[url('/homepage_BG.webp')] bg-cover relative -top-16 py-16">
        <div className="flex justify-center gap-5 items-center h-full flex-col lg:flex-row">
          <div className="z-10">{renderImage}</div>
          <div className="text-white font-bangers max-w-md flex flex-col justify-center">
            <div className="grid grid-cols-3 w-[232px] mb-2 gap-3">
              {}
              {metadata.type === EModelTypes.WRAPPER &&
                brain_train_links.map((val) => (
                  <Image key={val} src={val} alt="nft element" width={70} height={80} />
                ))}
            </div>
            <h1 className="uppercase leading-[61px] text-[56px] mb-2 md:mb-6"> {metadata.title}</h1>
            <p className="font-dosis text-lg mb-5">
              <strong className="mb-6 flex font-bold text-xl">{metadata.description}</strong>
              {TOTAL_AVAILABLE}
            </p>
            {metadata?.checkoutDisclaimer && (
              <>
                <p className="font-dosis text-lg mb-3">
                  <strong>Disclaimer:</strong> <i>{metadata.checkoutDisclaimer ?? ""}</i>
                </p>
              </>
            )}
            <p className="font-dosis font-bold text-4xl mb-2">${metadata.price}</p>
            {error && (
              <>
                <p className="font-dosis text-lg mb-3">{ERROR_MESSAGES[error] ?? error ?? ""}</p>
              </>
            )}

            <BuyButton nftAvailableToBuy={NFT_READY_TO_BUY} />
          </div>
        </div>
      </section>
    </>
  )
}

export default React.memo(NFTModelDrop)
