import { Text } from "@chakra-ui/react"
import * as React from "react"
import * as fcl from "@onflow/fcl"
import { useCallback, useState } from "react"
import { useWalletContext } from "../../hooks/useWalletContext"
import Link from "next/link"
import { Gallery } from "../../ui/Content/Gallery/Gallery"
import axios from "axios"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Button from "src/ui/Button"
import gaAPI, { EBuyNFTLabel } from "src/services/ga_events"
import usePreventLeave from "src/hooks/usePreventLeave"

type NFTModelDetailProps = {
  id: string
  metadata: {
    title: string
    description: string
    amount: number
    quantityMinted: number
    price: number
    content: {
      contentType: string
      contentUrl: string
      thumbnailUrl: string
      alt: string
    }[]
  }
}

const checkoutStatusMessages = [
  "",
  "Starting checkout...",
  "Waiting for transaction approval...",
  "Waiting for transaction completion...",
  "Completing checkout...",
  "Purchase complete! Redirecting...",
]

// export const NFTModelDetail = ({ id, metadata }: NFTModelDetailProps) => {
//   const router = useRouter()
//   const [checkoutStatusIndex, setCheckoutStatusIndex] = useState(0)

//   const { currentUser } = useWalletContext()
//   const { data: authedUser } = useSession()

//   const signTransaction = useCallback(async (transaction: string) => {
//     const response = await axios.post("/api/signTransaction", { transaction })
//     return response.data.signTransactionForDapperWallet
//   }, [])

//   const handleCheckout = useCallback(async () => {
//     try {
//       setCheckoutStatusIndex(1)
//       const initiateCheckoutResponse = await axios.post(`/api/nftModel/${id}/initiateCheckout`)
//       const {
//         cadence,
//         registryAddress,
//         brand,
//         nftId,
//         nftDatabaseId,
//         nftTypeRef,
//         setId,
//         templateId,
//         price,
//         expiry,
//         signerKeyId,
//         signerAddress,
//       } = initiateCheckoutResponse.data

//       setCheckoutStatusIndex(2)
//       const tx = await fcl.mutate({
//         cadence,
//         args: (arg, t) => [
//           arg(process.env.NEXT_PUBLIC_MERCHANT_ACCOUNT_ADDRESS, t.Address),
//           arg(registryAddress, t.Address),
//           arg(brand, t.String),
//           arg(nftId, t.Optional(t.UInt64)),
//           arg(nftTypeRef, t.String),
//           arg(setId, t.Optional(t.Int)),
//           arg(templateId, t.Optional(t.Int)),
//           arg(price, t.UFix64),
//           arg(expiry, t.UInt64),
//         ],
//         authorizations: [
//           async (account) => ({
//             ...account,
//             addr: signerAddress,
//             tempId: `${signerAddress}-${signerKeyId}`,
//             keyId: signerKeyId,
//             signingFunction: async (signable) => {
//               return {
//                 keyId: signerKeyId,
//                 addr: signerAddress,
//                 signature: await signTransaction(signable.message),
//               }
//             },
//           }),
//           fcl.authz,
//         ],
//         limit: 9999,
//       })

//       setCheckoutStatusIndex(3)
//       await fcl.tx(tx).onceSealed()

//       setCheckoutStatusIndex(4)
//       const completeCheckoutResponse = await axios.post(`/api/nftModel/${id}/completeCheckout`, {
//         transactionId: tx,
//         nftDatabaseId,
//       })

//       setCheckoutStatusIndex(5)
//       const nft = completeCheckoutResponse.data

//       await router.push(`/app/collection/${nft.id}`)
//     } finally {
//       setCheckoutStatusIndex(0)
//     }
//   }, [currentUser?.addr, id, router, signTransaction])

//   const NFT_READY_TO_BUY =
//     metadata.amount - metadata.quantityMinted > 0 ? metadata.amount - metadata.quantityMinted : 0
//   const TOTAL_AVAILABLE =
//     `${NFT_READY_TO_BUY < metadata.amount ? `${NFT_READY_TO_BUY}/` : ""}` +
//     `${metadata.amount} Total Available`

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2">
//       <Stack p="8" borderRadius="4" minW={{ lg: "sm" }} maxW={{ lg: "lg" }} justify="center">
//         <Stack>
//           <Stack>
//             <Heading size="lg" fontWeight="medium" color="page.accent">
//               {metadata.title}
//             </Heading>
//           </Stack>

