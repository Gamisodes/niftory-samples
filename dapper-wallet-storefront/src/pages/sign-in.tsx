import { getProviders, signIn } from "next-auth/react"

import EmailOAuth from "src/icon/EmailOAuth.svg"
import GoogleIcon from "src/icon/GoogleOAuth.svg"

import { InferGetServerSidePropsType } from "next"
import { useMemo } from "react"
import EmailSignIn from "src/components/auth/email/EmailSignIn"
import { MetaTags } from "src/components/general/MetaTags"
import AppLayout from "src/components/AppLayout"
import { SectionHeader } from "src/ui/SectionHeader"

const icons = {
  google: <GoogleIcon className="w-5 mr-4" />,
  email: <EmailOAuth className="w-5 mr-4" />,
}

const SignInPage = ({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const title = `Sign-in | Gamisodes`

  const optionsMemo: Record<string, unknown> = useMemo(
    () => ({
      callbackUrl: typeof window !== "undefined" ? `${window?.location?.origin ?? ""}/account` : "",
    }),
    []
  )

  return (
    <>
      <MetaTags title={title} />
      <AppLayout>
        <section className="mx-auto container flex flex-col items-center text-black">
          <SectionHeader text="Sign-in to our app" />
          {Object.values(providers).map((provider) => {
            if (provider.id === "email") {
              return (
                <EmailSignIn providerId={provider.id} key={provider.id} options={optionsMemo}>
                  {icons[provider.id]}
                  Sign in with {provider.name}
                </EmailSignIn>
              )
            }
            return (
              <div key={provider.id}>
                <button
                  className="min-w-[210px] cursor-pointer flex justify-center px-6 items-center py-3 mt-4 font-semibold text-gray-900 bg-white border-2 border-gray-500 rounded-md shadow-lg outline-none hover:border-header focus:outline-none"
                  onClick={() => {
                    signIn(provider.id, optionsMemo)
                  }}
                >
                  {icons[provider.id]}
                  Sign in with {provider.name}
                </button>
              </div>
            )
          })}
        </section>
      </AppLayout>
    </>
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
