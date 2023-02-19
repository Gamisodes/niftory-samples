import { SSRData, SSRExchange } from "next-urql"
import { useMemo } from "react"
import {
  cacheExchange,
  Client,
  createClient,
  dedupExchange,
  fetchExchange,
  Provider,
  ssrExchange,
} from "urql"

let urqlClient: Client | null = null
let ssrCache: SSRExchange | null = null

export function initUrqlClient(
  clientOptions: any,
  initialState?: SSRData
): [Client | null, SSRExchange | null] {
  // Create a new Client for every server-side rendered request.
  // This ensures we reset the state for each rendered page.
  // If there is an exising client instance on the client-side, use it.
  const isServer = typeof window === "undefined"
  if (!urqlClient) {
    console.log("no client: ", initialState, isServer)
    ssrCache = ssrExchange({ initialState, isClient: !isServer })

    urqlClient = createClient({
      ...clientOptions,
      suspense: isServer,
      exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
    })
  } else {
    console.log("restore data: ")
    //when navigating to another page, client is already initialized.
    //lets restore that page's initial state
    ssrCache?.restoreData(initialState)
  }

  // Return both the Client instance and the ssrCache.
  return [urqlClient, ssrCache]
}

export const GraphQLClientProvider = ({ children, ...pageProps }) => {
  const client = useClient(pageProps)
  return <Provider value={client}>{children}</Provider>
  // return <Provider value={client}>{children}</Provider>
}
export const GraphQLClientOptions = {
  url: process.env.NEXT_PUBLIC_API_PATH,
  fetchOptions: {
    headers: {
      "X-Niftory-API-Key": process.env.NEXT_PUBLIC_API_KEY,
    },
  },
}

export function getGraphQLClient() {
  return initUrqlClient(GraphQLClientOptions)
}

export const useClient = (pageProps: any) => {
  const urqlData = pageProps.urqlState
  const [urqlClient] = useMemo(() => {
    return initUrqlClient(GraphQLClientOptions, urqlData)
  }, [urqlData])
  return urqlClient
}
