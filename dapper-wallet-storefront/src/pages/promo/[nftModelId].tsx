import { Skeleton } from "@chakra-ui/react"
import { dehydrate, QueryClient } from "@tanstack/react-query"
import { fetchData } from "fetcher"
import {
  MyWalletsDocument,
  MyWalletsQuery,
  MyWalletsQueryVariables,
  NftModelDocument,
  NftModelQuery,
  NftModelQueryVariables,
} from "generated/graphql"
import { GetServerSidePropsContext } from "next"
import { memo } from "react"
import AppLayout from "src/components/AppLayout"
import { CheckoutProvider } from "src/components/drops/checkout/CheckoutProvider"
import FreePromoComponent from "src/components/promo/FreePromoComponent"
import { useNftDetail } from "src/hooks/useNftDetail"
import { anyToBoolean } from "src/lib/convertor"
import { getAddressFromCookie } from "src/lib/cookieUtils"
import PromoNFTModelDetail from "src/components/promo/PromoNFTModelDetail"
const NFTModelDetailPage = () => {
  const { metadata, nftModelId, isSuccess } = useNftDetail()

  return (
    <>
      <AppLayout>
        <Skeleton className="mx-auto w-full" isLoaded={isSuccess}>
          <CheckoutProvider id={nftModelId}>
            <PromoNFTModelDetail metadata={metadata}>
              <FreePromoComponent />
            </PromoNFTModelDetail>
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

  if (address && urlParam) {
    const myWalletsVariables = { address }
    await queryClient.prefetchQuery(
      ["myWallets", myWalletsVariables],
      fetchData<MyWalletsQuery, MyWalletsQueryVariables>(MyWalletsDocument, myWalletsVariables)
    )
    return {
      redirect: {
        destination: `/drops/${urlParam}`,
        permanent: false,
      },
    }
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
export default memo(NFTModelDetailPage)
