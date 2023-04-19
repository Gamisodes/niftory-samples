import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import EmailProvider from "next-auth/providers/email"

import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "src/lib/prisma"
import { NextApiHandler } from "next"

export const authOptions: NextAuthOptions = {
  providers: [
    EmailProvider({
      server: {
        host: "smtp.gmail.com",
        port: 465,
        auth: {
          user: process.env.EMAIL_AUTHOR_SENDER,
          pass: process.env.EMAIL_AUTHOR_PASS,
        },
      },
      from: process.env.EMAIL_AUTHOR_SENDER,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/sign-in",
    verifyRequest: "/verify",
  },
  callbacks: {
    session: async ({ session, token, user }) => {
      const userFromDB = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: { wallet: true },
      })

      return {
        user: {
          name: session?.user?.name,
          image: session?.user?.image,
          email: session?.user?.email,
          walletAddress: userFromDB?.wallet?.address ?? null,
        },
        expires: session?.expires,
      }
    },
  },
  adapter: PrismaAdapter(prisma),
}

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, authOptions)

export default authHandler
