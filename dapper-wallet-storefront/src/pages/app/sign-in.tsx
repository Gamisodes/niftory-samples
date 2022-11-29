import { Divider, VStack } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useEffect } from "react"

import AppLayout from "../../components/AppLayout"
import { WalletSetup } from "../../components/wallet/WalletSetup"
import { useWalletContext } from "../../hooks/useWalletContext"
import { SectionHeader } from "../../ui/SectionHeader"

const SignInPage = () => {
  const router = useRouter()
  const { currentUser } = useWalletContext()
  useEffect(() => {
    if (!currentUser || !currentUser.loggedIn) {
      return
    }
    if (currentUser.loggedIn) {
      router.push("/app/account")
    }
  }, [currentUser, router])

  return (
    <AppLayout>
      <VStack>
        <SectionHeader text="Sign-in page" />
        <WalletSetup />
        <Divider w="80%" maxW="xl" py="8" />
      </VStack>
    </AppLayout>
  )
}
SignInPage.requireWallet = false

export default SignInPage