//           <Text color="page.text">{metadata.description}</Text>
//           <Text color="page.text">{TOTAL_AVAILABLE}</Text>
//         </Stack>
//         {authedUser?.user && currentUser?.addr ? (
//           NFT_READY_TO_BUY > 0 ? (
//             <Button
//               isLoading={!currentUser?.addr || checkoutStatusIndex > 0}
//               loadingText={checkoutStatusMessages[checkoutStatusIndex]}
//               onClick={handleCheckout}
//               my="auto"
//               p="8"
//             >
//               <Text>Checkout</Text>
//             </Button>
//           ) : (
//             <Button
//               isLoading={!currentUser?.addr || checkoutStatusIndex > 0}
//               loadingText={checkoutStatusMessages[checkoutStatusIndex]}
//               my="auto"
//               p="8"
//               disabled
//             >
//               <Text>Not Available</Text>
//             </Button>
//           )
//         ) : authedUser?.user && !currentUser?.addr ? (
//           <Link href={"/app/account"}>
//             <Button my="auto" p="8">
//               To proceed checkout you need to sign into wallet
//             </Button>
//           </Link>
//         ) : (
//           <Link href={"/app/sign-in"}>
//             <Button my="auto" p="8">
//               To proceed checkout you need to sign into account
//             </Button>
//           </Link>
//         )}
//       </Stack>
//       <Gallery content={metadata.content} />
//     </div>
//   )
// }

function useCheckout(id: string) {
  const { currentUser } = useWalletContext()
  const router = useRouter()
  const { data: user } = useSession()

  const [checkoutStatusIndex, setCheckoutStatusIndex] = useState(0)
  const signTransaction = useCallback(async (transaction: string) => {
    const response = await axios.post("/api/signTransaction", { transaction })
    return response.data.data
  }, [])
  const handleCheckout = useCallback(async () => {
    try {
      setCheckoutStatusIndex(1)
      gaAPI.buy_nft({
        label: EBuyNFTLabel.STARTING_CHECKOUT,
        email: user?.user.email ?? "",
        wallet: currentUser?.addr ?? "",
        dropsId: id ?? "",
      })
      const initiateCheckoutResponse = await axios.post(`/api/nftModel/${id}/initiateCheckout`)
      const {
        cadence,
        registryAddress,
        brand,
        nftId,
        nftDatabaseId,
        nftTypeRef,
        setId,
        templateId,
        price,
        expiry,
        signerKeyId,
        signerAddress,
      } = initiateCheckoutResponse.data.data
      setCheckoutStatusIndex(2)
      const tx = await fcl.mutate({
        cadence,
        args: (arg, t) => [
          arg(process.env.NEXT_PUBLIC_MERCHANT_ACCOUNT_ADDRESS, t.Address),
          arg(registryAddress, t.Address),
          arg(brand, t.String),
          arg(nftId, t.Optional(t.UInt64)),
          arg(nftTypeRef, t.String),
          arg(setId, t.Optional(t.Int)),
          arg(templateId, t.Optional(t.Int)),
          arg(price, t.UFix64),
          arg(expiry, t.UInt64),
        ],
        authorizations: [
          async (account) => ({
            ...account,
            addr: signerAddress,
            tempId: `${signerAddress}-${signerKeyId}`,
            keyId: signerKeyId,
            signingFunction: async (signable) => {
              return {
                keyId: signerKeyId,
                addr: signerAddress,
                signature: await signTransaction(signable.message),
              }
            },
          }),
          fcl.authz,
        ],
        limit: 9999,
      })

      setCheckoutStatusIndex(3)
      await fcl.tx(tx).onceSealed()

      setCheckoutStatusIndex(4)
      const completeCheckoutResponse = await axios.post(`/api/nftModel/${id}/completeCheckout`, {
        transactionId: tx,
        nftDatabaseId,
      })
      gaAPI.buy_nft({
        label: EBuyNFTLabel.COMPLETING_CHECKOUT,
        email: user?.user.email ?? "",
        wallet: currentUser?.addr ?? "",
        dropsId: id ?? "",
      })

      setCheckoutStatusIndex(5)

      const nft = completeCheckoutResponse.data.data

      await router.push(`/app/collection/${nft.id}`)
    } catch (error) {
      if (error === "Declined: Declined by user") {
        gaAPI.buy_nft({
          label: EBuyNFTLabel.DECLINE,
          email: user?.user.email ?? "",
          wallet: currentUser?.addr ?? "",
          dropsId: id ?? "",
        })
      } else {
        gaAPI.buy_nft({
          label: EBuyNFTLabel.ERROR,
          email: user?.user.email ?? "",
          wallet: currentUser?.addr ?? "",
          dropsId: id ?? "",
        })
      }
    } finally {
      setCheckoutStatusIndex(0)
    }
  }, [currentUser?.addr, id, router, signTransaction])

  usePreventLeave(() => {
    return checkoutStatusIndex !== 0
  }, [checkoutStatusIndex])

  return { handleCheckout, checkoutStatusIndex }
}

