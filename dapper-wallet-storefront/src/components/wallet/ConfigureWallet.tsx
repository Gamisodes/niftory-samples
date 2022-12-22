import { useEffect } from "react"
import { useSendReadyWalletQuery } from "src/services/wallet/hooks"

import { useFlowAccountConfiguration } from "../../hooks/useFlowAccountConfiguration"
import { WalletSetupBox } from "./WalletSetupBox"

export type ConfigureWalletProps = {
  address: string
  mutateCache: () => void
}

function ConfigureWallet({ mutateCache }: ConfigureWalletProps) {
  const { mutate, isLoading: readying, isSuccess, error } = useSendReadyWalletQuery()
  const {
    configured,
    configure,
    isLoading: isFlowAccountConfigurationLoading,
  } = useFlowAccountConfiguration()
  const isLoading = isFlowAccountConfigurationLoading || readying

  // Once the wallet is configured, call the ready mutation to tell Niftory it's ready to receive NFTs
  useEffect(() => {
    if (!configured || readying) {
      return
    }
    mutate()
  }, [configured])

  console.log("Configure Wallet: ", isSuccess)
  useEffect(() => {
    if (isSuccess) mutateCache()
  }, [isSuccess, isLoading])

  return (
    <WalletSetupBox
      text={
        <p className="flex flex-col">
          <span>You're almost there.</span>
          <span>Now we need to configure your wallet to receive NFTs.</span>
          <span>This is the last step!</span>
        </p>
      }
      buttonText="Configure wallet"
      onClick={configure}
      isLoading={isLoading}
      error={(error as unknown as Error) ?? (error?.errors![0] as unknown as Error) ?? null}
    />
  )
}

export default ConfigureWallet
