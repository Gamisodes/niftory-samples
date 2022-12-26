import { Box } from "@chakra-ui/react"
import Head from "next/head"
import { useRouter } from "next/router"

import { Nft, useNftQuery } from "../../../../generated/graphql"
import AppLayout from "../../../components/AppLayout"
import { NFTDetail } from "../../../components/collection/NFTDetail"
import { Subset } from "../../../lib/types"
import { LoginSkeleton } from "../../../ui/Skeleton"

export const NFTDetailPage = () => {
  const router = useRouter()
  const nftId: string = router.query["nftId"]?.toString()

  const [nftResponse] = useNftQuery({ variables: { id: nftId } })

  const nft: Subset<Nft> = nftResponse.data?.nft

  if (!nftId || nftResponse.fetching) {
    return <LoginSkeleton />
  }

  const nftModel = nft?.model
  const title = `${nftModel?.title ?? "Your's idea with"} | Gamisodes`

  return (
    <>
      <Head>
        <title>{nftModel?.title ?? ""}</title>
        <meta property="og:title" content={title} key="title" />
        <meta property="og:description" content={nftModel?.description ?? ""} key="description" />
        <meta property="og:image" content={nftModel?.content?.files[0]?.url ?? ""} key="image" />
      </Head>
      <AppLayout>
        <Box maxW="7xl" mx="auto" mt="12">
          {nft && <NFTDetail nft={nft} />}
        </Box>
      </AppLayout>
    </>
  )
}

export default NFTDetailPage
