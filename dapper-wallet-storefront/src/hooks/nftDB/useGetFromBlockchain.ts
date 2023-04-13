import { useWalletContext } from "../useWalletContext";
import { useGetBlockchainNFT } from "src/services/blockchain/hooks"

export function useGetFromBlockchain() {
  const { currentUser } = useWalletContext()
  const query = useGetBlockchainNFT(
    {
      wallet: currentUser?.addr,
    },
    { 
      enabled: !!currentUser?.addr, 
      networkMode: "offlineFirst",
      refetchInterval: 1000 * 60 * 10, // every 10 minutes,
    }
  )
  return query
}