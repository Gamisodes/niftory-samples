export interface IUser {
  id: string
  name: string
  email: string
  image: string
  emailVerified: string
  wallet: GeneralWallet
  custodialWallet: CustodialWallet
}
export interface GeneralWallet {
  address: string
  id: string
  userEmail: string
}

export interface CustodialWallet {
  id: string
  userEmail: string
  niftoryWalletId: string
}
