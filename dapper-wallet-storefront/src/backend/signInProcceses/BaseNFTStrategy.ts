import { AuthOptions } from "next-auth"
import { IProcessArgs, SignInProcessStrategy } from "."
import { createOrReturnWallet } from "../custodialNFT/createCustodialWallet"

type IBaseNFTStrategyArgs = IProcessArgs & {}
export class BaseNFTStrategy implements SignInProcessStrategy {
  holdAuth(data: IBaseNFTStrategyArgs): Pick<AuthOptions, "events" | "callbacks"> {
    return {
      events: {
        //After user clicks his link
        async signIn(message) {
          console.log("BaseNFTStrategy | events | signIn: ", message)
          console.log("req 2: ", data)
          const userEmail = message.user.email
          await createOrReturnWallet({ userEmail })
        },
      },
      callbacks: {
        //Before email send
        signIn: async (message) => {
          return true
        },
      },
    }
  }
}
