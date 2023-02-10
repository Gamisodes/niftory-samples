import Link from "next/link"
import Ellipsis from "src/ui/Ellipsis"
import { Nft } from "../../../generated/graphql"
import { Subset } from "../../lib/types"

type NFTCard = { nft: Subset<Nft>; clickUrl: string }
export const NFTCard = ({ clickUrl, nft }: NFTCard) => {
  const nftModel = nft?.model
  const imageUrl = nft?.imageUrl
  const title = nft?.title

  const stats = {
    rarity: nft?.rarity,
    serial: nft?.serialNumber?.toString(),
  }

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
          {/* {stats && (
            <div className="flex justify-center mt-auto">
              <div className="flex w-fit font-dosis font-normal text-sm text-center bg-header text-white py-0.5 px-2">
                <p>
                  <span className="font-bold">Serial: </span>
                  {nft && nft.serialNumber} / {nftModel.quantity}
                </p>
              </div>
            </div>
          )} */}
        </div>
      </div>
    </Link>
  )
}