const brain_train_links = [
  "/brain_train/Detective.jpg",
  "/brain_train/Frenchman.jpg",
  "/brain_train/Goat.jpg",
  "/brain_train/Hotel Waiter.jpg",
  "/brain_train/Mechanic.jpg",
  "/brain_train/Ninja.jpg",
  "/brain_train/Pirate.jpg",
  "/brain_train/Police Officer.jpg",
  "/brain_train/Scarecrow.jpg",
]

function NFTModelDrop({ id, metadata }: NFTModelDetailProps) {
  const { currentUser } = useWalletContext()
  const { data: authedUser } = useSession()
  const { checkoutStatusIndex, handleCheckout } = useCheckout(id)
  const NFT_READY_TO_BUY =
    metadata.amount - metadata.quantityMinted > 0 ? metadata.amount - metadata.quantityMinted : 0
  const TOTAL_AVAILABLE =
    `${NFT_READY_TO_BUY < metadata.amount ? `${NFT_READY_TO_BUY} /` : ""}` +
    `${metadata.amount} Remaining`

  return (
    <section className="flex flex-col justify-between min-w-screen w-full min-h-screen h-full p-7 pb-6 bg-header.opacity bg-[url('/homepage_BG.jpg')] bg-cover relative -top-16 py-16">
      <div className="flex justify-center items-center h-full flex-col lg:flex-row">
        <div className="z-10">
          <Image src="/product.png" alt="BrainTrain Product" width={556} height={498} />
        </div>
        <div className="text-white font-bangers max-w-md flex flex-col justify-center">
          <div className="grid grid-cols-3 w-[232px] mb-2 gap-3">
            {brain_train_links.map((val) => (
              <Image key={val} src={val} alt="nft element" width={70} height={80} />
            ))}
          </div>
          <h1 className="uppercase leading-[61px] text-[56px] mb-2 md:mb-6"> {metadata.title}</h1>
          <p className="font-dosis text-lg mb-5">
            <strong className="mb-6 flex font-bold text-xl">{metadata.description}</strong>
            {TOTAL_AVAILABLE}
          </p>
          <p className="font-dosis font-bold text-4xl mb-2">${metadata.price}</p>

          {authedUser?.user && currentUser?.addr ? (
            NFT_READY_TO_BUY > 0 ? (
              <>
                <p className="font-dosis text-lg mb-3">
                  {checkoutStatusMessages[checkoutStatusIndex]}
                </p>
                <Button
                  isLoading={!currentUser?.addr || checkoutStatusIndex > 0}
                  onClick={handleCheckout}
                >
                  Checkout
                </Button>
              </>
            ) : (
              <>
                <Button disabled>
                  <Text>Not Available</Text>
                </Button>
              </>
            )
          ) : authedUser?.user && !currentUser?.addr ? (
            <>
              <p className="font-dosis text-lg mb-3">
                To proceed with checkout, please connect your Dapper Wallet. If you've already
                connected your Dapper Wallet, please refresh this page.
              </p>
              <Link href={"/app/account"}>
                <Button>Connect Wallet</Button>
              </Link>
            </>
          ) : (
            <>
              <p className="font-dosis text-lg mb-3">
                To proceed with checkout, please sign in to your Google Account. If you've already
                connected your Google Account, please refresh this page.
              </p>
              <Link href={"/app/sign-in"}>
                <Button>Sign In</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default React.memo(NFTModelDrop)
