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
import { ReactQueryProvider } from "src/lib/ReactQueryClientProvider"
import theme from "../lib/chakra-theme"
import usePWA from "src/hooks/usePWA"
import Head from "next/head"

type AppProps<P = { session: Session; dehydratedState?: unknown }> = NextAppProps<P> & {
  Component: ComponentWithWallet
}
const title = "Gamisodes"
const description =
  "Don't just watch your favorite childhood cartoons 📺 Collect them, trade them, game them 🕹"

const MetaTags = () => {
  const origin =
    typeof window !== "undefined" && window.location.origin ? window.location.origin : ""

  return (
    <Head>
      {" "}
      <meta name="application-name" content={title} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={title} />
      <meta name="description" content={description} />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="msapplication-config" content="/icons/browserconfig.xml" />
      <meta name="msapplication-TileColor" content="#2B5797" />
      <meta name="msapplication-tap-highlight" content="no" />
      <meta name="theme-color" content="#000000" />
      <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
      <link rel="apple-touch-icon" sizes="152x152" href="/icons/touch-icon-ipad.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
      <link rel="apple-touch-icon" sizes="167x167" href="/icons/touch-icon-ipad-retina.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:url" content={origin} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${origin}/icons/android-chrome-192x192.png`} />
      <meta name="twitter:creator" content="@PlayGamisodes" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={title} />
      <meta property="og:url" content={origin} />
      <meta property="og:image" content={`${origin}/icons/apple-touch-icon.png`} />
    </Head>
  )
}

const App = ({
  Component,
  pageProps: { session, dehydratedState, ...pageProps },
}: AppProps): JSX.Element => {
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
    <>
      <MetaTags />
      <RouterHistory>
        <SessionProvider session={session}>
          <ChakraProvider theme={theme}>
            <ReactQueryProvider state={dehydratedState}>
              <WalletProvider requireWallet={Component.requireWallet}>
                {isWalletAndAuth || isWallet || isAuth || <Component {...pageProps} />}
              </WalletProvider>
            </ReactQueryProvider>
          </ChakraProvider>
        </SessionProvider>
        <GoogleAnalytics trackPageViews />
      </RouterHistory>
    </>
  )
}

export default App
