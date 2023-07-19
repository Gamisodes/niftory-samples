import { EModelTypes } from "consts/const"
import { convertNumber } from "consts/helpers"
import { useNftModelQuery } from "generated/graphql"
import { useRouter } from "next/router"
import { useMemo } from "react"
import { DEFAULT_NFT_PRICE } from "src/lib/const"

export function useNftDetail() {
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

  return { metadata, isSuccess, nftModelId }
}
