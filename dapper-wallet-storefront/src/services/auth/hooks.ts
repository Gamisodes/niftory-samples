import { UseMutationOptions, UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query"
import { AuthRequest, IPostMailAuthLink } from "./request"
import { getCurrentUser, useAuth } from "src/store/users"
import { shallow } from "zustand/shallow"
import { useEffect } from "react"

export const authKeys = {
  all: ["auth"] as const,
  me: () => [...authKeys.all, "me"] as const,
  mail: (nftModel?: string) => [...authKeys.all, "email", nftModel] as const,
}
type BaseError = {
  errors: string[]
  success: boolean
}

export function useGetMyAuthStatus() {
  const [currentUser, setAuthData] = useAuth(getCurrentUser, shallow)
  const query = useQuery(authKeys.me(), AuthRequest.getMyAuthStatus, {
    placeholderData() {
      if (currentUser) return currentUser
      return undefined
    },
    refetchInterval() {
      return !currentUser ? false : 1 * 60 * 1000
    },
  })
  useEffect(() => {
    if (query.isFetched || query.isSuccess) {
      setAuthData(query?.data)
    }
  }, [query.isFetched, query.isSuccess])

  return query
}

type ISuccessResponseAuthMailAuthLink = Awaited<ReturnType<typeof AuthRequest.getMailAuthLink>>

export function useMailAuthLink(nftModel?: string) {
  return useMutation<
    ISuccessResponseAuthMailAuthLink,
    BaseError,
    Omit<IPostMailAuthLink, "nftModelId">
  >(authKeys.mail(nftModel), (variables) =>
    AuthRequest.getMailAuthLink({ ...variables, nftModelId: nftModel })
  )
}

type ISuccessResponseAuthLogout = Awaited<ReturnType<typeof AuthRequest.logout>>
export function useAuthLogout() {
  const [, setAuthData] = useAuth(getCurrentUser, shallow)
  return useMutation<ISuccessResponseAuthLogout, BaseError>(authKeys.all, AuthRequest.logout, {
    onSuccess() {
      setAuthData(undefined)
    },
  })
}
