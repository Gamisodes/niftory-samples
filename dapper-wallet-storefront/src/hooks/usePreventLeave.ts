import { useRouter } from "next/router"
import { useEffect } from "react"

type PreventCallback = () => boolean
type DependencyCheck = any[]

function usePreventLeave(callback: PreventCallback, deps: DependencyCheck = [false]) {
  const router = useRouter()
  useEffect(() => {
    console.log("render")
    const routeChangeStart = () => {
      const shouldPrevent = callback()
      if (shouldPrevent) {
        router.events.emit("routeChangeError")
        throw "Abort route change. Please ignore this error."
      }
    }
    const clearingFunction = (event) => {
      const shouldPrevent = callback()
      if (shouldPrevent) {
        event.returnValue = `Are you sure you want to leave?`
      }
    }
    router.events.on("routeChangeStart", routeChangeStart)
    window.addEventListener("beforeunload", clearingFunction)
    return () => {
      window.removeEventListener("beforeunload", clearingFunction)
      router.events.off("routeChangeStart", routeChangeStart)
    }
  }, deps)
}

export default usePreventLeave
