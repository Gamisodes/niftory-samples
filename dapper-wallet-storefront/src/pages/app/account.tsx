import { Divider, VStack } from "@chakra-ui/react"

import AppLayout from "../../components/AppLayout"
import { LogOut } from "../../components/LogOut"
import { WalletSetup } from "../../components/wallet/WalletSetup"
import { SectionHeader } from "../../ui/SectionHeader"

const AccountPage = () => {
  return (
    <AppLayout>
      <VStack>
        <SectionHeader text="My Account" />
        <WalletSetup />
        <Divider w="80%" maxW="xl" py="8" />
        <LogOut />
      </VStack>
    </AppLayout>
  )
}
AccountPage.requireWallet = true

export default AccountPage
