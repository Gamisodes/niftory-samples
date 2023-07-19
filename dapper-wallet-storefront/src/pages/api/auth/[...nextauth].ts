import NextAuth, { NextAuthOptions, Session } from "next-auth"
import EmailProvider from "next-auth/providers/email"
import GoogleProvider from "next-auth/providers/google"

import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextApiHandler } from "next"
import { useSendVerificationRequest } from "src/backend/emailAuth"
import {
  BaseNFTStrategy,
  PromoNFTStrategy,
  SignInProcessesContext,
} from "src/backend/signInProcceses"
import prisma from "src/lib/prisma"

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
  adapter: PrismaAdapter(prisma),
}

const authHandler: NextApiHandler = async (req, res) => {
  const signInContext = new SignInProcessesContext(new BaseNFTStrategy())
  if (req.query.nftModelId) {
    signInContext.setStrategy(new PromoNFTStrategy())
  }
  const processor = signInContext.process(req.query)

  return await NextAuth(req, res, {
    ...authOptions,
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
        sendVerificationRequest: useSendVerificationRequest({
          nftModelId: req?.query?.nftModelId as string | undefined,
        }),
        from: process.env.EMAIL_AUTHOR_SENDER,
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
    ],
    events: {
      //After user clicks his link
      ...processor.events,
    },
    callbacks: {
      //Before email send
      ...processor.callbacks,
      session: async (params) => {
        const { session } = params
        const userFromDB = await prisma.user.findUnique({
          where: { email: session.user.email },
          include: { wallet: true, custodialWallet: true },
        })

        const defaultAnswer: Session = {
          user: {
            name: session?.user?.name,
            image: session?.user?.image,
            email: session?.user?.email,
            walletAddress: userFromDB?.wallet?.address ?? null,
            custodialAddress: userFromDB?.custodialWallet?.niftoryWalletId ?? null,
          },
          expires: session?.expires,
        }
        if (processor.callbacks.session) {
          const answer = processor.callbacks.session(params)
          return {
            ...defaultAnswer,
            ...answer,
          }
        }

        return {
          user: {
            name: session?.user?.name,
            image: session?.user?.image,
            email: session?.user?.email,
            walletAddress: userFromDB?.wallet?.address ?? null,
            custodialAddress: userFromDB?.custodialWallet?.niftoryWalletId ?? null,
          },
          expires: session?.expires,
        }
      },
    },
  })
}

export default authHandler
