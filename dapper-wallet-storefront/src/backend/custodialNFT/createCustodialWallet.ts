import { CustodialWallet, Wallet } from "@prisma/client"
import {
  CreateNiftoryWalletDocument,
  CreateNiftoryWalletMutation,
  CreateNiftoryWalletMutationVariables,
  WalletState,
} from "generated/graphql"
import { GraphQLClient } from "graphql-request"
import { getBackendGraphQLClient } from "src/lib/BackendGraphQLClient"
import prisma from "src/lib/prisma"
import { getWalletByAddress } from "./getWalletByAddress"

type ICreateCustodialWalletArgs = {
  userEmail: string
  gqclient?: GraphQLClient
}

/**
 * This function return user wallet if it's exist. If it's not - assign custodial wallet to it
 */
export async function createOrReturnWallet({
  userEmail,
  gqclient,
}: ICreateCustodialWalletArgs): Promise<{
  success: boolean
  data: Partial<Wallet & CustodialWallet> | null
  error: string
}> {
  try {
    const user = await prisma.user.findFirst({
      where: { email: userEmail },
      include: { wallet: true, custodialWallet: true },
    })
    let walletInfo: Awaited<ReturnType<typeof getWalletByAddress>> | null = null
    if (user && user.wallet) {
      walletInfo = await getWalletByAddress({ userAddress: user.wallet.address })
    }
    if (!user) {
      return {
        success: false,
        data: undefined,
        error: "This user is not exist" as string,
      }
    } else if (user && user.wallet && walletInfo.data.walletByAddress.state === WalletState.Ready) {
      return {
        success: true,
        data: user.wallet,
        error: null,
      }
    } else if (user && user.custodialWallet) {
      return {
        success: true,
        data: user.custodialWallet,
        error: null,
      }
    } else {
      const _gqclient = gqclient ?? (await getBackendGraphQLClient())
      const createCustodialWallet = await _gqclient.request<
        CreateNiftoryWalletMutation,
        CreateNiftoryWalletMutationVariables
      >(CreateNiftoryWalletDocument, { appId: process.env.NEXT_PUBLIC_CLIENT_ID })
      console.log(createCustodialWallet)
      const wallet = createCustodialWallet.createNiftoryWallet
      const createdWallet = await prisma.custodialWallet.create({
        data: {
          niftoryWalletId: wallet?.id ?? "",
          user: { connect: { email: userEmail } },
        },
        include: { user: true },
      })
      return {
        success: true,
        data: createdWallet,
        error: null,
      }
    }
  } catch (error) {
    console.log(error)
    return {
      success: false,
      data: undefined,
      error: "Error while creating wallet" as string,
    }
  }
}
