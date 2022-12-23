import { BuiltInProviderType } from "next-auth/providers"
import { ClientSafeProvider, getProviders, LiteralUnion, signIn } from "next-auth/react"
import { useRouterHistory } from "src/components/RouterHistory"

import GoogleIcon from "src/icon/GoogleOAuth.svg"
import AppLayout from "../../components/AppLayout"
import { SectionHeader } from "../../ui/SectionHeader"

interface ISignInPageProps {
  providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>
}

const SignInPage = ({ providers }: ISignInPageProps) => {
  const previousRoute = useRouterHistory()
  return (
    <AppLayout>
      <section className="mx-auto flex flex-col items-center">
        <SectionHeader text="Sign-in to our app" />
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button
              onClick={() => {
                const options = {
                  callbackUrl: `${window.location.origin + previousRoute}`,
                }
                console.info("Sign-in options: ", options)
                signIn(provider.id, options)
              }}
              className="flex px-6 py-3 mt-4 font-semibold text-gray-900 bg-white border-2 border-gray-500 rounded-md shadow-lg outline-none hover:border-header focus:outline-none"
              style={{ minWidth: 200 }}
            >
              <GoogleIcon className="w-5 mr-4" />
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </section>
    </AppLayout>
  )
}
export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: {
      providers,
    },
  }
}

SignInPage.requireWallet = false

export default SignInPage
