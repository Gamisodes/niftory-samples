import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister"
import { Hydrate, QueryClient } from "@tanstack/react-query"
import {
  PersistedClient,
  Persister,
  PersistQueryClientProvider,
} from "@tanstack/react-query-persist-client"
import { del, get, set } from "idb-keyval"
import { PropsWithChildren, useState } from "react"

export function createIDBPersister(idbValidKey: IDBValidKey = "reactQuery") {
  return {
    persistClient: async (client: PersistedClient) => {
      set(idbValidKey, client)
    },
    restoreClient: async () => {
      return await get<PersistedClient>(idbValidKey)
    },
    removeClient: async () => {
      await del(idbValidKey)
    },
  } as Persister
}

export const ReactQueryProvider = ({ children, state }: PropsWithChildren<{ state: unknown }>) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 1,
            staleTime: 5 * 1000,
            cacheTime: 1000 * 60 * 60 * 23, // 23 hours
          },
        },
      })
  )

  const [persister] = useState(() => {
    if (typeof window === "undefined") return
    if ("indexedDB" in window) return createIDBPersister()
    else if ("localStorage" in window) {
      let _window = window as any
      return createSyncStoragePersister({
        storage: _window?.localStorage,
      })
    }

    return
  })

  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
      <Hydrate state={state}>{children}</Hydrate>
    </PersistQueryClientProvider>
  )
}
