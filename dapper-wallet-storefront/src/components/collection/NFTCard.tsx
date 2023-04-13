import Link from "next/link"
import { useMemo } from "react"
import { INft } from "src/typings/INfts"
import Ellipsis from "src/ui/Ellipsis"

type NFTCard = { nft: INft; clickUrl: string; counter: number }

export const NFTCard = ({ clickUrl, nft, counter }: NFTCard) => {
  const {
    title,
    editionSize,
    edition,
    isOpenEdition,
    imageUrl: { thumbnailUrl },
  } = nft
  
  const renderEdition = useMemo(() => {
    if (counter > 1) {
      return (
        <>{isOpenEdition ? `${counter} Editions / Open` : `${counter} Editions / ${editionSize}`}</>
      )
    } else
      return (
        <>
          {isOpenEdition
            ? `Edition: ${edition ?? "~"} / Open`
            : `Edition: ${edition ?? "~"} / ${editionSize}`}
        </>
      )
  }, [])

  return (
    <Link className="flex" href={clickUrl}>
      <div className="flex flex-col bg-white h-full text-black max-w-xs md:max-w-[157px] p-4 rounded-lg transform-gpu transition-all hover:bg-gray-200 hover:border-purple hover:shadow-sm hover:-translate-y-1">
        <div className="relative group">
          <img
            className="aspect-square object-contain w-full "
            src={thumbnailUrl}
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
          <div className="flex justify-center mt-auto">
            <div className="flex w-fit font-dosis font-normal text-sm text-center bg-header text-white py-0.5 px-1">
              <p>{renderEdition}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
