import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "src/lib/prisma"
import { NextApiHandler } from "next"

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, authOptions)

export default authHandler
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/app/sign-in",
  },
  adapter: PrismaAdapter(prisma),
}
