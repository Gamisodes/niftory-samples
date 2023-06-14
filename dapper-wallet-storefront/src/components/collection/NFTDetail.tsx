import { useRouter } from "next/router"
import { useCallback, useMemo } from "react"
import { INft } from "src/typings/INfts"
import { useCollectionStore } from "src/store/collection"
import shallow from "zustand/shallow"
import { Gallery } from "src/ui/Content/Gallery/Gallery"
import cn from "classnames"

interface Props {
  nft: INft
  nftEditions: { counter: number; editions: number[] }
}

export interface ITraits {
  costumeType: string
  "Background Color": string
  "Background Pattern": string
  Outfit: string
  Coms: string
  Eyes: string
  "Head Piece": string
  Mouth: string
}

interface ITraitsProps {
  traits: ITraits
}

const setSelectedCollection = (state) => state.setCollection

const TraitsBlock = ({ traits }: ITraitsProps) => {
  return (
    <div className="pt-2 text-lg">
      {Object.entries(traits).map(([key, val]) => {
        if (key === "costumeType") return
        return (
          <p key={val}>
            <span className="text-xl font-bold">{key}</span> : <span>{val}</span>
          </p>
        )
      })}
      {traits["costumeType"] && (
        <p>
          <span className="text-xl font-bold">Costume Type</span> :{" "}
          <span>{traits.costumeType}</span>
        </p>
      )}
      {/* {traits["costumeType"] && (
        <p>
          <span className="text-xl font-bold">Costume Type</span> :{" "}
          <span>{traits.costumeType}</span>
        </p>
      )}
      {traits["Head Piece"] && (
        <p>
          <span className="text-xl font-bold">Head Piece</span> :{" "}
          <span>{traits["Head Piece"]}</span>
        </p>
      )}
      {traits["Eyes"] && (
        <p>
          <span className="text-xl font-bold">Eyes</span> : <span>{traits["Eyes"]}</span>
        </p>
      )}
      {traits["Mouth"] && (
        <p>
          <span className="text-xl font-bold">Mouth</span> : <span>{traits["Mouth"]}</span>
        </p>
      )}
      {traits["Coms"] && (
        <p>
          <span className="text-xl font-bold">Coms</span> : <span>{traits["Coms"]}</span>
        </p>
      )}
      {traits["Outfit"] && (
        <p>
          <span className="text-xl font-bold">Outfit</span> : <span>{traits["Outfit"]}</span>
        </p>
      )}
      {traits["Background Color"] && (
        <p>
          <span className="text-xl font-bold">Background Color</span> :{" "}
          <span>{traits["Background Color"]}</span>
        </p>
      )}
      {traits["Background Pattern"] && (
        <p>
          <span className="text-xl font-bold">Background Pattern</span> :{" "}
          <span>{traits["Background Pattern"]}</span>
        </p>
      )} */}
    </div>
  )
}

export const NFTDetail = (props: Props) => {
  const setCollection = useCollectionStore(setSelectedCollection, shallow)
  const { nft, nftEditions } = props
  const router = useRouter()
  const poster = nft?.imageUrl?.mediaURL
  const newNftEdition: string = router.query["edition"]?.toString()
  const selectedCollection: string = router.query["collection"]?.toString()

  const handleBtn = useCallback(() => {
    if (window.history.length > 1) {
      router.back()
    } else {
      setCollection(selectedCollection)
      router.push(`/collection/${selectedCollection}`)
    }
  }, [])

  const product = useMemo(
    () => ({
      content: {
        contentType: nft.imageUrl.contentType,
        contentUrl: nft?.imageUrl?.mediaURL,
        thumbnailUrl: poster,
        alt: nft?.title,
      },
    }),
    [nft]
  )

  // const traits: ITraits | undefined = useMemo(() => {
  //   const setAttributes = nftModel?.set?.attributes ?? {}
  //   if (setAttributes?.type === ESetAttribute.TICKET)
  //     return (
  //       product.attributes?.traits?.reduce((acc, { trait_type, value }) => {
  //         return { ...acc, [trait_type]: value }
  //       }, {} as ITraits) ?? undefined
  //     )
  //   return undefined
  // }, [nft?.id])

  const renderEditions = useMemo(
    () =>
      nftEditions?.editions
        .sort((a, b) => a - b)
        .map((edition, idx) => (
          <div
            key={idx}
            className={cn(
              "w-fit font-dosis font-normal text-xl text-center bg-header text-white py-1 px-3",
              `${edition === +newNftEdition && "bg-amber-400"}`
            )}
          >
            {edition !== 0 ? edition : "Transfer Initiated"}
          </div>
        )),
    [nftEditions?.editions]
  )

  const renderEdition = useMemo(() => {
    if (nftEditions?.counter > 1) {
      return (
        <>
          {nft?.isOpenEdition
            ? `${nftEditions.counter} Editions / Open`
            : `${nftEditions.counter} Editions / ${nft?.editionSize}`}
        </>
      )
    } else
      return (
        <>
          {nft?.isOpenEdition
            ? `Edition: ${nft?.edition ?? "~"} / Open`
            : `Edition: ${nft?.edition ?? "~"} / ${nft?.editionSize}`}
        </>
      )
  }, [nftEditions])

  return (
    <section className="h-auto sm:h-full py-4 lg:py-24">
      <div className="flex flex-col gap-y-4 sm:h-full h-auto">
        <div className="space-x-12 w-full ">
          <div
            onClick={handleBtn}
            className="w-fit px-5 py-2 font-bold text-base font-dosis bg-header hover:bg-pink-900 rounded cursor-pointer"
          >
            Go Go Back
          </div>
        </div>
        <div className="flex h-auto sm:h-full flex-col lg:flex-row gap-6 lg:gap-12 xl:gap-16">
          <div className="flex justify-center sm:min-w-[384px] lg:max-w-sm space-x-6 lg:space-x-8 p-8 rounded bg-white text-black font-dosis">
            <div className="space-y-3 md:space-y-6 font-normal text-xl">
              <div className="space-y-3">
                <h3 className="text-5xl font-bold">{nft?.title}</h3>
              </div>
              <p>{nft?.description}</p>
              <div className="pt-6">
                <div className="flex w-fit font-dosis font-normal text-xl text-center bg-header text-white py-1 px-6">
                  {renderEdition}
                </div>
                <div className="flex flex-wrap gap-3 py-3">
                  {nftEditions?.counter > 1 && renderEditions}
                </div>
              </div>
              {/* {traits && <TraitsBlock traits={traits} />} */}
            </div>
          </div>
          <Gallery content={product.content} />
        </div>
      </div>
    </section>
  )
}
