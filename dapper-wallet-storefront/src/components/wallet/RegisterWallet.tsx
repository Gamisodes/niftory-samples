import Link from "next/link"
import { useEffect, useRef } from "react"
import usePreventLeave from "src/hooks/usePreventLeave"
import gaAPI from "src/services/ga_events"

import { useSendRegisterWalletQuery } from "src/services/wallet/hooks"
import { getCurrentUser, useAuth } from "src/store/users"
import shallow from "zustand/shallow"
import { useWalletContext } from "../../hooks/useWalletContext"
import { WalletSetupBox } from "./WalletSetupBox"

function RegisterWallet() {
  const [user] = useAuth(getCurrentUser, shallow)

  const { currentUser, signIn, isLoading: walletContextLoading } = useWalletContext()
  const { mutateAsync, error, isLoading, data } = useSendRegisterWalletQuery()
  const ref = useRef(null)

  // When the user logs in, register their wallet
  useEffect(() => {
    if (walletContextLoading || !currentUser?.addr || isLoading) {
      return
    }
    if (ref.current === true) return
    ref.current = currentUser.loggedIn
    mutateAsync().then(() => {
      gaAPI.connect_dapper_wallet({
        email: user?.email ?? "",
        wallet: data?.data?.registerWallet?.address ?? currentUser?.addr ?? "",
      })
    })
  }, [currentUser?.addr, currentUser?.loggedIn, walletContextLoading])

  usePreventLeave(() => {
    return isLoading
  }, [isLoading])

  return (
    <WalletSetupBox
      text={
        <p className="flex flex-col">
          <span>Want to create or connect your own Dapper Digital Collectibles Wallet?</span>
          <span>
            Hit the button below and follow the prompts.{" "}
            <Link
              className="text-header"
              href="https://gamisodes.com/blogs/news/digital-collectibles-wallet-explained"
              target="_blank"
            >
              Learn more.
            </Link>
          </span>
        </p>
      }
      buttonText="Link or create dapper wallet"
      onClick={signIn}
      isLoading={isLoading}
      error={(error as unknown as Error) ?? (error?.errors![0] as unknown as Error) ?? null}
    />
  )
}
export default RegisterWallet
