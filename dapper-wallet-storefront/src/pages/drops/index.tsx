import { useNftModelsQuery } from "generated/graphql"
import { useMemo } from "react"
import AppLayout from "src/components/AppLayout"
import { MetaTags } from "src/components/general/MetaTags"
import { SectionHeader } from "src/ui/SectionHeader"

export const NFTModelsPage = () => {
  const { data: result, isLoading } = useNftModelsQuery({
    appId: process.env.NEXT_PUBLIC_CLIENT_ID,
  })

  const nftModels = useMemo(() => {
    return result?.nftModels?.items?.filter((val) => val) ?? []
  }, [result?.nftModels?.items, isLoading])

  const title = `Get A Drop: TBD | Gamisodes`

  return (
    <>
      <MetaTags title={title} />
      <AppLayout>
        <section className="text-black mx-auto">
          <SectionHeader text="Get A Drop: TBD" />
          {/* {nftModels && <NFTModelsGrid nftModels={nftModels} />} */}
        </section>
      </AppLayout>
    </>
  )
}

export default NFTModelsPage
