import { useRouter } from "next/router"

import BrainTrain from "src/components/collection/NFTCollection/Braintrain"
import GamisodesCollection from "src/components/collection/NFTCollection/GamisodesCollection"
import { ECollectionNames } from "src/const/enum"

export const NFTDetailPage = () => {
  const router = useRouter()

  const selectedCollection: string = router.query["collection"]?.toString()

  if (selectedCollection === ECollectionNames.BrainTrain) return <BrainTrain />
  return <GamisodesCollection />
}

export default NFTDetailPage
