import NextAuth, { DefaultSession, EventCallbacks } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      walletAddress: string | null
      custodialAddress: string | null
    } & DefaultSession["user"]
  }
}
