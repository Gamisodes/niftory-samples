import { event } from "nextjs-google-analytics"

interface IConnectGoogleAccount {
  email: string
}
interface IConnectDapperWallet {
  wallet?: string
  email?: string
}
interface IBuyNFT {
  wallet?: string
  email?: string
  label: EBuyNFTLabel
  dropsId?: string
}

export enum EBuyNFTLabel {
  STARTING_CHECKOUT = "starting_checkout",
  COMPLETING_CHECKOUT = "completing_checkout",
  DECLINE = "declined_by_user",
  ERROR = "error",
}

const gaAPI = {
  buy_nft: ({ wallet, email, label, dropsId }: IBuyNFT) => {
    event("buy_nft", {
      category: "purchase",
      label,
      email,
      wallet,
      dropsId,
    })
  },
  connect_google_account: ({ email }: IConnectGoogleAccount) => {
    event("connect_google_account", {
      category: "Auth",
      email,
    })
  },
  connect_dapper_wallet: ({ wallet, email }: IConnectDapperWallet) => {
    event("connect_dapper_wallet", {
      category: "Auth",
      wallet,
      email,
    })
  },
}

export default gaAPI
