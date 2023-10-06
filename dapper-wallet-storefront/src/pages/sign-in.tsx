import { signIn } from "next-auth/react"

import EmailOAuth from "src/icon/EmailOAuth.svg"
import GoogleIcon from "src/icon/GoogleOAuth.svg"

import Link from "next/link"
import { memo, useMemo } from "react"
import AppLayout from "src/components/AppLayout"
import EmailSignIn from "src/components/auth/email/EmailSignIn"
import { MetaTags } from "src/components/general/MetaTags"
import { SectionHeader } from "src/ui/SectionHeader"

const icons = {
  google: <GoogleIcon className="w-5 mr-4" />,
  email: <EmailOAuth className="w-5 mr-4" />,
}

const providers = [
  { id: "email", name: "Email" },
  { id: "google", name: "Google" },
]

type BasicAuthButton = {
  id: string
  name: string
}
const GoogleAuth = memo(function GoogleAuth({ id, name }: BasicAuthButton) {
  const finalHrefLink = useMemo(() => {
    const origin =
      typeof window !== "undefined" && window.location.origin ? window.location.origin : ""
    console.log(origin)
    return `/server/auth/google?redirectUrl=${origin}/account`
  }, [])
  return (
    <div key={id}>
      <Link
        href={finalHrefLink}
        className="mOin-w-[210px] cursor-pointer flex justify-center px-6 items-center py-3 mt-4 font-semibold text-gray-900 bg-white border-2 border-gray-500 rounded-md shadow-lg outline-none hover:border-header focus:outline-none"
      >
        {icons[id]}
        Sign in with {name}
      </Link>
    </div>
  )
})

const SignInPage = () => {
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
                <EmailSignIn key={provider.id}>
                  {icons[provider.id]}
                  Sign in with {provider.name}
                </EmailSignIn>
              )
            }
            if (provider.id === "google") {
              return <GoogleAuth key={provider.id} id={provider.id} name={provider.name} />
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

SignInPage.requireWallet = false

export default SignInPage
