import * as fcl from "@onflow/fcl"
import { useRouter } from "next/router"
import { useCallback } from "react"

import { useWalletByAddressQuery, Wallet, WalletState } from "../../../generated/graphql"
import { useWalletContext } from "../../hooks/useWalletContext"
import ConfigureWallet from "./ConfigureWallet"
import RegisterWallet from "./RegisterWallet"
import VerifyWallet from "./VerifyWallet"
import { WalletSetupBox } from "./WalletSetupBox"
import { Loading } from "src/icon/Loading"

export type WalletSetupStepProps = {
  setIsLoading: (isLoading: boolean) => void
  setError: (error: Error | null) => void
}

export type WalletSetupProps = WalletSetupStepProps & {
  wallet: Wallet
  flowUser: fcl.CurrentUserObject
  error: Error
}

export function WalletSetup() {
  const router = useRouter()
  const { currentUser } = useWalletContext()

  const {
    data: walletData,
    refetch: reExecuteQuery,
    error,
  } = useWalletByAddressQuery(
    { address: currentUser?.addr },
    {
      enabled: !!currentUser?.addr,
      networkMode: "offlineFirst",
    }
  )
  const mutateCache = useCallback(() => {
    reExecuteQuery({})
  }, [])

  const wallet = currentUser?.addr && walletData?.walletByAddress

  if (currentUser?.addr === null || wallet === null) {
    return <RegisterWallet mutateCache={mutateCache} />
  }

  switch (wallet?.state) {
    case WalletState.Unverified:
      // User has a wallet but it's not verified yet
      return <VerifyWallet verificationCode={wallet.verificationCode} mutateCache={mutateCache} />

    case WalletState.Verified:
      // The user has verified their wallet, but hasn't configured it yet
      return <ConfigureWallet address={wallet.address} mutateCache={mutateCache} />

    case WalletState.Ready:
      // The user has verified their wallet, and finally configured it
      return (
        <WalletSetupBox
          text={`You're all set up! Your wallet address is ${wallet?.address}`}
          buttonText="Go to Drops"
          error={error as Error}
          isLoading={false}
          onClick={() =>
            router.push(
              process.env.NODE_ENV === "development"
                ? `/app/drops/${process.env.NEXT_PUBLIC_DROP_ID}`
                : `https://gamisodes.com/pages/collections`
            )
          }
        />
      )
  }

  return <Loading />
}
