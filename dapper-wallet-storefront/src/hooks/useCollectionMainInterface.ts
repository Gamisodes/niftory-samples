import { NftsByWalletQuery, Exact, NftBlockchainState } from "generated/graphql"
import { useMemo } from "react"
import { UseQueryState } from "urql"

export function useCollectionMainInterface (gamisodesCollections, nftsByWalletResponse: UseQueryState<
  NftsByWalletQuery,
  Exact<{
    address?: string
  }>
>) {

  const brainTrainCollection = useMemo(() => {
    const nftsList = nftsByWalletResponse?.data?.nftsByWallet?.items
      .filter((nft) =>
        [NftBlockchainState.Transferred, NftBlockchainState.Transferring].includes(
          nft.blockchainState
        )
      )
      .map((nft) => {
        return {
          ...nft,
          imageUrl: nft.model.content.poster.url,
          title: nft.model.title,
          rarity: nft.model.rarity,
          filters: nft.model.metadata.traits?.reduce((accum, trait) => {
            return {
              ...accum,
              [trait.trait_type]: trait.value,
              ["Costume Type"]: nft?.model?.attributes?.costumeType,
            }
          }, {}),
          // model: {
          //   ...nft.model,
          //   metadata: {
          //     ...nft.model.metadata,
          //     traits: nft.model.metadata.traits?.reduce((accum, trait) => {
          //       return {
          //         ...accum,
          //         [trait.trait_type]: trait.value,
          //         ["Costume Type"]: nft?.model?.attributes?.costumeType,
          //       }
          //     }, {}),
          //   },
          // },
        }
      })
    return nftsList
  }, [nftsByWalletResponse.fetching, nftsByWalletResponse.stale])

  // console.log(brainTrainCollection);

  const gamisodesCollectionsFiltered = useMemo(() => {
    const gadgetsCollection = []
    const missionsCollection = []
    const VIPCollection = []
  
    const collectionWithInterface = gamisodesCollections?.items.map((nft) => (
      {
        ...nft,
        imageUrl: nft.display.thumbnail.url,
        title: nft.display.name,
        filters: nft.traits.traits?.reduce((accum, trait) => {
          return {
            ...accum, [trait.name]: trait.value
          }
        }, {})
      }
    ))  
  
    collectionWithInterface?.forEach((nft) => {
      if (nft.filters.series === 'Gadgets') {
        gadgetsCollection.push(nft)
      } else if (nft.filters.series === 'Missions') {
        missionsCollection.push(nft)
      } else if (nft.filters.gamisodesName === 'Commemorative Card') {
        VIPCollection.push(nft)
      }
    })
    return {gadgetsCollection, missionsCollection, VIPCollection}
  }, [gamisodesCollections])

  // console.log(gamisodesCollectionsFiltered);
  
  return { brainTrainCollection, ...gamisodesCollectionsFiltered }
}