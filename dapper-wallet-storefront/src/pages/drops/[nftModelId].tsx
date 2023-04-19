import { Skeleton } from "@chakra-ui/react"
import { dehydrate, QueryClient } from "@tanstack/react-query"
import { EModelTypes } from "consts/const"
import { convertNumber } from "consts/helpers"
import { fetchData } from "fetcher"
import { GetServerSidePropsContext } from "next"
import { useRouter } from "next/router"
import { useMemo } from "react"
import { CheckoutProvider } from "src/components/drops/checkout/CheckoutProvider"
import NFTModelDetail from "src/components/drops/NFTModelDetail"
import { MetaTags } from "src/components/general/MetaTags"
import { DEFAULT_NFT_PRICE } from "src/lib/const"
import { getAddressFromCookie } from "src/lib/cookieUtils"
import { anyToBoolean } from "src/lib/convertor"
import {
  useNftModelQuery,
  NftModelQuery,
  NftModelQueryVariables,
  NftModelDocument,
  WalletByAddressQuery,
  WalletByAddressQueryVariables,
  WalletByAddressDocument,
} from "generated/graphql"
import AppLayout from "src/components/AppLayout"

const NFTModelDetailPage = () => {
  const router = useRouter()
  const nftModelId = router.query["nftModelId"]?.toString()
  const { data, isSuccess } = useNftModelQuery({
    id: nftModelId,
  })
  const nftModel = data?.nftModel
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
      checkoutDisclaimer: (nftModel?.attributes?.checkoutDisclaimer as string) ?? null,
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

  return (
    <>
      <AppLayout>
        <Skeleton className="mx-auto w-full" isLoaded={isSuccess}>
          <CheckoutProvider id={nftModelId}>
            <NFTModelDetail metadata={metadata} />
          </CheckoutProvider>
        </Skeleton>
      </AppLayout>
    </>
  )
}

export async function getServerSideProps({ params, req, res }: GetServerSidePropsContext) {
  const urlParam = params.nftModelId as string
  const queryClient = new QueryClient()
  const nftModelsVariables = { id: urlParam }
  await queryClient.prefetchQuery(
    ["nftModel", nftModelsVariables],
    fetchData<NftModelQuery, NftModelQueryVariables>(NftModelDocument, nftModelsVariables)
  )

  const data: NftModelQuery = await queryClient.getQueryData(["nftModel", nftModelsVariables])

  if (!data?.nftModel || anyToBoolean(data?.nftModel?.attributes?.isBlocked)) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  const address: string = getAddressFromCookie(req, res)

  if (address) {
    const walletByAddressVariables = { address }
    await queryClient.prefetchQuery(
      ["walletByAddress", walletByAddressVariables],
      fetchData<WalletByAddressQuery, WalletByAddressQueryVariables>(
        WalletByAddressDocument,
        walletByAddressVariables
      )
    )
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
export default NFTModelDetailPage
