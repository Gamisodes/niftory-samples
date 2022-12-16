import { useSession } from "next-auth/react"
import { useEffect, useRef } from "react"
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
  const { mutate, isSuccess, error, isLoading, data } = useSendRegisterWalletQuery()
  const ref = useRef(null)

  // When the user logs in, register their wallet
  useEffect(() => {
    if (walletContextLoading || !currentUser?.addr) {
      return
    }
    if (ref.current === true) return
    ref.current = currentUser.loggedIn
    mutate()
  }, [currentUser?.addr, currentUser?.loggedIn, walletContextLoading])

  useEffect(() => {
    if (isSuccess) {
      mutateCache()
      gaAPI.connect_dapper_wallet({
        email: User?.user?.email ?? "",
        wallet: data?.data ?? currentUser?.addr ?? "",
      })
    }
  }, [isSuccess])

  return (
    <WalletSetupBox
      text={
        "First, we need to create or connect to a Flow wallet. Hit the button below and follow the prompts."
      }
      buttonText="Link or create your wallet"
      onClick={signIn}
      isLoading={isLoading}
      error={(error as unknown as Error) ?? (error?.errors![0] as unknown as Error) ?? null}
    />
  )
}
export default RegisterWallet
