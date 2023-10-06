import { ChakraProvider } from "@chakra-ui/react"
import { AppProps as NextAppProps } from "next/app"
import { WalletProvider } from "../components/wallet/WalletProvider"
import { ComponentWithWallet } from "../lib/types"
import "../styles/global.css"

import { Session } from "next-auth"
import { GoogleAnalytics } from "nextjs-google-analytics"
import { BlockchainAndNiftoryWrapper } from "src/components/BlockchainAndNiftoryWrapper"
import RouterHistory from "src/components/RouterHistory"
import AuthSessionProvider from "src/components/auth/AuthSessionProvider"
import AuthGuard from "src/guard/AuthGuard"
import CustodialWalletGuard from "src/guard/CustodialWallet"
import WalletGuard from "src/guard/WalletGuard"
import usePWA from "src/hooks/usePWA"
import { useScrollRestoration } from "src/hooks/useScrollRestoration"
import { ReactQueryProvider } from "src/lib/ReactQueryClientProvider"
import theme from "../lib/chakra-theme"
type AppProps<P = { session: Session; dehydratedState?: unknown }> = NextAppProps<P> & {
  Component: ComponentWithWallet
}

const App = ({
  Component,
  pageProps: { session, dehydratedState, ...pageProps },
}: AppProps): JSX.Element => {
  useScrollRestoration()
  usePWA()
  return (
    <RouterHistory>
      <ReactQueryProvider state={dehydratedState}>
        <AuthSessionProvider>
          <ChakraProvider theme={theme}>
            <WalletProvider requireWallet={Component.requireWallet}>
              <BlockchainAndNiftoryWrapper>
                <AuthGuard isActive={Component.requireAuth}>
                  <WalletGuard isActive={Component.requireWallet}>
                    <CustodialWalletGuard isActive={Component.requiredCustodialWallet}>
                      <Component {...pageProps} />
                    </CustodialWalletGuard>
                  </WalletGuard>
                </AuthGuard>
              </BlockchainAndNiftoryWrapper>
            </WalletProvider>
          </ChakraProvider>
        </AuthSessionProvider>
      </ReactQueryProvider>
      <GoogleAnalytics trackPageViews />
    </RouterHistory>
  )
}

export default App
