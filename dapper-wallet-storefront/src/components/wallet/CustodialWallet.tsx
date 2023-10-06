import { memo } from "react"
import { getCurrentUser, useAuth } from "src/store/users"
import shallow from "zustand/shallow"

function CustodialWallet() {
  const [user] = useAuth(getCurrentUser, shallow)

  return (
    <div className="px-4 pb-4 lg:[px-0 pb-0]">
      <p>
        Your Gamisodes Digital Collectibles Wallet ID is:{" "}
        <i>{user?.custodialWallet?.niftoryWalletId}</i>
      </p>
    </div>
  )
}

export default memo(CustodialWallet)
