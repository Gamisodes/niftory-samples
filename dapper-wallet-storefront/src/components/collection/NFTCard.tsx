import { convertNumber } from "consts/helpers"
import Link from "next/link"
import { useMemo } from "react"
import { DEFAULT_NFT_PRICE } from "src/lib/const"
import Ellipsis from "src/ui/Ellipsis"
import { Nft } from "../../../generated/graphql"
import { Subset } from "../../lib/types"

type NFTCard = { nft: Subset<Nft>; clickUrl: string; counter: number }

export const NFTCard = ({ clickUrl, nft, counter }: NFTCard) => {
  const nftModel = nft?.model
  const imageUrl = nftModel?.content.poster.url
  const title = nftModel?.title

  const stats = {
    rarity: nftModel?.rarity,
    serial: nft?.serialNumber?.toString(),
    price: convertNumber(+nft?.model?.attributes?.price, DEFAULT_NFT_PRICE),
    editionSize: ((nftModel?.metadata?.editionSize as string) ??
      (nftModel?.attributes?.editionSize as string) ??
      null) as string | null,
  }

  const renderEdition = useMemo(() => {
    if (counter > 1) {
      return (
        <>
          {stats?.editionSize && stats?.editionSize === "Open"
            ? `${counter} Editions / Open`
            : `${counter} Editions / ${nftModel?.quantity}`}
        </>
      )
    } else
      return (
        <>
          {stats?.editionSize && stats?.editionSize === "Open"
            ? `Edition: ${nft?.serialNumber ?? "~"} / Open`
            : `Edition: ${nft?.serialNumber ?? "~"} / ${nftModel?.quantity}`}
        </>
      )
  }, [])

  return (
    <Link className="flex" href={clickUrl}>
      <div className="flex flex-col bg-white h-full text-black max-w-xs md:max-w-[157px] p-4 rounded-lg transform-gpu transition-all hover:bg-gray-200 hover:border-purple hover:shadow-sm hover:-translate-y-1">
        <div className="relative group">
          <img
            className="aspect-square object-contain w-full"
            src={imageUrl}
            alt={title}
            draggable="false"
          />
        </div>
        <div className="flex flex-col h-full justify-between">
          <div className="my-2 text-center font-dosis font-bold text-base">
            <Ellipsis lines={3} breakWord>
              {title}
            </Ellipsis>
          </div>
          {stats && (
            <div className="flex justify-center mt-auto">
              <div className="flex w-fit font-dosis font-normal text-sm text-center bg-header text-white py-0.5 px-1">
                <p>{renderEdition}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
