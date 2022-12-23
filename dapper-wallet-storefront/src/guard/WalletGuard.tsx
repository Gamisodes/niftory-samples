import Link from "next/link"
import { PropsWithChildren } from "react"
import AppLayout from "src/components/AppLayout"
import { useWalletContext } from "src/hooks/useWalletContext"
import { SectionHeader } from "src/ui/SectionHeader"

function WalletGuard({ children }: PropsWithChildren) {
  const { currentUser, isLoading } = useWalletContext()
  if (isLoading) {
    return (
      <AppLayout>
        <section className="mx-auto">
          <SectionHeader text="Loading..." />
        </section>
      </AppLayout>
    )
  }

  if (currentUser && !currentUser.loggedIn) {
    return (
      <AppLayout>
        <section className="mx-auto">
          <SectionHeader text="Access denied" />
          <div className="flex flex-col justify-center items-center">
            <p className="text-dosis text-black text-xl font-bold pb-6">
              You need to login to your Dapper Wallet
            </p>
            <Link href={"/app/account"} className="flex w-fit items-center">
              <button className="uppercase font-dosis font-bold text-base p-2 px-16 text-white transition-colors bg-header hover:bg-purple">
                Sign in / Sign up
              </button>
            </Link>
          </div>
        </section>
      </AppLayout>
    )
  }

  return <>{children}</>
}

export default WalletGuard
