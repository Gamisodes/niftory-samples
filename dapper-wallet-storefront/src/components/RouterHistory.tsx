import { useRouter } from "next/router"
import { PropsWithChildren, createContext, useContext, useEffect, useRef } from "react"
import { StoreApi, createStore, useStore } from "zustand"

type RouteType = { previous: string | null; current: string | null }
interface RouterHistoryState {
  route: RouteType
  setRoute: (route: (preRoute: RouteType) => RouteType | RouteType) => void
}
const MyContext = createContext<StoreApi<RouterHistoryState>>({} as StoreApi<RouterHistoryState>)

const createMyStore = () =>
  createStore<RouterHistoryState>((set, get) => ({
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
  const store = useContext(MyContext)

  const [_, setRoute] = useStore(store, getState)

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
  const store = useRef(createMyStore()).current // or any better solution

  return (
    <MyContext.Provider value={store}>
      <RouterHistoryChecker>{children}</RouterHistoryChecker>
    </MyContext.Provider>
  )
}

export function useRouterHistory() {
  const store = useContext(MyContext)
  return useStore(store, getPreviousRoute)
}
export default RouterHistory
