import { ChakraProvider } from "@chakra-ui/react"
import { Hydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { SessionProvider } from "next-auth/react"
import { AppProps as NextAppProps } from "next/app"
import { WalletProvider } from "../components/wallet/WalletProvider"
import { ComponentWithWallet } from "../lib/types"
import "../styles/global.css"

import { Session } from "next-auth"
import { GoogleAnalytics } from "nextjs-google-analytics"
import { PropsWithChildren, useState } from "react"
import RouterHistory from "src/components/RouterHistory"
import AuthGuard from "src/guard/AuthGuard"
import WalletGuard from "src/guard/WalletGuard"
import theme from "../lib/chakra-theme"
import { GraphQLClientProvider } from "../lib/GraphQLClientProvider"

type AppProps<P = { session: Session; dehydratedState?: unknown }> = NextAppProps<P> & {
  Component: ComponentWithWallet
}

const ReactQueryProvider = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(() => new QueryClient())

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

const App = ({
  Component,
  pageProps: { session, dehydratedState, ...pageProps },
}: AppProps): JSX.Element => {
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
          <ReactQueryProvider>
            <Hydrate state={dehydratedState}>
              <WalletProvider requireWallet={Component.requireWallet}>
                <GraphQLClientProvider {...pageProps}>
                  {isWalletAndAuth || isWallet || isAuth || <Component {...pageProps} />}
                </GraphQLClientProvider>
              </WalletProvider>
            </Hydrate>
          </ReactQueryProvider>
        </ChakraProvider>
      </SessionProvider>
      <GoogleAnalytics trackPageViews />
    </RouterHistory>
  )
}

export default App
