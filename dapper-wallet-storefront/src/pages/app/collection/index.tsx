import CollectionWrapper from "src/components/collection/CollectionWrapper"
import { MetaTags } from "src/components/general/MetaTags"
import { useGetFlowAndNiftoryData } from "src/hooks/useGetFlowAndNiftoryData"
import { SectionHeader } from "src/ui/SectionHeader"
import AppLayout from "../../../components/AppLayout"
import { CollectionGrid } from "../../../components/collection/CollectionGrid"
import { useWalletContext } from "../../../hooks/useWalletContext"

const CollectionPage = () => {
  const { currentUser } = useWalletContext()
  useGetFlowAndNiftoryData(currentUser)

  const title = `My Collection | Gamisodes`
  return (
    <>
      <MetaTags title={title} />
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
CollectionPage.requireAuth = true
export default CollectionPage
