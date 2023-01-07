import { useSession } from "next-auth/react"
import { useEffect, useRef } from "react"
import usePreventLeave from "src/hooks/usePreventLeave"
import gaAPI from "src/services/ga_events"

import { useSendRegisterWalletQuery } from "src/services/wallet/hooks"
import { useWalletContext } from "../../hooks/useWalletContext"
import { WalletSetupBox } from "./WalletSetupBox"

type RegisterWalletProps = {
  mutateCache: () => void
}

function RegisterWallet({ mutateCache }: RegisterWalletProps) {
  const { data: User } = useSession()
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
      mutateCache()
      gaAPI.connect_dapper_wallet({
        email: User?.user?.email ?? "",
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
          <span>First, we need to create or connect to a Flow wallet.</span>
          <span>Hit the button below and follow the prompts.</span>
        </p>
      }
      buttonText="Link or create your wallet"
      onClick={signIn}
      isLoading={isLoading}
      error={(error as unknown as Error) ?? (error?.errors![0] as unknown as Error) ?? null}
    />
  )
}
export default RegisterWallet
