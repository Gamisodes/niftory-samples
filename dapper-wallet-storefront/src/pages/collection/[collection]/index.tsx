import { useRouter } from "next/router"
import AppLayout from "src/components/AppLayout"
import { CollectionGrid } from "src/components/collection/CollectionGrid"
import CollectionWrapper from "src/components/collection/CollectionWrapper"
import { MetaTags } from "src/components/general/MetaTags"
import { ComponentWithWallet } from "src/lib/types"
import { SectionHeader } from "src/ui/SectionHeader"

const SelectedCollectionPage: ComponentWithWallet = () => {
  const { query } = useRouter()

  const title = `My "${query["collection"]}" Collection | Gamisodes`
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

// SelectedCollectionPage.requireWallet = true
SelectedCollectionPage.requiredCustodialWallet = true
SelectedCollectionPage.requireAuth = true

export default SelectedCollectionPage
