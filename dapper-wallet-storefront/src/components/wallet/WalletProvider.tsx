import { useToast } from "@chakra-ui/react"
import * as fcl from "@onflow/fcl"
import { useSession } from "next-auth/react"
import { createContext, useCallback, useEffect, useState } from "react"
import { fclCookieStorage } from "../../lib/cookieUtils"

type WalletComponentProps = {
  children: React.ReactNode
  requireWallet: boolean | undefined
}

type WalletContextType = {
  currentUser: fcl.CurrentUserObject
  isLoading: boolean
  signIn: () => Promise<void>
  signOut: () => Promise<void>
}

export const WalletContext = createContext<WalletContextType>(null)

export function WalletProvider({ children, requireWallet }: WalletComponentProps) {
  const { data: user } = useSession()
  const toast = useToast()

  const [currentUser, setCurrentUser] = useState<fcl.CurrentUserObject>(null)
  const [isLoading, setIsLoading] = useState(false)

  const signIn = useCallback(async () => {
    setIsLoading(true)
    fcl.logIn()
    setIsLoading(false)
  }, [])

  const signOut = useCallback(async () => {
    setIsLoading(true)
    fcl.unauthenticate()
    setIsLoading(false)
  }, [])
  useEffect(() => {
    fcl
      .config({
        "app.detail.title": "niftory",
        "app.detail.icon": "/public/niftory_icon",
      })
      .put("accessNode.api", process.env.NEXT_PUBLIC_FLOW_ACCESS_API) // connect to Flow
      .put("discovery.wallet", process.env.NEXT_PUBLIC_WALLET_API)
      .put("fcl.storage", fclCookieStorage)

      // use pop instead of default IFRAME/RPC option for security enforcement
      .put("discovery.wallet.method", "POP/RPC")
    fcl.currentUser.subscribe((walletUser) => {
      console.log("subscribe:wallet", walletUser, user)
      if (
        (user?.user?.walletAddress &&
          walletUser?.addr &&
          user?.user?.walletAddress !== walletUser?.addr) ||
        (user?.user?.walletAddress === null && walletUser?.addr)
      ) {
        toast({
          title: "Wallet Sign-In Error",
          description:
            "Probably, this wallet already connected to another account. Please use another account or create new wallet",
          status: "error",
          duration: 4000,
          isClosable: true,
        })
        signOut()
        return
      }
      setCurrentUser(walletUser)
    })
  }, [user?.user?.email])

  // const router = useRouter()
  // useEffect(() => {
  //   if (!requireWallet || isLoading || !currentUser) {
  //     return
  //   }

  //   if (currentUser && !currentUser?.loggedIn) {
  //     router.push("/app/account")
  //     return
  //   }
  // }, [requireWallet, isLoading, currentUser, router])

  return (
    <WalletContext.Provider value={{ currentUser, isLoading, signIn, signOut }}>
      {children}
    </WalletContext.Provider>
  )
}
