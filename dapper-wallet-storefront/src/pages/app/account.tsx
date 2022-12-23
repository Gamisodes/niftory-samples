import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useCallback } from "react"
import AppLayout from "src/components/AppLayout"
import { WalletSetup } from "src/components/wallet/WalletSetup"
import { useWalletContext } from "src/hooks/useWalletContext"
import { SectionHeader } from "src/ui/SectionHeader"

const AccountPage = () => {
  const { signOut: signOutWallet } = useWalletContext()
  const { data: session } = useSession()
  const router = useRouter()

  const logout = useCallback(async function () {
    await Promise.all([signOut({ redirect: false, callbackUrl: "/" }), signOutWallet()])
    router.push("/")
  }, [])

  return (
    <AppLayout>
      <section className="mx-auto text-black flex flex-col items-center">
        <SectionHeader
          text={
            <section className="flex items-center space-x-5">
              <div>
                <img
                  className="inline-block w-20 rounded-full ring-2 ring-white"
                  src={session.user.image}
                />
              </div>
              <p>{session.user.name}'s account</p>
            </section>
          }
        />
        <WalletSetup />
        <button
          onClick={logout}
          className="mt-2 uppercase font-dosis font-bold text-base p-2 px-16 text-white bg-black"
        >
          Sign Out
        </button>
      </section>
    </AppLayout>
  )
}
// AccountPage.requireWallet = true
AccountPage.requireAuth = true

export default AccountPage
