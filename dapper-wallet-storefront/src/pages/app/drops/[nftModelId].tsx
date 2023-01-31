import { Skeleton } from "@chakra-ui/react"
import { GetServerSidePropsContext } from "next"
import { withUrqlClient } from "next-urql"
import Head from "next/head"
import { useRouter } from "next/router"
import NFTModelDetail from "src/components/drops/NFTModelDetail"
import { DEFAULT_NFT_PRICE } from "src/lib/const"

import { getGraphQLClient, GraphQLClientOptions } from "src/lib/GraphQLClientProvider"
import {
  NftModelDocument,
  NftModelQuery,
  NftModelQueryVariables,
  useNftModelQuery,
} from "../../../../generated/graphql"
import AppLayout from "../../../components/AppLayout"
// import { NFTModelDetail } from "../../../components/drops/NFTModelDetail"
import { useEffect } from "react"

const NFTModelDetailPage = (props) => {
  const router = useRouter()
  const nftModelId = router.query["nftModelId"]?.toString()

  const [nftModelResponse] = useNftModelQuery({
    variables: { id: nftModelId },
    // requestPolicy: "cache-only",
    requestPolicy: "cache-first",
  })

  const nftModel = nftModelResponse?.data?.nftModel
  const metadata = {
    title: nftModel?.title,
    description: nftModel?.description,
    amount: nftModel?.quantity,
    quantityMinted: +nftModel?.quantityMinted,
    price: nftModel?.attributes?.price
      ? nftModel?.attributes?.price ?? DEFAULT_NFT_PRICE
      : DEFAULT_NFT_PRICE,
    content: [
      {
        contentType: nftModel?.content?.files[0]?.contentType,
        contentUrl: nftModel?.content?.files[0]?.url,
        thumbnailUrl: nftModel?.content?.poster?.url,
        alt: nftModel?.title,
      },
    ],
  }
  const title = `${metadata.title ?? "Your's idea with"} | Gamisodes`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} key="title" />
        <meta property="og:description" content={metadata.description} key="description" />
        <meta property="og:image" content={metadata.content[0].contentUrl ?? ""} key="image" />
      </Head>
      <AppLayout>
        {/* <Skeleton className="mx-auto w-full" isLoaded={!nftModelResponse.fetching}>
          <NFTModelDetail id={nftModelId} metadata={metadata} />
        </Skeleton> */}
      </AppLayout>
    </>
  )
}
export async function getServerSideProps({ params }: GetServerSidePropsContext) {
  const urlParam = params.nftModelId
  const [client, ssrCache] = getGraphQLClient()
  const data = await client
    .query<NftModelQuery, NftModelQueryVariables>(NftModelDocument, {
      id: urlParam as string,
    })
    .toPromise()
  // console.log("url:", client, ssrCache.extractData())

  return {
    props: {
      urqlState: ssrCache.extractData(),
    },
  }
}
// export default NFTModelDetailPage
// export default withUrqlClient(getGraphQLClientConfig, { ssr: true })(NFTModelDetailPage)
export default NFTModelDetailPage
