import * as fcl from "@onflow/fcl"
import axios from "axios"
import { convertNumber } from "consts/helpers"
import { useNftModelQuery } from "generated/graphql"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import React, { createContext, useCallback, useContext, useRef, useState } from "react"
import usePreventLeave from "src/hooks/usePreventLeave"
import { useWalletContext } from "src/hooks/useWalletContext"
import { DEFAULT_NFT_PRICE } from "src/lib/const"
import { EErrorIdentity } from "src/pages/api/nftModel/[nftModelId]/initiateCheckout"
import gaAPI, { EBuyNFTLabel } from "src/services/ga_events"

interface CheckoutProviderContextType {
  checkout: () => void
  error: EErrorIdentity | string | null
  checkoutProgress: number
}

const missingProvider = () => {
  throw new Error("Attempted to useNotificationDot without NotificationDotProvider")
}

const CheckoutProviderContext = createContext<CheckoutProviderContextType>({
  checkout: missingProvider,
  error: null,
  checkoutProgress: 0,
})

interface CheckoutProviderProps extends React.PropsWithChildren {
  id: string
}

const SUCCESS_DROP_URL = "/app/collection/brainTrainCollection/"

export const CheckoutProvider: React.FC<CheckoutProviderProps> = ({ children, id }) => {
  const { data: nftModelResponse } = useNftModelQuery({ id })
  const { currentUser } = useWalletContext()
  const router = useRouter()
  const { data: user } = useSession()

  const checkoutStatusIndexRef = useRef(0)
  const [checkoutProgress, setCheckoutProgress] = useState(0)

  const [errorState, setErrorState] = useState<EErrorIdentity | string | null>(null)

  const updateCheckoutProgress = (num: number) => {
    setCheckoutProgress(num)
    checkoutStatusIndexRef.current = num
  }

  usePreventLeave(() => {
    return checkoutStatusIndexRef.current !== 0
  }, [])

  const signTransaction = useCallback(async (transaction: string) => {
    const response = await axios.post("/api/signTransaction", { transaction })
    return response.data.data
  }, [])

  const checkoutFreeNft = async () => {
    try {
      updateCheckoutProgress(1)
      gaAPI.buy_nft({
        label: EBuyNFTLabel.STARTING_CHECKOUT,
        email: user?.user.email ?? "",
        wallet: currentUser?.addr ?? "",
        dropsId: id ?? "",
      })
      const initiateCheckoutResponse = await axios.post(`/api/nftModel/${id}/initiateCheckout`)
      const nftId = initiateCheckoutResponse?.data?.data?.id ?? ""

      updateCheckoutProgress(0)
      await router.push(`${SUCCESS_DROP_URL}${nftId}`)
    } catch (error) {
      setErrorState(error?.response?.data?.error[0] ?? error?.message)
      updateCheckoutProgress(0)

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
    }
  }
  const checkoutPaidNft = async () => {
    try {
      updateCheckoutProgress(1)

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
      updateCheckoutProgress(2)

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

      updateCheckoutProgress(3)

      await fcl.tx(tx).onceSealed()

      updateCheckoutProgress(4)

      const completeCheckoutResponse = await axios.post(`/api/nftModel/${id}/completeCheckout`, {
        transactionId: tx,
        nftDatabaseId,
      })
      updateCheckoutProgress(5)

      gaAPI.buy_nft({
        label: EBuyNFTLabel.COMPLETING_CHECKOUT,
        email: user?.user.email ?? "",
        wallet: currentUser?.addr ?? "",
        dropsId: id ?? "",
      })

      const nft = completeCheckoutResponse.data.data
      updateCheckoutProgress(0)
      await router.push(`${SUCCESS_DROP_URL}${nft.id}`)
    } catch (error) {
      setErrorState(error?.response?.data?.error[0] ?? error?.message)
      updateCheckoutProgress(0)

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
    }
  }

  const handleCheckout = useCallback(async () => {
    // router.push("/app/collection/d4548186-78b3-4cb8-bd33-7fee34a38c5c")
    const price = convertNumber(nftModelResponse?.nftModel?.attributes?.price, DEFAULT_NFT_PRICE)

    setErrorState(null)

    if (price > 0) {
      await checkoutPaidNft()
    } else if (price === 0) {
      await checkoutFreeNft()
    }
  }, [currentUser?.addr])

  return (
    <CheckoutProviderContext.Provider
      value={{ checkoutProgress, checkout: handleCheckout, error: errorState }}
    >
      {children}
    </CheckoutProviderContext.Provider>
  )
}

/**
 * Main entry point for this hook
 */
export default function useCheckout() {
  const context = useContext(CheckoutProviderContext)
  return context
}
