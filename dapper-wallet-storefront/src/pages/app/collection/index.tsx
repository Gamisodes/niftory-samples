import Head from "next/head"
import CollectionWrapper from "src/components/collection/CollectionWrapper"
import { SectionHeader } from "src/ui/SectionHeader"
import AppLayout from "../../../components/AppLayout"
import { CollectionGrid } from "../../../components/collection/CollectionGrid"
import { useWalletContext } from "../../../hooks/useWalletContext"
import { useGetFlowAndNiftoryData } from "src/hooks/useGetFlowAndNiftoryData"


const CollectionPage = () => {
  const { currentUser } = useWalletContext()
  useGetFlowAndNiftoryData(currentUser)
  
  const title = `My Collection | Gamisodes`
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} key="title" />
      </Head>
      <AppLayout>
        <CollectionWrapper>
          <section className="pt-10">
            <SectionHeader classNames="pb-7" text="My Collection" />
          </section>
          <CollectionGrid />
        </CollectionWrapper>
      </AppLayout>
    </>
  )
}

CollectionPage.requireWallet = true
export default CollectionPage
