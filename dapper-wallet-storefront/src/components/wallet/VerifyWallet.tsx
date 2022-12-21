import * as fcl from "@onflow/fcl"
import { useCallback, useEffect } from "react"
import { useSendVerifyWalletQuery } from "src/services/wallet/hooks"
import { WalletSetupBox } from "./WalletSetupBox"

export type VerifyWalletProps = {
  verificationCode: string
  mutateCache: () => void
}

function VerifyWallet({ verificationCode, mutateCache }: VerifyWalletProps) {
  const { mutate, error, isSuccess, isLoading } = useSendVerifyWalletQuery()

  // On click, prompt the user to sign the verification message
  const onClick = useCallback(async () => {
    // Use FCL to sign the verification message
    const signedVerificationCode = await fcl.currentUser.signUserMessage(verificationCode)

    if (!signedVerificationCode || isLoading) {
      return
    }
    mutate({ signature: signedVerificationCode })
  }, [mutateCache, verificationCode])
  console.log("Verify wallet: ", isSuccess)
  useEffect(() => {
    if (isSuccess) mutateCache()
  }, [isSuccess])

  return (
    <WalletSetupBox
      text={
        "Step 2 is proving that the wallet is yours. Click the button below to send a secure message signed by your wallet."
      }
      buttonText="Verify wallet"
      onClick={onClick}
      isLoading={isLoading}
      error={(error as unknown as Error) ?? (error?.errors![0] as unknown as Error) ?? null}
    />
  )
}

export default VerifyWallet
