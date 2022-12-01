import { Avatar, Button, Divider, VStack, Wrap, WrapItem, Text } from "@chakra-ui/react"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useCallback } from "react"
import AppLayout from "src/components/AppLayout"
import { WalletSetup } from "src/components/wallet/WalletSetup"
import { SectionHeader } from "src/ui/SectionHeader"

const AccountPage = () => {
  const { data: session } = useSession()
  const router = useRouter()

  const logout = useCallback(async function () {
    await signOut({ redirect: false, callbackUrl: "/" })
    router.push("/")
  }, [])

  return (
    <AppLayout>
      <VStack>
        <SectionHeader
          text={
            <Wrap>
              <WrapItem>
                <Avatar name={session.user.name} src={session.user.image} />
              </WrapItem>
              <Text>{session.user.name}'s account</Text>
            </Wrap>
          }
        />
        <WalletSetup />
        <Button onClick={logout}>Sign Out</Button>
        {/* <LogOut /> */}
        <Divider w="80%" maxW="xl" py="8" />
      </VStack>
    </AppLayout>
  )
}
// AccountPage.requireWallet = true
AccountPage.requireAuth = true

export default AccountPage
