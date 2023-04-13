import AppLayout from "src/components/AppLayout"
import { CollectionGrid } from "src/components/collection/CollectionGrid"
import CollectionWrapper from "src/components/collection/CollectionWrapper"
import { MetaTags } from "src/components/general/MetaTags"
import { SectionHeader } from "src/ui/SectionHeader"

const CollectionPage = () => {
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
