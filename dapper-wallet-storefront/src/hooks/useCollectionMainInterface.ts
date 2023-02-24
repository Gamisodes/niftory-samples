import { UseQueryResult } from "@tanstack/react-query"
import { NftBlockchainState, NftsByWalletQuery } from "generated/graphql"
import { useMemo } from "react"

export function useCollectionMainInterface(
  gamisodesCollections,
  nftsByWalletResponse: UseQueryResult<NftsByWalletQuery, unknown>
) {
  const brainTrainCollection = useMemo(() => {
    const items = nftsByWalletResponse?.data?.nftsByWallet?.items ?? []
    const nftsList = items
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
          description: nft.model.description,
          quantity: nft.model.quantity,
          filters: nft.model.metadata.traits?.reduce((accum, trait) => {
            return {
              ...accum,
              [trait.trait_type]: trait.value,
              ["Costume Type"]: nft?.model?.attributes?.costumeType,
            }
          }, {}),
        }
      })
    return nftsList
  }, [nftsByWalletResponse.fetching, nftsByWalletResponse.stale])
  
  const gamisodesCollectionsFiltered = useMemo(() => {
    const gadgetsCollectionUnseries = []
    const missionsCollectionUnseries = []
    const VIPCollectionUnseries = []

    const counter = {
      gadgetsCollection: {},
      missionsCollection: {},
      VIPCollection: {},
    }
    const items = gamisodesCollections?.items ?? []
    const collectionWithInterface = items.map((nft) => ({
      ...nft,
      imageUrl: nft.display.thumbnail.url,
      title: nft.display.name,
      description: nft.display.description,
      model: {
        title: nft.display.name,
        description: nft.display.description,
        quantity: nft.editions.infoList[0].max,
        imageUrl: nft.display.thumbnail.url,
        content: {
          poster: {
            url: nft.display.thumbnail.url,
          },
          files: [
            {
              url: nft.display.thumbnail.url,
              contentType: "image",
            },
          ],
        },
      },
      serialNumber: nft.editions.infoList[0].number,
      quantity: nft.editions.infoList[0].max,
      filters: nft.traits.traits?.reduce((accum, trait) => {
        return { ...accum, [trait.name]: trait.value, name: nft.display.name }
      }, {}),
    }))
    
    collectionWithInterface?.forEach((nft) => {
      if (nft.filters.series === "Gadgets") {
        gadgetsCollectionUnseries.push(nft)
      } else if (nft.filters.series === "Missions") {
        missionsCollectionUnseries.push(nft)
      } else if (nft.filters.gamisodesName === "Commemorative Card") {
        VIPCollectionUnseries.push(nft)
      }
    })

    const gadgetsCollection = gadgetsCollectionUnseries.filter((nft) => {
      const val = JSON.stringify({
        title: nft.title,
        level: nft.filters.level,
      })

      if (val in counter.gadgetsCollection) {
        counter.gadgetsCollection[val] += 1
        return false
      }

      counter.gadgetsCollection[val] = 1
      return true
    })

    const missionsCollection = missionsCollectionUnseries.filter((nft) => {
      const val = JSON.stringify({
        title: nft.title,
      })

      if (val in counter.missionsCollection) {
        counter.missionsCollection[val] += 1
        return false
      }

      counter.missionsCollection[val] = 1
      return true
    })

    const VIPCollection = VIPCollectionUnseries.filter((nft) => {
      const val = JSON.stringify({
        title: nft.title,
      })

      if (val in counter.VIPCollection) {
        counter.VIPCollection[val] += 1
        return false
      }

      counter.VIPCollection[val] = 1
      return true
    })

    return {
      collections: { gadgetsCollection, missionsCollection, VIPCollection },
      counter,
      gamisodesAmount: collectionWithInterface.length,
    }
  }, [gamisodesCollections])

  return {
    allCollections: {
      brainTrainCollection,
      ...gamisodesCollectionsFiltered.collections,
    },
    brainTrainAmount: brainTrainCollection.length,
    gamisodesAmount: gamisodesCollectionsFiltered.gamisodesAmount,
    counter: gamisodesCollectionsFiltered.counter,
  }
}
