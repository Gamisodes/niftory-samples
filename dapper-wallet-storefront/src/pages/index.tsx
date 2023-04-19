import { CollectionGrid } from "src/components/collection/CollectionGrid"
import CollectionWrapper from "src/components/collection/CollectionWrapper"
import { MetaTags } from "src/components/general/MetaTags"
import { SectionHeader } from "src/ui/SectionHeader"
import AppLayout from "../components/AppLayout"

const HomePage = () => {
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

HomePage.requireWallet = true
HomePage.requireAuth = true
export default HomePage
