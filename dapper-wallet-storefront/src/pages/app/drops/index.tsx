import Head from "next/head"
import { useMemo } from "react"

import { useNftModelsQuery } from "../../../../generated/graphql"
import AppLayout from "../../../components/AppLayout"
import { SectionHeader } from "../../../ui/SectionHeader"

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
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} key="title" />
      </Head>
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
