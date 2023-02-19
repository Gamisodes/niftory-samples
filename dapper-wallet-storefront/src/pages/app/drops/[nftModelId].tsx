import { Skeleton } from "@chakra-ui/react"
import { EModelTypes } from "consts/const"
import { convertNumber } from "consts/helpers"
import { GetServerSidePropsContext } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { useMemo } from "react"
import NFTModelDetail from "src/components/drops/NFTModelDetail"
import { DEFAULT_NFT_PRICE } from "src/lib/const"

import { getGraphQLClient } from "src/lib/GraphQLClientProvider"
import {
  NftModelDocument,
  NftModelQuery,
  NftModelQueryVariables,
  useNftModelQuery,
} from "../../../../generated/graphql"
import AppLayout from "../../../components/AppLayout"

const NFTModelDetailPage = (props) => {
  const router = useRouter()
  const nftModelId = router.query["nftModelId"]?.toString()

  const [nftModelResponse] = useNftModelQuery({
    variables: { id: nftModelId },
    // requestPolicy: "cache-only",
    requestPolicy: "cache-first",
  })

  const nftModel = nftModelResponse?.data?.nftModel
  const metadata = useMemo(
    () => ({
      title: nftModel?.title,
      description: nftModel?.description,
      amount: nftModel?.quantity,
      quantityMinted: +nftModel?.quantityMinted,
      price: convertNumber(
        nftModel?.attributes?.price,
        convertNumber(nftModel?.metadata?.price, DEFAULT_NFT_PRICE)
      ),
      type: (nftModel?.metadata?.type ??
        nftModel?.attributes?.type ??
        EModelTypes.GENERAL) as EModelTypes,
      editionSize: ((nftModel?.metadata?.editionSize as string) ??
        (nftModel?.attributes?.editionSize as string) ??
        null) as string | null,
      content: [
        {
          contentType: nftModel?.content?.files[0]?.contentType,
          contentUrl: nftModel?.content?.files[0]?.url,
          thumbnailUrl: nftModel?.content?.poster?.url,
          alt: nftModel?.title,
        },
      ],
    }),
    [nftModel?.id]
  )

  const title = `${metadata.title ?? "Your's idea with"} | Gamisodes`
  console.log(nftModel)
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} key="title" />
        <meta property="og:description" content={metadata.description} key="description" />
        <meta property="og:image" content={metadata.content[0].contentUrl ?? ""} key="image" />
      </Head>
      <AppLayout>
        <Skeleton className="mx-auto w-full" isLoaded={!nftModelResponse.fetching}>
          <NFTModelDetail id={nftModelId} metadata={metadata} />
        </Skeleton>
      </AppLayout>
    </>
  )
}

export async function getServerSideProps({ params }: GetServerSidePropsContext) {
  const urlParam = params.nftModelId
  const [client, ssrCache] = getGraphQLClient()
  await client
    .query<NftModelQuery, NftModelQueryVariables>(NftModelDocument, {
      id: urlParam as string,
    })
    .toPromise()

  return {
    props: {
      urqlState: ssrCache.extractData(),
    },
  }
}
export default NFTModelDetailPage
