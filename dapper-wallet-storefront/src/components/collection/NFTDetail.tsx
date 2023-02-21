import { convertNumber } from "consts/helpers"
import { useMemo } from "react"
import { DEFAULT_NFT_PRICE } from "src/lib/const"
import { ESetAttribute } from "src/typings/SetAttribute"
import { Nft } from "../../../generated/graphql"
import { Subset } from "../../lib/types"
import { Gallery } from "../../ui/Content/Gallery/Gallery"

interface Props {
  nft: Subset<Nft>
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
  const { nft } = props

  const nftModel = nft?.model
  const poster = nftModel?.content?.poster?.url

  const product = useMemo(
    () => ({
      title: nftModel?.title,
      description: nftModel?.description || "",
      price: convertNumber(+nftModel?.attributes?.price, DEFAULT_NFT_PRICE),
      editionSize: ((nftModel?.metadata?.editionSize as string) ??
        (nftModel?.attributes?.editionSize as string) ??
        null) as string | null,
      content: nftModel?.content?.files?.map((file) => ({
        contentType: file.contentType || "image",
        contentUrl: file.url,
        thumbnailUrl: poster,
        alt: nftModel?.title,
      })),
      attributes: { ...nftModel?.metadata, ...nftModel?.attributes },
    }),
    [nftModel?.id]
  )

  const traits: ITraits | undefined = useMemo(() => {
    const setAttributes = nftModel?.set?.attributes ?? {}
    if (setAttributes?.type === ESetAttribute.TICKET)
      return (
        product.attributes?.traits?.reduce((acc, { trait_type, value }) => {
          return { ...acc, [trait_type]: value }
        }, {} as ITraits) ?? undefined
      )
    return undefined
  }, [nftModel?.id])

  return (
    <section className="h-auto sm:h-full py-4 lg:py-24">
      <div className="flex h-auto sm:h-full flex-col lg:flex-row gap-6 lg:gap-12 xl:gap-16">
        <div className="flex justify-center sm:min-w-[384px] lg:max-w-sm space-x-6 lg:space-x-8 p-8 rounded bg-white text-black font-dosis">
          <div className="space-y-3 md:space-y-6 font-normal text-xl">
            <div className="space-y-3">
              <h3 className="text-5xl font-bold">{product.title}</h3>
            </div>

            <p>{product.description}</p>

            <div className="pt-6">
              <div className="flex w-fit font-dosis font-normal text-xl text-center bg-header text-white py-1 px-6">
                <p>
                  <span className="font-bold">Edition: </span>
                  {product?.editionSize && product?.editionSize === "Open"
                    ? `Open Edition`
                    : `${nft?.serialNumber ?? "~"} / ${nftModel?.quantity}`}
                </p>
              </div>
            </div>
            {traits && <TraitsBlock traits={traits} />}
          </div>
        </div>

        {product.content?.length > 0 && <Gallery content={product.content} />}
      </div>
    </section>
  )
}
