import { useSession } from "next-auth/react"
import { memo } from "react"

function CustodialWallet() {
  const { data: session } = useSession()
  return (
    <div className="px-4 pb-4 lg:[px-0 pb-0]">
      <p>
        Your Gamisodes Digital Collectibles Wallet ID is: <i>{session.user.custodialAddress}</i>
      </p>
    </div>
  )
}

export default memo(CustodialWallet)
