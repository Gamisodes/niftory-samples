import { useSession } from "next-auth/react"
import AppLayout from "src/components/AppLayout"
import { MetaTags } from "src/components/general/MetaTags"
import CustodialWallet from "src/components/wallet/CustodialWallet"
import { WalletSetup } from "src/components/wallet/WalletSetup"
import { SectionHeader } from "src/ui/SectionHeader"

const AccountPage = () => {
  const { data: session } = useSession()
  const name = session?.user?.name ?? session?.user?.email
  const custodialWallet = session?.user?.custodialAddress
  const title = `${name}'s account | Gamisodes`
  return (
    <>
      <MetaTags title={title} />
      <AppLayout>
        <section className="mx-auto text-black flex flex-col items-center">
          <SectionHeader
            text={
              <section className="flex items-center space-x-5">
                {session?.user?.image && (
                  <div>
                    <img
                      className="inline-block w-20 rounded-full ring-2 ring-white"
                      src={session?.user?.image}
                    />
                  </div>
                )}
                <p className="leading-[32px] text-[28px] lg:leading-[54px] lg:text-[48px]">{name}'s account</p>
              </section>
            }
          />
          {custodialWallet && <CustodialWallet />}
          <WalletSetup />
        </section>
      </AppLayout>
    </>
  )
}
// AccountPage.requireWallet = true
AccountPage.requireAuth = true

export default AccountPage
