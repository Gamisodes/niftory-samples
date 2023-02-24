import { useEffect } from "react"
import usePreventLeave from "src/hooks/usePreventLeave"
import { useSendReadyWalletQuery } from "src/services/wallet/hooks"

import { useFlowAccountConfiguration } from "../../hooks/useFlowAccountConfiguration"
import { WalletSetupBox } from "./WalletSetupBox"

function ConfigureWallet() {
  const { mutateAsync, isLoading: readying, error } = useSendReadyWalletQuery()
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
    mutateAsync()
  }, [configured])
  usePreventLeave(() => {
    return isLoading
  }, [isLoading])
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
