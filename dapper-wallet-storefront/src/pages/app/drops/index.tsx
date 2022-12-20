import { Box } from "@chakra-ui/react"
import { useMemo } from "react"

import { useNftModelsQuery } from "../../../../generated/graphql"
import AppLayout from "../../../components/AppLayout"
import { NFTModelsGrid } from "../../../components/drops/NFTModelsGrid"
import { SectionHeader } from "../../../ui/SectionHeader"

export const NFTModelsPage = () => {
  const [result] = useNftModelsQuery({
    variables: { appId: process.env.NEXT_PUBLIC_CLIENT_ID },
  })

  const nftModels = useMemo(() => {
    return result?.data?.nftModels?.items?.filter((val) => val) ?? []
  }, [result?.data?.nftModels?.items, result.fetching])
  return (
    <AppLayout>
      <Box maxW="7xl" mx="auto">
        <SectionHeader text="Get A Drop: TBD" />
        {/* {nftModels && <NFTModelsGrid nftModels={nftModels} />} */}
      </Box>
    </AppLayout>
  )
}

export default NFTModelsPage
