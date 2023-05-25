import { InfiniteData } from "@tanstack/react-query"
import { NftBlockchainState, NftsByWalletQuery } from "generated/graphql"
import { useMemo, useEffect } from "react"
import { Convertor } from "src/lib/Nfts/convertor"
import { ENftCollection, IBrainTrainNft, IGadgetNft, IMissionsNft, INft, IVipNft } from "src/typings/INfts"
import { enumToDefaultObject } from "src/utils/enumToDefaultObject"
import { INftStore, useNftsStore } from "src/store/nfts"
import shallow from "zustand/shallow"

const setNftState = (state: INftStore) => state.setNfts
interface IAllCollection {
  collections: {
    gadgets?: IGadgetNft[];
    vip?: IVipNft[];
    missions?: IMissionsNft[];
    braintrain?: IBrainTrainNft[];
    gamisodes?: INft[];
  },
  counter: Partial<{
    [key in ENftCollection]: {
      [key: string]: {
        counter: number, 
        editions: number[]
      }
    }
  }>
}

export function useCollectionMainInterface(
  gamisodesCollections,
  niftoryCollection: InfiniteData<NftsByWalletQuery>,
  isSuccessFetchNiftory
) {
  //Zustand setState
  const setNfts = useNftsStore(setNftState, shallow)

  const allCollectionsNew: IAllCollection = useMemo(() => {
    //Get data from Niftory
    const niftoryNft = (niftoryCollection?.pages ?? [])
      //Union NFTs from all pages
      .reduce((accum, item) => {
        return [...accum, ...item.nftsByWallet.items]
      }, [])
      //Filter only transfered
      .filter((nft) =>
        [NftBlockchainState.Transferred, NftBlockchainState.Transferring].includes(
          nft.blockchainState
        )
      )
      //Convert each NFT to main type
      .map(Convertor.Niftory)
    //Get data from Blockchain
    const blockchainNft = (gamisodesCollections?.items ?? [])
    //Convert each NFT to main type
    .map(Convertor.Blockchain)
    //Union NFTs to one array   
    const allConvertedNfts = [...niftoryNft, ...blockchainNft]
    //Default object for next reducer
    const defaultSortedCollectionValue = enumToDefaultObject<Partial<{[key in ENftCollection]: any}>>(ENftCollection, [] as INft[])
    //Sort NFTs by collection
    const sortedCollections = allConvertedNfts.reduce(
      (accum, nft) => ({ ...accum, [nft.collection]: [...(accum[nft.collection] ?? []), nft] }),
      defaultSortedCollectionValue
    )
    //Create counter for similar NFTs
    const defaultCounterKeys = Object.values(ENftCollection).reduce((accum, item: string) => ({ ...accum, [item]: {} }), {})
    const counter = {...defaultCounterKeys}    
    //Create object with collections of NFTs. Each similar NFT has been union 
    const collections = {...defaultSortedCollectionValue}
    
    //Fill the object by filtering NFTs by collection key and similar title key
    Object.keys(sortedCollections).forEach((collection) => {
      collections[collection] = sortedCollections[collection]
        .filter((nft) => {
          const val = JSON.stringify({
            title: nft.title,
            //for gadgets collection also need to check level key
            // ...(collection === ENftCollection.GADGETS && { level: nft.level }),
          })
          if (collection === ENftCollection.BRAIN_TRAIN && nft.editionSize === 1) {
            counter[collection][val] = { counter: 1, editions: [nft.edition] }
            return true
          }

          if (val in counter[collection]) {
            //count sum of similar NFT editions
            counter[collection][val].counter += 1
            //Combine ID`s of NFTs in one array to display on NFT personal page
            counter[collection][val].editions.push(nft.edition)
            return false
          }

          counter[collection][val] = { counter: 1, editions: [nft.edition] }
          return true
        })
        //sort each collection NFTs by alphabet 
        .sort((a, b) => {
          if (collection === ENftCollection.GADGETS)
            return a.title + a.level > b.title + b.level ? 1 : -1
          else return a.title > b.title ? 1 : -1
        })
    })

    return { collections, counter }
  }, [niftoryCollection, gamisodesCollections, isSuccessFetchNiftory])

  //Send data to Zustand state
  useEffect(() => {
    const { collections, counter } = allCollectionsNew
    setNfts({
      allCollections: collections,
      counter,
    })
  }, [niftoryCollection?.pages, isSuccessFetchNiftory, gamisodesCollections])
}
