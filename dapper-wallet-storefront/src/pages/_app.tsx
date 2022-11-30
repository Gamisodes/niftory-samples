import { ChakraProvider } from "@chakra-ui/react"
import { AppProps as NextAppProps } from "next/app"
import { WalletProvider } from "../components/wallet/WalletProvider"
import { ComponentWithWallet } from "../lib/types"
import "../styles/global.css"

import theme from "../lib/chakra-theme"
import { GraphQLClientProvider } from "../lib/GraphQLClientProvider"

type AppProps<P = {}> = NextAppProps<P> & {
  Component: ComponentWithWallet
}

const App = ({ Component, pageProps: { ...pageProps } }: AppProps): JSX.Element => {
  return (
    <WalletProvider requireWallet={Component.requireWallet}>
      <GraphQLClientProvider>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </GraphQLClientProvider>
    </WalletProvider>
  )
}

export default App
