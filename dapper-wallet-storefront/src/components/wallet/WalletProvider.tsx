import { useToast } from "@chakra-ui/react"
import * as fcl from "@onflow/fcl"
import { useSession } from "next-auth/react"
import { createContext, useCallback, useEffect, useState } from "react"
import { useDidUpdate } from "rooks"
import gaAPI from "src/services/ga_events"
import { useCheckWalletOwnerQuery } from "src/services/wallet/hooks"
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
  const { mutate, data, isSuccess } = useCheckWalletOwnerQuery()

  const [currentUser, setCurrentUser] = useState<fcl.CurrentUserObject>(null)
  const [isLoading, setIsLoading] = useState(false)
  const signIn = useCallback(async () => {
    setIsLoading(true)
    await fcl.logIn()
    setIsLoading(false)
  }, [])

  const signOut = useCallback(async () => {
    setIsLoading(true)
    await fcl.unauthenticate()
    setIsLoading(false)
  }, [])

  const leaveSignOutWithMessage = useCallback(() => {
    toast({
      title: "Wallet Sign-In Error",
      description: `This Google Account ${
        user?.user?.email && `"${user.user.email}"`
      } is already connected to another Dapper Wallet. Please use another wallet or create a new wallet. If you believe you received this error by mistake, please contact support@gamisodes.com.`,
      status: "error",
      duration: 4000,
      isClosable: true,
    })
    signOut()
  }, [])

  useDidUpdate(() => {
    if (user?.user?.email) gaAPI.connect_google_account({ email: user.user.email })
  }, [user?.user?.email])

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
      .put("0xMetadataViews", process.env.NEXT_PUBLIC_METADATA_VIEWS_ADDRESS)
    fcl.currentUser.subscribe((walletUser) => {
      const walletFromUser = user?.user?.walletAddress
      const walletFromBlockchain = walletUser?.addr
      // console.info("subscribe: ", { walletFromBlockchain, walletFromUser }, walletUser)
      if (walletFromUser && walletFromBlockchain && walletFromUser !== walletFromBlockchain) {
        leaveSignOutWithMessage()
        return
      }
      //Till we receive from our backend information about current user - we skip setting user instance
      if (typeof walletFromUser !== "undefined") {
        setCurrentUser(walletUser)
        if (user?.user?.email && walletFromBlockchain)
          mutate({ ourEmail: user?.user?.email, loggedWithAddress: walletFromBlockchain })
      }
    })
  }, [user?.user?.email])

  //protector. If backend says that our wallet connected to another user - drop session
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.info("Protector Data: ", data);
    }
    if (isSuccess && data?.shouldLogout) leaveSignOutWithMessage()
  }, [isSuccess, data])

  return (
    <WalletContext.Provider value={{ currentUser, isLoading, signIn, signOut }}>
      {children}
    </WalletContext.Provider>
  )
}
