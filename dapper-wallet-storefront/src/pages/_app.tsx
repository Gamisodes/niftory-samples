import { ChakraProvider } from "@chakra-ui/react"
import { SessionProvider } from "next-auth/react"
import { AppProps as NextAppProps } from "next/app"
import { WalletProvider } from "../components/wallet/WalletProvider"
import { ComponentWithWallet } from "../lib/types"
import "../styles/global.css"

import { Session } from "next-auth"
import { GoogleAnalytics } from "nextjs-google-analytics"
import RouterHistory from "src/components/RouterHistory"
import AuthGuard from "src/guard/AuthGuard"
import WalletGuard from "src/guard/WalletGuard"
import usePWA from "src/hooks/usePWA"
import { ReactQueryProvider } from "src/lib/ReactQueryClientProvider"
import theme from "../lib/chakra-theme"
import { BlockchainAndNiftoryWrapper } from "src/components/BlockchainAndNiftoryWrapper"
import { useScrollRestoration } from "src/hooks/useScrollRestoration"

type AppProps<P = { session: Session; dehydratedState?: unknown }> = NextAppProps<P> & {
  Component: ComponentWithWallet
}

const App = ({
  Component,
  pageProps: { session, dehydratedState, ...pageProps },
}: AppProps): JSX.Element => {
  useScrollRestoration()
  usePWA()
  const isWalletAndAuth =
    (Component.requireAuth && Component.requireWallet && (
      <AuthGuard>
        <WalletGuard>
          <Component {...pageProps} />
        </WalletGuard>
      </AuthGuard>
    )) ||
    null
  const isWallet =
    (Component.requireWallet && (
      <WalletGuard>
        <Component {...pageProps} />
      </WalletGuard>
    )) ||
    null
  const isAuth =
    (Component.requireAuth && (
      <AuthGuard>
        <Component {...pageProps} />
      </AuthGuard>
    )) ||
    null
  return (
    <RouterHistory>
      <SessionProvider session={session}>
        <ChakraProvider theme={theme}>
          <ReactQueryProvider state={dehydratedState}>
            <WalletProvider requireWallet={Component.requireWallet}>
              <BlockchainAndNiftoryWrapper>
                {isWalletAndAuth || isWallet || isAuth || <Component {...pageProps} />}
              </BlockchainAndNiftoryWrapper>
            </WalletProvider>
          </ReactQueryProvider>
        </ChakraProvider>
      </SessionProvider>
      <GoogleAnalytics trackPageViews />
    </RouterHistory>
  )
}

export default App
