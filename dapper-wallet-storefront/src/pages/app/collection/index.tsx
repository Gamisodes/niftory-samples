import { Box } from "@chakra-ui/react"

import { Nft, useNftsByWalletQuery } from "../../../../generated/graphql"
import AppLayout from "../../../components/AppLayout"
import { CollectionGrid } from "../../../components/collection/CollectionGrid"
import { useWalletContext } from "../../../hooks/useWalletContext"
import { Subset } from "../../../lib/types"
import { SectionHeader } from "../../../ui/SectionHeader"

const CollectionPage = () => {
  const { currentUser } = useWalletContext()
  const [nftsByWalletResponse] = useNftsByWalletQuery({
    variables: { address: currentUser?.addr },
    pause: !currentUser?.addr,
    requestPolicy: "cache-and-network",
  })

  const nfts: Subset<Nft>[] = nftsByWalletResponse?.data?.nftsByWallet?.items

  return (
    <AppLayout>
      <Box maxW="7xl" mx="auto">
        <SectionHeader text="My Collection" />
        <CollectionGrid nfts={nfts} isLoading={nftsByWalletResponse.fetching} />
      </Box>
    </AppLayout>
  )
}

CollectionPage.requireWallet = true
export default CollectionPage
