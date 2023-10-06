import { PropsWithChildren, memo } from "react"
import { useGetMyAuthStatus } from "src/services/auth/hooks"
import { EAuthStatus, getAuthStatus, useAuth } from "src/store/users"

type SessionProviderProps = PropsWithChildren

function SessionProvider({ children }: SessionProviderProps) {
  const status = useAuth(getAuthStatus)
  const { isSuccess } = useGetMyAuthStatus()

  if (isSuccess && status !== EAuthStatus.LOADING) return <>{children}</>

  return <>{children}</>
}

export default memo(SessionProvider)
