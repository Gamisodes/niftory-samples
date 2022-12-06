import { useEffect } from "react"
import { useSendReadyWalletQuery } from "src/services/wallet/hooks"

import { useFlowAccountConfiguration } from "../../hooks/useFlowAccountConfiguration"
import { WalletSetupBox } from "./WalletSetupBox"

export type ConfigureWalletProps = {
  address: string
  mutateCache: () => void
}

export function ConfigureWallet({ mutateCache }: ConfigureWalletProps) {
  const { mutate, isLoading: readying, isSuccess, error } = useSendReadyWalletQuery()
  const {
    configured,
    configure,
    isLoading: isFlowAccountConfigurationLoading,
  } = useFlowAccountConfiguration()

  // Once the wallet is configured, call the ready mutation to tell Niftory it's ready to receive NFTs
  useEffect(() => {
    if (!configured) {
      return
    }
    mutate()
  }, [configured])

  useEffect(() => {
    if (isSuccess) mutateCache()
  }, [isSuccess])
  const isLoading = isFlowAccountConfigurationLoading || readying

  return (
    <WalletSetupBox
      text={
        "You're almost there. Now we need to configure your wallet to receive NFTs. This is the last step!"
      }
      buttonText="Configure wallet"
      onClick={configure}
      isLoading={isLoading}
      error={(error?.errors![0] as unknown as Error) ?? null}
    />
  )
}
