import { useSession, signIn } from "next-auth/react"
import Link from "next/link"
import { PropsWithChildren } from "react"
import AppLayout from "src/components/AppLayout"
import { MetaTags } from "src/components/general/MetaTags"
import { SectionHeader } from "src/ui/SectionHeader"

function AuthGuard({ children }: PropsWithChildren) {
  const { status } = useSession()
  if (status === "authenticated") {
    return <>{children}</>
  }

  if (status === "unauthenticated") {
    return (
      <>
        <MetaTags />
        <AppLayout>
          <section className="mx-auto text-black">
            <SectionHeader text="Access denied" />
            <div className="flex flex-col justify-center items-center">
              <p className="text-dosis text-black text-xl font-bold pb-6">
                You need to login to our app
              </p>
              {/* <button
              onClick={() => signIn()}
              className="uppercase font-dosis font-bold text-base p-2 px-16 text-white transition-colors bg-header hover:bg-purple"
            >
              Sign in / Sign up
            </button> */}
              <Link href={"/sign-in"} className="flex w-fit items-center">
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

  return (
    <>
      <MetaTags />
      <AppLayout>
        <section className="mx-auto text-black">
          <SectionHeader text="Loading..." />
        </section>
      </AppLayout>
    </>
  )
}

export default AuthGuard
