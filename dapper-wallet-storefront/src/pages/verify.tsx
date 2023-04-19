import Link from "next/link"

import { useRouter } from "next/router"
import AppLayout from "src/components/AppLayout"
import { MetaTags } from "src/components/general/MetaTags"
import { SectionHeader } from "src/ui/SectionHeader"

const VerifyPage = () => {
  const router = useRouter()
  const title = `Verify | Gamisodes`
  const email = router?.query?.email ?? ""

  return (
    <>
      <MetaTags title={title} />
      <AppLayout>
        <section className="mx-auto flex flex-col items-center text-black">
          <SectionHeader text="Check your email!" />
          <div className="text-xl flex gap-4 flex-col">
            <div>
              <p>A sign in link has been sent to your email address.</p>
              <p className="flex items-center justify-center">
                <span className="italic">{email}</span>
              </p>
            </div>
            <Link href={"/sign-in"} className="flex w-fit items-center mx-auto">
              <button className="uppercase font-dosis font-bold text-base p-2 px-16 text-white transition-colors bg-header hover:bg-purple">
                Back
              </button>
            </Link>
          </div>
        </section>
      </AppLayout>
    </>
  )
}

export default VerifyPage
