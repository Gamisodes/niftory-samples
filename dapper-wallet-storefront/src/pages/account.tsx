import AppLayout from "src/components/AppLayout"
import { MetaTags } from "src/components/general/MetaTags"
import CustodialWallet from "src/components/wallet/CustodialWallet"
import { WalletSetup } from "src/components/wallet/WalletSetup"
import { getCurrentUser, useAuth } from "src/store/users"
import { SectionHeader } from "src/ui/SectionHeader"
import { shallow } from "zustand/shallow"

const AccountPage = () => {
  const [user] = useAuth(getCurrentUser, shallow)
  const name = user?.name ?? user?.email
  const custodialWallet = user?.custodialWallet
  const title = `${name}'s account | Gamisodes`
  return (
    <>
      <MetaTags title={title} />
      <AppLayout>
        <section className="mx-auto text-black flex flex-col items-center">
          <SectionHeader
            text={
              <section className="flex items-center space-x-5">
                {user?.image && (
                  <div>
                    <img
                      className="inline-block w-20 rounded-full ring-2 ring-white"
                      src={user?.image}
                    />
                  </div>
                )}
                <p className="leading-[32px] text-[28px] lg:leading-[54px] lg:text-[48px]">
                  {name}'s account
                </p>
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
