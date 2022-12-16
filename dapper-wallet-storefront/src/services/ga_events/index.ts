import { event } from "nextjs-google-analytics"

interface IConnectGoogleAccount {
  email: string
}
interface IConnectDapperWallet {
  wallet?: string
  email?: string
}

const gaAPI = {
  connect_google_account: ({ email }: IConnectGoogleAccount) => {
    event("connect_google_account", {
      email,
    })
  },
  connect_dapper_wallet: ({ wallet, email }: IConnectDapperWallet) => {
    event("connect_dapper_wallet", {
      wallet,
      email,
    })
  },
}

export default gaAPI
