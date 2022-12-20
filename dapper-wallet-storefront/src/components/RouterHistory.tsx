import { useRouter } from "next/router"
import { PropsWithChildren, useEffect, useState } from "react"
import create from "zustand"
import createContext from "zustand/context"
import shallow from "zustand/shallow"

const { Provider, useStore } = createContext()

type RouteType = { previous: string | null; current: string | null }
interface RouterHistoryState {
  route: RouteType
  setRoute: (route: (preRoute: RouteType) => RouteType | RouteType) => void
}
const createStore = () =>
  create<RouterHistoryState>((set, get) => ({
    route: { previous: null, current: null },
    setRoute: (params) => {
      if (typeof params === "function") {
        const route = params(get().route)
        set({ route })
      } else {
        set({ route: params })
      }
    },
  }))

const getState = (state: RouterHistoryState) => [state.route, state.setRoute] as const
const getPreviousRoute = (state: RouterHistoryState) => state.route.previous
/**
 * Saves the current URL before changing the route.
 */
const useRouteUrlHistory = () => {
  const router = useRouter()

  const [_, setRoute] = useStore(getState, shallow)

  useEffect(() => {
    setRoute((oldHistory) => ({
      ...oldHistory,
      previous: oldHistory.current,
      current: router.asPath,
    }))
  }, [router.asPath])
}

function RouterHistoryChecker({ children }: PropsWithChildren) {
  useRouteUrlHistory()
  return <>{children}</>
}
function RouterHistory({ children }: PropsWithChildren) {
  return (
    <Provider createStore={createStore}>
      <RouterHistoryChecker>{children}</RouterHistoryChecker>
    </Provider>
  )
}

export function useRouterHistory() {
  return useStore(getPreviousRoute)
}
export default RouterHistory
