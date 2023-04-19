import { useSession } from "next-auth/react"
import AppLayout from "src/components/AppLayout"
import { MetaTags } from "src/components/general/MetaTags"
import { WalletSetup } from "src/components/wallet/WalletSetup"
import { SectionHeader } from "src/ui/SectionHeader"

const AccountPage = () => {
  const { data: session } = useSession()
  const title = `${session.user.name}'s account | Gamisodes`
  return (
    <>
      <MetaTags title={title} />
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
        </section>
      </AppLayout>
    </>
  )
}
// AccountPage.requireWallet = true
AccountPage.requireAuth = true

export default AccountPage
