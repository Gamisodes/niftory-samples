import { useSession } from "next-auth/react"
import Link from "next/link"
import { PropsWithChildren } from "react"
import AppLayout from "src/components/AppLayout"
import { MetaTags } from "src/components/general/MetaTags"
import { useWalletContext } from "src/hooks/useWalletContext"
import { SectionHeader } from "src/ui/SectionHeader"

type CustodialWalletGuardProps = PropsWithChildren & {
  isActive: boolean
}

function CustodialWalletGuard({ children, isActive = false }: CustodialWalletGuardProps) {
  const { data } = useSession()
  const { currentUser } = useWalletContext()
  if (!isActive) {
    return <>{children}</>
  }
  if (!data?.user?.custodialAddress && currentUser && !currentUser.loggedIn) {
    return (
      <>
        <MetaTags />
        <AppLayout>
          <section className="mx-auto text-black">
            <SectionHeader text="Access denied" />
            <div className="flex flex-col justify-center items-center">
              <p className="text-dosis text-black text-xl font-bold pb-6">
                You need to login to your Dapper Wallet
              </p>
              <Link href={"/account"} className="flex w-fit items-center">
                <button className="uppercase font-dosis font-bold text-base p-2 px-16 text-white transition-colors bg-header hover:bg-purple">
                  Sign in / Sign up
                </button>
              </Link>
            </div>
          </section>
        </AppLayout>
      </>
    )
  }

  if (data.user.custodialAddress || (currentUser && currentUser.loggedIn)) {
    return <>{children}</>
  }

  return (
    <>
      <MetaTags />
      <AppLayout>
        <section className="mx-auto text-black">
          <SectionHeader text="Loading custodial..." />
        </section>
      </AppLayout>
    </>
  )
}

export default CustodialWalletGuard