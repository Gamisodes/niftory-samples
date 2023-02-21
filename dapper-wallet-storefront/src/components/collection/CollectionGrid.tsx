import cn from "classnames"
import Link from "next/link"
import { Loading } from "src/icon/Loading"

import { useCallback, useState } from "react"
import { ECollectionNames } from "src/const/enum"
import { useCollectionFilter } from "src/hooks/useCollectionFilter"
import { useNftsStore } from "src/store/nfts"
import shallow from "zustand/shallow"
import { CollectionFilter } from "../filter/CollectionFilter"
import { HorizontalFilter } from "../filter/HorizontalFilter"
import { NFTCard } from "./NFTCard"

const selector = ({ allCollections, counter, isLoading }) => ({
  allCollections,
  counter,
  isLoading,
})

export const CollectionGrid = () => {
  const { allCollections, counter, isLoading } = useNftsStore(selector, shallow)
  const [selectedCollection, setCollection] = useState(ECollectionNames.BrainTrain)
  const [showFilter, setShowFilter] = useState(true)
  const { nfts, filter, setFilter } = useCollectionFilter(allCollections, selectedCollection)
  
  const counterKey = useCallback(
    (nft) => {
      if (selectedCollection === ECollectionNames.BrainTrain) return null
      const key = JSON.stringify({
        title: nft?.title,
        ...(selectedCollection === ECollectionNames.Gadgets && { level: nft?.filters?.level }),
      })

      return counter[selectedCollection][key]
    },
    [selectedCollection]
  )

  if (isLoading) {
    return (
      <section>
        <Loading />
      </section>
    )
  }

  if (selectedCollection)
    return (
      <section className="grid grid-cols-12 gap-8 w-max">
        <div className="col-span-12">
          <HorizontalFilter
            setShowFilter={setShowFilter}
            showFilter={showFilter}
            selectedCollection={selectedCollection}
            setCollection={setCollection}
          />
        </div>
        {showFilter && (
          <div className="lg:col-span-3 col-span-12">
            <CollectionFilter filter={filter} setFilter={setFilter} />
          </div>
        )}
        <div
          className={cn({ "lg:col-span-9 col-span-12": showFilter, "col-span-12": !showFilter })}
        >
          <div
            className={cn(
              "lg:min-w-[725px] grid gap-2 justify-items-center lg:gap-8 grid-cols-1 sm:grid-cols-2",
              `${showFilter ? "md:grid-cols-3 lg:grid-cols-4" : "md:grid-cols-4 lg:grid-cols-5"}`
            )}
          >
            {!!nfts?.length ? (
              nfts.map((nft) => (
                <NFTCard
                  key={nft.id}
                  nft={nft}
                  clickUrl={`/app/collection/${selectedCollection}/${nft.id}`}
                  counter={counterKey(nft)}
                />
              ))
            ) : (
              <div className="col-span-full text-2xl">There Are No Collectibles to Show</div>
            )}
          </div>
        </div>
      </section>
    )
  return (
    <section className="flex flex-col gap-4">
      <section className="flex flex-col items-center gap-4">
        <h3 className="text-center text-xl">Your collection is empty. Start Collecting!</h3>
        <Link
          href={
            process.env.NODE_ENV === "development"
              ? `/app/drops/${process.env.NEXT_PUBLIC_DROP_ID}`
              : `https://gamisodes.com/pages/collections`
          }
        >
          <button className="uppercase w-fit font-dosis font-bold text-base p-2 px-5 text-white transition-colors bg-header hover:bg-purple">
            Go to Drops
          </button>
        </Link>
      </section>
    </section>
  )
}
