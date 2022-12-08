import { ChakraProvider } from "@chakra-ui/react"
import { AppProps as NextAppProps } from "next/app"
import { SessionProvider } from "next-auth/react"
import { WalletProvider } from "../components/wallet/WalletProvider"
import { ComponentWithWallet } from "../lib/types"
import "../styles/global.css"
import { Hydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query"

import theme from "../lib/chakra-theme"
import { GraphQLClientProvider } from "../lib/GraphQLClientProvider"
import { Session } from "next-auth"
import AuthGuard from "src/guard/AuthGuard"
import WalletGuard from "src/guard/WalletGuard"
import { useState } from "react"

type AppProps<P = { session: Session; dehydratedState?: unknown }> = NextAppProps<P> & {
  Component: ComponentWithWallet
}

const App = ({
  Component,
  pageProps: { session, dehydratedState, ...pageProps },
}: AppProps): JSX.Element => {
  const [queryClient] = useState(() => new QueryClient())

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
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={dehydratedState}>
            <WalletProvider requireWallet={Component.requireWallet}>
              <GraphQLClientProvider>
                {isWalletAndAuth || isWallet || isAuth || <Component {...pageProps} />}
              </GraphQLClientProvider>
            </WalletProvider>
          </Hydrate>
        </QueryClientProvider>
      </ChakraProvider>
    </SessionProvider>
  )
}

export default App
