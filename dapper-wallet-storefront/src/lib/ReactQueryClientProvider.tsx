import { QueryClient, QueryClientProvider, Hydrate } from "@tanstack/react-query"
import { PropsWithChildren, useState } from "react"

export const ReactQueryProvider = ({ children, state }: PropsWithChildren<{ state: unknown }>) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 1,
            staleTime: 5 * 1000,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={state}>{children}</Hydrate>
    </QueryClientProvider>
  )
}