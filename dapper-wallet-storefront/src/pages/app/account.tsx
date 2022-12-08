import { Avatar, Button, Divider, VStack, Wrap, WrapItem, Text } from "@chakra-ui/react"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useCallback, useEffect } from "react"
import AppLayout from "src/components/AppLayout"
import { WalletSetup } from "src/components/wallet/WalletSetup"
import { useWalletContext } from "src/hooks/useWalletContext"
import { useCheckWalletOwnerQuery } from "src/services/wallet/hooks"
import { SectionHeader } from "src/ui/SectionHeader"

const AccountPage = () => {
  const { signOut: signOutWallet } = useWalletContext()
  const { data: session } = useSession()
  const router = useRouter()
  const { mutate } = useCheckWalletOwnerQuery()

  const logout = useCallback(async function () {
    await Promise.all([signOut({ redirect: false, callbackUrl: "/" }), signOutWallet()])
    router.push("/")
  }, [])

  // useEffect(() => {
  //   mutate({ ourEmail: "danylo.orlovskiy@urich.org", loggedWithAddress: "0x7580aba4c2a0ab4e" })
  // }, [])

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
        <Divider w="80%" maxW="xl" py="8" />
      </VStack>
    </AppLayout>
  )
}
// AccountPage.requireWallet = true
AccountPage.requireAuth = true

export default AccountPage
