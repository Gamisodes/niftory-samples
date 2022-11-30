import { ChakraProvider } from "@chakra-ui/react"
import { AppProps as NextAppProps } from "next/app"
import { SessionProvider } from "next-auth/react"
import { WalletProvider } from "../components/wallet/WalletProvider"
import { ComponentWithWallet } from "../lib/types"
import "../styles/global.css"

import theme from "../lib/chakra-theme"
import { GraphQLClientProvider } from "../lib/GraphQLClientProvider"
import { Session } from "next-auth"
import AuthGuard from "src/guard/AuthGuard"

type AppProps<P = { session: Session }> = NextAppProps<P> & {
  Component: ComponentWithWallet
}

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps): JSX.Element => {
  return (
    <SessionProvider session={session}>
      <WalletProvider requireWallet={Component.requireWallet}>
        <GraphQLClientProvider>
          <ChakraProvider theme={theme}>
            {Component.requireAuth ? (
              <AuthGuard>
                <Component {...pageProps} />
              </AuthGuard>
            ) : (
              <Component {...pageProps} />
            )}
          </ChakraProvider>
        </GraphQLClientProvider>
      </WalletProvider>
    </SessionProvider>
  )
}

export default App
