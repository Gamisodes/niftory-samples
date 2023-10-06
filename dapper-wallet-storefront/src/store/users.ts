import { IUser } from "src/typings/IUser"
import { createWithEqualityFn } from "zustand/traditional"

export enum EAuthStatus {
  AUTHENTICATE = "authenticated",
  UNAUTHENTICATED = "unauthenticated",
  LOADING = "loading",
}
export type UsersState = {
  user?: IUser
  status: EAuthStatus
}

type UserAccessorState = { assignUser: (user: UsersState["user"]) => void }

type CombinedState = UsersState & UserAccessorState

export const useAuth = createWithEqualityFn<CombinedState>(
  (set) => ({
    user: undefined,
    status: EAuthStatus.LOADING,
    assignUser: (user) =>
      set({ user, status: user ? EAuthStatus.AUTHENTICATE : EAuthStatus.UNAUTHENTICATED }),
  }),
  Object.is
)
export const getCurrentUser = (state: CombinedState) => [state.user, state.assignUser] as const
export const getUser = (state: CombinedState) => state.user
export const getAuthStatus = (state: CombinedState) => state.status
