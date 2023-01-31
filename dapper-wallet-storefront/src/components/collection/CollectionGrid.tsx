import Link from "next/link"
import { Loading } from "src/icon/Loading"
import cn from "classnames"

import { Nft, NftBlockchainState } from "../../../generated/graphql"
import { Subset } from "../../lib/types"
import { NFTCard } from "./NFTCard"
import { CollectionFilter } from "../filter/CollectionFilter"
import { HorizontalFilter } from "../filter/HorizontalFilter"
import { SetStateAction, useState } from "react"

interface IFilterState {
  label: string
  options: { selected: boolean; value: string }[]
  optionsHash: { [key: string]: number }
}
interface CollectionProps {
  isLoading: boolean
  nfts: Subset<Nft>[]
  filter: {
    label: string
    options: { selected: boolean; value: string }[]
    optionsHash: { [key: string]: number }
  }[]
  setFilter: (value: SetStateAction<IFilterState[]>) => void
}
export const CollectionGrid = ({ isLoading, nfts, filter, setFilter }: CollectionProps) => {
  const noNfts = !nfts?.length
  const [showFilter, setShowFilter] = useState(true)

  if (isLoading) {
    return (
      <section>
        <Loading />
      </section>
    )
  }

  if (!noNfts)
    return (
      <section className="grid grid-cols-12 gap-8 w-max">
        {/* <div className="col-span-12">
          <HorizontalFilter setShowFilter={setShowFilter} showFilter={showFilter} />
        </div> */}
        {showFilter && (
          <div className="lg:col-span-3 col-span-12">
            <CollectionFilter filter={filter} setFilter={setFilter} />
          </div>
        )}
        <div className={cn({ "lg:col-span-9 col-span-12": showFilter, "col-span-12": !showFilter })}>
          <div
            className={cn(
              "grid gap-2 justify-items-center lg:gap-8 grid-cols-1 sm:grid-cols-2",
              `${showFilter ? "md:grid-cols-3 lg:grid-cols-4" : "md:grid-cols-4 lg:grid-cols-5"}`
            )}
          >
            {nfts &&
              nfts.map((nft) => (
                <NFTCard key={nft.id} nft={nft} clickUrl={`/app/collection/${nft.id}`} />
              ))}
          </div>
        </div>
      </section>
    )
  return (
    <section className="flex flex-col gap-4">
      <section className="flex flex-col items-center gap-4">
        <h3 className="text-center text-xl">Your collection is empty. Start Collecting!</h3>
        <Link href={`/app/drops/${process.env.NEXT_PUBLIC_DROP_ID}`}>
          <button className="uppercase w-fit font-dosis font-bold text-base p-2 px-5 text-white transition-colors bg-header hover:bg-purple">
            Go to Drops
          </button>
        </Link>
      </section>
    </section>
  )
}
