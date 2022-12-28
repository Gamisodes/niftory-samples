import { Nft } from "../../../generated/graphql"
import { Subset } from "../../lib/types"
import { Gallery } from "../../ui/Content/Gallery/Gallery"

interface Props {
  nft: Subset<Nft>
}

export const NFTDetail = (props: Props) => {
  const { nft } = props

  const nftModel = nft?.model
  const poster = nftModel?.content?.poster?.url

  const product = {
    title: nftModel?.title,
    description: nftModel?.description || "",
    content: nftModel?.content?.files?.map((file) => ({
      contentType: file.contentType || "image",
      contentUrl: file.url,
      thumbnailUrl: poster,
      alt: nftModel?.title,
    })),
  }
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
                  <span className="font-bold">Serial: </span>
                  {nft && nft.serialNumber} / {nftModel.quantity}
                </p>
              </div>
            </div>
          </div>
        </div>

        {product.content?.length > 0 && <Gallery content={product.content} />}
      </div>
    </section>
  )
}
